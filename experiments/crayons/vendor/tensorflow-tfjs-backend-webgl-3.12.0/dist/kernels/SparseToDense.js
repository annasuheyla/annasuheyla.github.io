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
import { backend_util, SparseToDense } from '@tensorflow/tfjs-core';
import { ScatterProgram } from '../scatter_gpu';
import { reshape } from './Reshape';
export function sparseToDense(args) {
    const { inputs, backend, attrs } = args;
    const { sparseIndices, sparseValues, defaultValue } = inputs;
    const { outputShape } = attrs;
    const { sliceRank, numUpdates, strides, outputSize } = backend_util.calculateShapes(sparseValues, sparseIndices, outputShape);
    const sumDupeIndices = false;
    const program = new ScatterProgram(numUpdates, sliceRank, sparseIndices.shape.length, sparseValues.shape.length, strides, [outputSize, 1], sumDupeIndices);
    const res = backend.runWebGLProgram(program, [sparseValues, sparseIndices, defaultValue], sparseValues.dtype);
    const reshaped = reshape({ inputs: { x: res }, backend, attrs: { shape: outputShape } });
    backend.disposeIntermediateTensorInfo(res);
    return reshaped;
}
export const sparseToDenseConfig = {
    kernelName: SparseToDense,
    backendName: 'webgl',
    kernelFunc: sparseToDense
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcnNlVG9EZW5zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9TcGFyc2VUb0RlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQTRCLGFBQWEsRUFBc0QsTUFBTSx1QkFBdUIsQ0FBQztBQUdqSixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLFVBQVUsYUFBYSxDQUFDLElBSTdCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUMzRCxNQUFNLEVBQUMsV0FBVyxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBRTVCLE1BQU0sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsR0FDOUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRTNFLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FDOUIsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDakQsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRXpFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQy9CLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlFLE1BQU0sUUFBUSxHQUNWLE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxFQUFDLENBQUMsQ0FBQztJQUV0RSxPQUFPLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFpQjtJQUMvQyxVQUFVLEVBQUUsYUFBYTtJQUN6QixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsYUFBaUM7Q0FDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtiYWNrZW5kX3V0aWwsIEtlcm5lbENvbmZpZywgS2VybmVsRnVuYywgU3BhcnNlVG9EZW5zZSwgU3BhcnNlVG9EZW5zZUF0dHJzLCBTcGFyc2VUb0RlbnNlSW5wdXRzLCBUZW5zb3JJbmZvfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtTY2F0dGVyUHJvZ3JhbX0gZnJvbSAnLi4vc2NhdHRlcl9ncHUnO1xuaW1wb3J0IHtyZXNoYXBlfSBmcm9tICcuL1Jlc2hhcGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3BhcnNlVG9EZW5zZShhcmdzOiB7XG4gIGlucHV0czogU3BhcnNlVG9EZW5zZUlucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IFNwYXJzZVRvRGVuc2VBdHRyc1xufSk6IFRlbnNvckluZm8ge1xuICBjb25zdCB7aW5wdXRzLCBiYWNrZW5kLCBhdHRyc30gPSBhcmdzO1xuICBjb25zdCB7c3BhcnNlSW5kaWNlcywgc3BhcnNlVmFsdWVzLCBkZWZhdWx0VmFsdWV9ID0gaW5wdXRzO1xuICBjb25zdCB7b3V0cHV0U2hhcGV9ID0gYXR0cnM7XG5cbiAgY29uc3Qge3NsaWNlUmFuaywgbnVtVXBkYXRlcywgc3RyaWRlcywgb3V0cHV0U2l6ZX0gPVxuICAgICAgYmFja2VuZF91dGlsLmNhbGN1bGF0ZVNoYXBlcyhzcGFyc2VWYWx1ZXMsIHNwYXJzZUluZGljZXMsIG91dHB1dFNoYXBlKTtcblxuICBjb25zdCBzdW1EdXBlSW5kaWNlcyA9IGZhbHNlO1xuICBjb25zdCBwcm9ncmFtID0gbmV3IFNjYXR0ZXJQcm9ncmFtKFxuICAgICAgbnVtVXBkYXRlcywgc2xpY2VSYW5rLCBzcGFyc2VJbmRpY2VzLnNoYXBlLmxlbmd0aCxcbiAgICAgIHNwYXJzZVZhbHVlcy5zaGFwZS5sZW5ndGgsIHN0cmlkZXMsIFtvdXRwdXRTaXplLCAxXSwgc3VtRHVwZUluZGljZXMpO1xuXG4gIGNvbnN0IHJlcyA9IGJhY2tlbmQucnVuV2ViR0xQcm9ncmFtKFxuICAgICAgcHJvZ3JhbSwgW3NwYXJzZVZhbHVlcywgc3BhcnNlSW5kaWNlcywgZGVmYXVsdFZhbHVlXSwgc3BhcnNlVmFsdWVzLmR0eXBlKTtcblxuICBjb25zdCByZXNoYXBlZCA9XG4gICAgICByZXNoYXBlKHtpbnB1dHM6IHt4OiByZXN9LCBiYWNrZW5kLCBhdHRyczoge3NoYXBlOiBvdXRwdXRTaGFwZX19KTtcblxuICBiYWNrZW5kLmRpc3Bvc2VJbnRlcm1lZGlhdGVUZW5zb3JJbmZvKHJlcyk7XG4gIHJldHVybiByZXNoYXBlZDtcbn1cblxuZXhwb3J0IGNvbnN0IHNwYXJzZVRvRGVuc2VDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogU3BhcnNlVG9EZW5zZSxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IHNwYXJzZVRvRGVuc2UgYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==