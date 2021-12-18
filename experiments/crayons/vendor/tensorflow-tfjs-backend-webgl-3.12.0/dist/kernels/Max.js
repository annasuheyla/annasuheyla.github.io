/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { Max } from '@tensorflow/tfjs-core';
import { backend_util, util } from '@tensorflow/tfjs-core';
import { maxImplCPU } from '../kernel_utils/shared';
import { maxImpl } from './Max_impl';
import { transposeImpl, transposeImplCPU } from './Transpose_impl';
export function max(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { reductionIndices, keepDims } = attrs;
    const xRank = x.shape.length;
    const origAxes = util.parseAxisParam(reductionIndices, x.shape);
    let axes = origAxes;
    const permutedAxes = backend_util.getAxesPermutation(axes, xRank);
    const maxInputIsTransposed = permutedAxes != null;
    const shouldExecuteOnCPU = backend.shouldExecuteOnCPU([x]);
    let maxInput = x;
    if (maxInputIsTransposed) {
        if (shouldExecuteOnCPU) {
            const xTexData = backend.texData.get(maxInput.dataId);
            const values = xTexData.values;
            const newShape = new Array(xRank);
            for (let i = 0; i < newShape.length; i++) {
                newShape[i] = x.shape[permutedAxes[i]];
            }
            const maxInputValues = transposeImplCPU(values, x.shape, x.dtype, permutedAxes, newShape);
            maxInput = backend.makeTensorInfo(newShape, x.dtype);
            const maxInputData = backend.texData.get(maxInput.dataId);
            maxInputData.values = maxInputValues;
        }
        else {
            maxInput = transposeImpl(x, permutedAxes, backend);
        }
        axes = backend_util.getInnerMostAxes(axes.length, xRank);
    }
    backend_util.assertAxesAreInnerMostDims('max', axes, xRank);
    const [maxOutShape, reduceShape] = backend_util.computeOutAndReduceShapes(maxInput.shape, axes);
    let outShape = maxOutShape;
    if (keepDims) {
        // rather than reshape at the end, set the target shape here.
        outShape = backend_util.expandShapeToKeepDim(maxOutShape, origAxes);
    }
    let out;
    if (shouldExecuteOnCPU) {
        const xTexData = backend.texData.get(maxInput.dataId);
        const values = xTexData.values;
        const outValues = maxImplCPU(values, util.sizeFromShape(reduceShape), outShape, x.dtype);
        out = backend.makeTensorInfo(outShape, x.dtype);
        const outData = backend.texData.get(out.dataId);
        outData.values = outValues;
    }
    else {
        out = maxImpl(maxInput, reduceShape, outShape, backend);
    }
    if (maxInputIsTransposed) {
        backend.disposeIntermediateTensorInfo(maxInput);
    }
    return out;
}
export const maxConfig = {
    kernelName: Max,
    backendName: 'webgl',
    kernelFunc: max
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL01heC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQWEsR0FBRyxFQUFrQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQTRCLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR25GLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVsRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRSxNQUFNLFVBQVUsR0FBRyxDQUNmLElBQXFFO0lBRXZFLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ25CLE1BQU0sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFFM0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFFN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ3BCLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEUsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLElBQUksSUFBSSxDQUFDO0lBQ2xELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFD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QU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBaUI7SUFDckMsVUFBVSxFQUFFLEdBQUc7SUFDZixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsR0FBdUI7Q0FDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtLZXJuZWxGdW5jLCBNYXgsIE1heEF0dHJzLCBNYXhJbnB1dHMsIFRlbnNvckluZm99IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5pbXBvcnQge2JhY2tlbmRfdXRpbCwgS2VybmVsQ29uZmlnLCBUeXBlZEFycmF5LCB1dGlsfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHttYXhJbXBsQ1BVfSBmcm9tICcuLi9rZXJuZWxfdXRpbHMvc2hhcmVkJztcblxuaW1wb3J0IHttYXhJbXBsfSBmcm9tICcuL01heF9pbXBsJztcbmltcG9ydCB7dHJhbnNwb3NlSW1wbCwgdHJhbnNwb3NlSW1wbENQVX0gZnJvbSAnLi9UcmFuc3Bvc2VfaW1wbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXgoXG4gICAgYXJnczoge2lucHV0czogTWF4SW5wdXRzLCBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMLCBhdHRyczogTWF4QXR0cnN9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge3h9ID0gaW5wdXRzO1xuICBjb25zdCB7cmVkdWN0aW9uSW5kaWNlcywga2VlcERpbXN9ID0gYXR0cnM7XG5cbiAgY29uc3QgeFJhbmsgPSB4LnNoYXBlLmxlbmd0aDtcblxuICBjb25zdCBvcmlnQXhlcyA9IHV0aWwucGFyc2VBeGlzUGFyYW0ocmVkdWN0aW9uSW5kaWNlcywgeC5zaGFwZSk7XG4gIGxldCBheGVzID0gb3JpZ0F4ZXM7XG4gIGNvbnN0IHBlcm11dGVkQXhlcyA9IGJhY2tlbmRfdXRpbC5nZXRBeGVzUGVybXV0YXRpb24oYXhlcywgeFJhbmspO1xuICBjb25zdCBtYXhJbnB1dElzVHJhbnNwb3NlZCA9IHBlcm11dGVkQXhlcyAhPSBudWxsO1xuICBjb25zdCBzaG91bGRFeGVjdXRlT25DUFUgPSBiYWNrZW5kLnNob3VsZEV4ZWN1dGVPbkNQVShbeF0pO1xuXG4gIGxldCBtYXhJbnB1dCA9IHg7XG4gIGlmIChtYXhJbnB1dElzVHJhbnNwb3NlZCkge1xuICAgIGlmIChzaG91bGRFeGVjdXRlT25DUFUpIHtcbiAgICAgIGNvbnN0IHhUZXhEYXRhID0gYmFja2VuZC50ZXhEYXRhLmdldChtYXhJbnB1dC5kYXRhSWQpO1xuICAgICAgY29uc3QgdmFsdWVzID0geFRleERhdGEudmFsdWVzIGFzIFR5cGVkQXJyYXk7XG5cbiAgICAgIGNvbnN0IG5ld1NoYXBlOiBudW1iZXJbXSA9IG5ldyBBcnJheSh4UmFuayk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoYXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld1NoYXBlW2ldID0geC5zaGFwZVtwZXJtdXRlZEF4ZXNbaV1dO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4SW5wdXRWYWx1ZXMgPVxuICAgICAgICAgIHRyYW5zcG9zZUltcGxDUFUodmFsdWVzLCB4LnNoYXBlLCB4LmR0eXBlLCBwZXJtdXRlZEF4ZXMsIG5ld1NoYXBlKTtcblxuICAgICAgbWF4SW5wdXQgPSBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKG5ld1NoYXBlLCB4LmR0eXBlKTtcbiAgICAgIGNvbnN0IG1heElucHV0RGF0YSA9IGJhY2tlbmQudGV4RGF0YS5nZXQobWF4SW5wdXQuZGF0YUlkKTtcbiAgICAgIG1heElucHV0RGF0YS52YWx1ZXMgPSBtYXhJbnB1dFZhbHVlcztcbiAgICB9IGVsc2Uge1xuICAgICAgbWF4SW5wdXQgPSB0cmFuc3Bvc2VJbXBsKHgsIHBlcm11dGVkQXhlcywgYmFja2VuZCk7XG4gICAgfVxuXG4gICAgYXhlcyA9IGJhY2tlbmRfdXRpbC5nZXRJbm5lck1vc3RBeGVzKGF4ZXMubGVuZ3RoLCB4UmFuayk7XG4gIH1cblxuICBiYWNrZW5kX3V0aWwuYXNzZXJ0QXhlc0FyZUlubmVyTW9zdERpbXMoJ21heCcsIGF4ZXMsIHhSYW5rKTtcbiAgY29uc3QgW21heE91dFNoYXBlLCByZWR1Y2VTaGFwZV0gPVxuICAgICAgYmFja2VuZF91dGlsLmNvbXB1dGVPdXRBbmRSZWR1Y2VTaGFwZXMobWF4SW5wdXQuc2hhcGUsIGF4ZXMpO1xuXG4gIGxldCBvdXRTaGFwZSA9IG1heE91dFNoYXBlO1xuICBpZiAoa2VlcERpbXMpIHtcbiAgICAvLyByYXRoZXIgdGhhbiByZXNoYXBlIGF0IHRoZSBlbmQsIHNldCB0aGUgdGFyZ2V0IHNoYXBlIGhlcmUuXG4gICAgb3V0U2hhcGUgPSBiYWNrZW5kX3V0aWwuZXhwYW5kU2hhcGVUb0tlZXBEaW0obWF4T3V0U2hhcGUsIG9yaWdBeGVzKTtcbiAgfVxuXG4gIGxldCBvdXQ7XG4gIGlmIChzaG91bGRFeGVjdXRlT25DUFUpIHtcbiAgICBjb25zdCB4VGV4RGF0YSA9IGJhY2tlbmQudGV4RGF0YS5nZXQobWF4SW5wdXQuZGF0YUlkKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB4VGV4RGF0YS52YWx1ZXMgYXMgVHlwZWRBcnJheTtcblxuICAgIGNvbnN0IG91dFZhbHVlcyA9XG4gICAgICAgIG1heEltcGxDUFUodmFsdWVzLCB1dGlsLnNpemVGcm9tU2hhcGUocmVkdWNlU2hhcGUpLCBvdXRTaGFwZSwgeC5kdHlwZSk7XG5cbiAgICBvdXQgPSBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKG91dFNoYXBlLCB4LmR0eXBlKTtcbiAgICBjb25zdCBvdXREYXRhID0gYmFja2VuZC50ZXhEYXRhLmdldChvdXQuZGF0YUlkKTtcbiAgICBvdXREYXRhLnZhbHVlcyA9IG91dFZhbHVlcztcbiAgfSBlbHNlIHtcbiAgICBvdXQgPSBtYXhJbXBsKG1heElucHV0LCByZWR1Y2VTaGFwZSwgb3V0U2hhcGUsIGJhY2tlbmQpO1xuICB9XG5cbiAgaWYgKG1heElucHV0SXNUcmFuc3Bvc2VkKSB7XG4gICAgYmFja2VuZC5kaXNwb3NlSW50ZXJtZWRpYXRlVGVuc29ySW5mbyhtYXhJbnB1dCk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgY29uc3QgbWF4Q29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IE1heCxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IG1heCBhcyB7fSBhcyBLZXJuZWxGdW5jXG59O1xuIl19