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
import { backend_util, MaxPool3D } from '@tensorflow/tfjs-core';
import { Pool3DProgram } from '../pool_gpu';
export function maxPool3d(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { filterSize, strides, pad, dataFormat, dimRoundingMode } = attrs;
    const dilations = [1, 1, 1];
    const convInfo = backend_util.computePool3DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
    const maxPoolProgram = new Pool3DProgram(convInfo, 'max', false);
    return backend.runWebGLProgram(maxPoolProgram, [x], x.dtype);
}
export const maxPool3DConfig = {
    kernelName: MaxPool3D,
    backendName: 'webgl',
    kernelFunc: maxPool3d
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF4UG9vbDNELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL01heFBvb2wzRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxPQUFPLEVBQUMsWUFBWSxFQUE0QixTQUFTLEVBQThDLE1BQU0sdUJBQXVCLENBQUM7QUFHckksT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUUxQyxNQUFNLFVBQVUsU0FBUyxDQUFDLElBSXpCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxDQUFDLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFDbkIsTUFBTSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFDdEUsTUFBTSxTQUFTLEdBQTZCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0RCxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQzNDLENBQUMsQ0FBQyxLQUFpRCxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQ3hFLFNBQVMsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sY0FBYyxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakUsT0FBTyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFpQjtJQUMzQyxVQUFVLEVBQUUsU0FBUztJQUNyQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsU0FBNkI7Q0FDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cbmltcG9ydCB7YmFja2VuZF91dGlsLCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIE1heFBvb2wzRCwgTWF4UG9vbDNEQXR0cnMsIE1heFBvb2wzRElucHV0cywgVGVuc29ySW5mb30gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuaW1wb3J0IHtNYXRoQmFja2VuZFdlYkdMfSBmcm9tICcuLi9iYWNrZW5kX3dlYmdsJztcbmltcG9ydCB7UG9vbDNEUHJvZ3JhbX0gZnJvbSAnLi4vcG9vbF9ncHUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4UG9vbDNkKGFyZ3M6IHtcbiAgaW5wdXRzOiBNYXhQb29sM0RJbnB1dHMsXG4gIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0wsXG4gIGF0dHJzOiBNYXhQb29sM0RBdHRyc1xufSk6IFRlbnNvckluZm8ge1xuICBjb25zdCB7aW5wdXRzLCBiYWNrZW5kLCBhdHRyc30gPSBhcmdzO1xuICBjb25zdCB7eH0gPSBpbnB1dHM7XG4gIGNvbnN0IHtmaWx0ZXJTaXplLCBzdHJpZGVzLCBwYWQsIGRhdGFGb3JtYXQsIGRpbVJvdW5kaW5nTW9kZX0gPSBhdHRycztcbiAgY29uc3QgZGlsYXRpb25zOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBbMSwgMSwgMV07XG5cbiAgY29uc3QgY29udkluZm8gPSBiYWNrZW5kX3V0aWwuY29tcHV0ZVBvb2wzREluZm8oXG4gICAgICB4LnNoYXBlIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sIGZpbHRlclNpemUsIHN0cmlkZXMsXG4gICAgICBkaWxhdGlvbnMsIHBhZCwgZGltUm91bmRpbmdNb2RlLCBkYXRhRm9ybWF0KTtcbiAgY29uc3QgbWF4UG9vbFByb2dyYW0gPSBuZXcgUG9vbDNEUHJvZ3JhbShjb252SW5mbywgJ21heCcsIGZhbHNlKTtcbiAgcmV0dXJuIGJhY2tlbmQucnVuV2ViR0xQcm9ncmFtKG1heFBvb2xQcm9ncmFtLCBbeF0sIHguZHR5cGUpO1xufVxuXG5leHBvcnQgY29uc3QgbWF4UG9vbDNEQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IE1heFBvb2wzRCxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IG1heFBvb2wzZCBhcyB7fSBhcyBLZXJuZWxGdW5jXG59O1xuIl19