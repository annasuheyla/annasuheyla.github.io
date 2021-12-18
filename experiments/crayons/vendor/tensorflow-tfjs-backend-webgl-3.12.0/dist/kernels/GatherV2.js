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
import { backend_util, GatherV2, util } from '@tensorflow/tfjs-core';
import { GatherProgram } from '../gather_gpu';
import { gatherV2ImplCPU } from '../kernel_utils/shared';
import { reshape } from './Reshape';
export function gatherV2(args) {
    const { inputs, backend, attrs } = args;
    const { x, indices } = inputs;
    const { axis, batchDims } = attrs;
    // Throw error when any index is out of bound.
    const parsedAxis = util.parseAxisParam(axis, x.shape)[0];
    const indicesVals = backend.readSync(indices.dataId);
    const axisDim = x.shape[parsedAxis];
    for (let i = 0; i < indicesVals.length; ++i) {
        const index = indicesVals[i];
        util.assert(index <= axisDim - 1 && index >= 0, () => `GatherV2: the index value ${index} is not in [0, ${axisDim - 1}]`);
    }
    const shapeInfo = backend_util.segment_util.collectGatherOpShapeInfo(x, indices, parsedAxis, batchDims);
    const indicesSize = util.sizeFromShape(indices.shape);
    const toDispose = [];
    const flattenX = reshape({
        inputs: { x },
        backend,
        attrs: {
            shape: [
                shapeInfo.batchSize, shapeInfo.outerSize, shapeInfo.dimSize,
                shapeInfo.sliceSize
            ]
        }
    });
    const flattenIndex = reshape({
        inputs: { x: indices },
        backend,
        attrs: { shape: [shapeInfo.batchSize, indicesSize / shapeInfo.batchSize] }
    });
    toDispose.push(flattenX);
    toDispose.push(flattenIndex);
    const flattenOutputShape = [
        shapeInfo.batchSize, shapeInfo.outerSize, indicesSize / shapeInfo.batchSize,
        shapeInfo.sliceSize
    ];
    if (backend.shouldExecuteOnCPU([x, indices]) || x.dtype === 'string') {
        const indicesBuf = backend.bufferSync(flattenIndex);
        const xBuf = backend.bufferSync(flattenX);
        const outBuf = gatherV2ImplCPU(xBuf, indicesBuf, flattenOutputShape);
        toDispose.forEach(t => backend.disposeIntermediateTensorInfo(t));
        return backend.makeTensorInfo(shapeInfo.outputShape, outBuf.dtype, outBuf.values);
    }
    const program = new GatherProgram(flattenX.shape, flattenOutputShape);
    const res = backend.runWebGLProgram(program, [flattenX, flattenIndex], flattenX.dtype);
    toDispose.push(res);
    const reshaped = reshape({ inputs: { x: res }, backend, attrs: { shape: shapeInfo.outputShape } });
    toDispose.forEach(t => backend.disposeIntermediateTensorInfo(t));
    return reshaped;
}
export const gatherV2Config = {
    kernelName: GatherV2,
    backendName: 'webgl',
    kernelFunc: gatherV2
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0aGVyVjIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL2tlcm5lbHMvR2F0aGVyVjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQW1GLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3BKLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFbEMsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUl4QjtJQUNDLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUM1QixNQUFNLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxHQUFHLEtBQUssQ0FBQztJQUVoQyw4Q0FBOEM7SUFDOUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBZSxDQUFDO0lBQ25FLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDM0MsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FB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UyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQWlCO0lBQzFDLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxRQUE0QjtDQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge2JhY2tlbmRfdXRpbCwgR2F0aGVyVjIsIEdhdGhlclYyQXR0cnMsIEdhdGhlclYySW5wdXRzLCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIFRlbnNvckluZm8sIFR5cGVkQXJyYXksIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRXZWJHTH0gZnJvbSAnLi4vYmFja2VuZF93ZWJnbCc7XG5pbXBvcnQge0dhdGhlclByb2dyYW19IGZyb20gJy4uL2dhdGhlcl9ncHUnO1xuaW1wb3J0IHtnYXRoZXJWMkltcGxDUFV9IGZyb20gJy4uL2tlcm5lbF91dGlscy9zaGFyZWQnO1xuXG5pbXBvcnQge3Jlc2hhcGV9IGZyb20gJy4vUmVzaGFwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYXRoZXJWMihhcmdzOiB7XG4gIGlucHV0czogR2F0aGVyVjJJbnB1dHMsXG4gIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0wsXG4gIGF0dHJzOiBHYXRoZXJWMkF0dHJzXG59KTogVGVuc29ySW5mbyB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmQsIGF0dHJzfSA9IGFyZ3M7XG4gIGNvbnN0IHt4LCBpbmRpY2VzfSA9IGlucHV0cztcbiAgY29uc3Qge2F4aXMsIGJhdGNoRGltc30gPSBhdHRycztcblxuICAvLyBUaHJvdyBlcnJvciB3aGVuIGFueSBpbmRleCBpcyBvdXQgb2YgYm91bmQuXG4gIGNvbnN0IHBhcnNlZEF4aXMgPSB1dGlsLnBhcnNlQXhpc1BhcmFtKGF4aXMsIHguc2hhcGUpWzBdO1xuICBjb25zdCBpbmRpY2VzVmFscyA9IGJhY2tlbmQucmVhZFN5bmMoaW5kaWNlcy5kYXRhSWQpIGFzIFR5cGVkQXJyYXk7XG4gIGNvbnN0IGF4aXNEaW0gPSB4LnNoYXBlW3BhcnNlZEF4aXNdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGljZXNWYWxzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaW5kZXggPSBpbmRpY2VzVmFsc1tpXTtcbiAgICB1dGlsLmFzc2VydChcbiAgICAgICAgaW5kZXggPD0gYXhpc0RpbSAtIDEgJiYgaW5kZXggPj0gMCxcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIGBHYXRoZXJWMjogdGhlIGluZGV4IHZhbHVlICR7aW5kZXh9IGlzIG5vdCBpbiBbMCwgJHtheGlzRGltIC0gMX1dYCk7XG4gIH1cblxuICBjb25zdCBzaGFwZUluZm8gPSBiYWNrZW5kX3V0aWwuc2VnbWVudF91dGlsLmNvbGxlY3RHYXRoZXJPcFNoYXBlSW5mbyhcbiAgICAgIHgsIGluZGljZXMsIHBhcnNlZEF4aXMsIGJhdGNoRGltcyk7XG5cbiAgY29uc3QgaW5kaWNlc1NpemUgPSB1dGlsLnNpemVGcm9tU2hhcGUoaW5kaWNlcy5zaGFwZSk7XG5cbiAgY29uc3QgdG9EaXNwb3NlID0gW107XG5cbiAgY29uc3QgZmxhdHRlblggPSByZXNoYXBlKHtcbiAgICBpbnB1dHM6IHt4fSxcbiAgICBiYWNrZW5kLFxuICAgIGF0dHJzOiB7XG4gICAgICBzaGFwZTogW1xuICAgICAgICBzaGFwZUluZm8uYmF0Y2hTaXplLCBzaGFwZUluZm8ub3V0ZXJTaXplLCBzaGFwZUluZm8uZGltU2l6ZSxcbiAgICAgICAgc2hhcGVJbmZvLnNsaWNlU2l6ZVxuICAgICAgXVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZmxhdHRlbkluZGV4ID0gcmVzaGFwZSh7XG4gICAgaW5wdXRzOiB7eDogaW5kaWNlc30sXG4gICAgYmFja2VuZCxcbiAgICBhdHRyczoge3NoYXBlOiBbc2hhcGVJbmZvLmJhdGNoU2l6ZSwgaW5kaWNlc1NpemUgLyBzaGFwZUluZm8uYmF0Y2hTaXplXX1cbiAgfSk7XG5cbiAgdG9EaXNwb3NlLnB1c2goZmxhdHRlblgpO1xuICB0b0Rpc3Bvc2UucHVzaChmbGF0dGVuSW5kZXgpO1xuXG4gIGNvbnN0IGZsYXR0ZW5PdXRwdXRTaGFwZSA9IFtcbiAgICBzaGFwZUluZm8uYmF0Y2hTaXplLCBzaGFwZUluZm8ub3V0ZXJTaXplLCBpbmRpY2VzU2l6ZSAvIHNoYXBlSW5mby5iYXRjaFNpemUsXG4gICAgc2hhcGVJbmZvLnNsaWNlU2l6ZVxuICBdO1xuXG4gIGlmIChiYWNrZW5kLnNob3VsZEV4ZWN1dGVPbkNQVShbeCwgaW5kaWNlc10pIHx8IHguZHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgaW5kaWNlc0J1ZiA9IGJhY2tlbmQuYnVmZmVyU3luYyhmbGF0dGVuSW5kZXgpO1xuICAgIGNvbnN0IHhCdWYgPSBiYWNrZW5kLmJ1ZmZlclN5bmMoZmxhdHRlblgpO1xuICAgIGNvbnN0IG91dEJ1ZiA9IGdhdGhlclYySW1wbENQVSh4QnVmLCBpbmRpY2VzQnVmLCBmbGF0dGVuT3V0cHV0U2hhcGUpO1xuXG4gICAgdG9EaXNwb3NlLmZvckVhY2godCA9PiBiYWNrZW5kLmRpc3Bvc2VJbnRlcm1lZGlhdGVUZW5zb3JJbmZvKHQpKTtcblxuICAgIHJldHVybiBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKFxuICAgICAgICBzaGFwZUluZm8ub3V0cHV0U2hhcGUsIG91dEJ1Zi5kdHlwZSwgb3V0QnVmLnZhbHVlcyBhcyBUeXBlZEFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHByb2dyYW0gPSBuZXcgR2F0aGVyUHJvZ3JhbShmbGF0dGVuWC5zaGFwZSwgZmxhdHRlbk91dHB1dFNoYXBlKTtcbiAgY29uc3QgcmVzID0gYmFja2VuZC5ydW5XZWJHTFByb2dyYW0oXG4gICAgICBwcm9ncmFtLCBbZmxhdHRlblgsIGZsYXR0ZW5JbmRleF0sIGZsYXR0ZW5YLmR0eXBlKTtcbiAgdG9EaXNwb3NlLnB1c2gocmVzKTtcblxuICBjb25zdCByZXNoYXBlZCA9IHJlc2hhcGUoXG4gICAgICB7aW5wdXRzOiB7eDogcmVzfSwgYmFja2VuZCwgYXR0cnM6IHtzaGFwZTogc2hhcGVJbmZvLm91dHB1dFNoYXBlfX0pO1xuICB0b0Rpc3Bvc2UuZm9yRWFjaCh0ID0+IGJhY2tlbmQuZGlzcG9zZUludGVybWVkaWF0ZVRlbnNvckluZm8odCkpO1xuICByZXR1cm4gcmVzaGFwZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBnYXRoZXJWMkNvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBHYXRoZXJWMixcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IGdhdGhlclYyIGFzIHt9IGFzIEtlcm5lbEZ1bmNcbn07XG4iXX0=