/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { Unique } from '@tensorflow/tfjs-core';
import { uniqueImplCPU } from '../kernel_utils/shared';
import { assertNotComplex } from '../webgl_util';
export function unique(args) {
    const { inputs, attrs, backend } = args;
    const { axis } = attrs;
    const { x } = inputs;
    assertNotComplex(x, 'unique');
    // For now, always forward calculation to the CPU backend.
    console.warn('WARNING: ', 'UI might be locked temporarily as data is being downloaded');
    const values = backend.readSync(x.dataId);
    const { outputValues, outputShape, indices } = uniqueImplCPU(values, axis, x.shape, x.dtype);
    return [
        backend.makeTensorInfo(outputShape, x.dtype, outputValues),
        backend.makeTensorInfo([indices.length], 'int32', indices),
    ];
}
export const uniqueConfig = {
    kernelName: Unique,
    backendName: 'webgl',
    kernelFunc: unique,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pcXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL1VuaXF1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQXVDLE1BQU0sRUFBNEIsTUFBTSx1QkFBdUIsQ0FBQztBQUc5RyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE1BQU0sVUFBVSxNQUFNLENBQ2xCLElBQ3lFO0lBRTNFLE1BQU0sRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLE1BQU0sRUFBQyxDQUFDLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFDbkIsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTlCLDBEQUEwRDtJQUMxRCxPQUFPLENBQUMsSUFBSSxDQUNSLFdBQVcsRUFDWCw0REFBNEQsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLE1BQU0sRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBQyxHQUN0QyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxPQUFPO1FBQ0wsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7UUFDMUQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO0tBQzNELENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxVQUFVLEVBQUUsTUFBTTtJQUNsQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsTUFBMEI7Q0FDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgTGljZW5zZSk7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBBUyBJUyBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7S2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JJbmZvLCBVbmlxdWUsIFVuaXF1ZUF0dHJzLCBVbmlxdWVJbnB1dHN9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRXZWJHTH0gZnJvbSAnLi4vYmFja2VuZF93ZWJnbCc7XG5pbXBvcnQge3VuaXF1ZUltcGxDUFV9IGZyb20gJy4uL2tlcm5lbF91dGlscy9zaGFyZWQnO1xuaW1wb3J0IHthc3NlcnROb3RDb21wbGV4fSBmcm9tICcuLi93ZWJnbF91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZShcbiAgICBhcmdzOlxuICAgICAgICB7aW5wdXRzOiBVbmlxdWVJbnB1dHMsIGF0dHJzOiBVbmlxdWVBdHRycywgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTH0pOlxuICAgIFRlbnNvckluZm9bXSB7XG4gIGNvbnN0IHtpbnB1dHMsIGF0dHJzLCBiYWNrZW5kfSA9IGFyZ3M7XG4gIGNvbnN0IHtheGlzfSA9IGF0dHJzO1xuICBjb25zdCB7eH0gPSBpbnB1dHM7XG4gIGFzc2VydE5vdENvbXBsZXgoeCwgJ3VuaXF1ZScpO1xuXG4gIC8vIEZvciBub3csIGFsd2F5cyBmb3J3YXJkIGNhbGN1bGF0aW9uIHRvIHRoZSBDUFUgYmFja2VuZC5cbiAgY29uc29sZS53YXJuKFxuICAgICAgJ1dBUk5JTkc6ICcsXG4gICAgICAnVUkgbWlnaHQgYmUgbG9ja2VkIHRlbXBvcmFyaWx5IGFzIGRhdGEgaXMgYmVpbmcgZG93bmxvYWRlZCcpO1xuICBjb25zdCB2YWx1ZXMgPSBiYWNrZW5kLnJlYWRTeW5jKHguZGF0YUlkKTtcbiAgY29uc3Qge291dHB1dFZhbHVlcywgb3V0cHV0U2hhcGUsIGluZGljZXN9ID1cbiAgICAgIHVuaXF1ZUltcGxDUFUodmFsdWVzLCBheGlzLCB4LnNoYXBlLCB4LmR0eXBlKTtcbiAgcmV0dXJuIFtcbiAgICBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKG91dHB1dFNoYXBlLCB4LmR0eXBlLCBvdXRwdXRWYWx1ZXMpLFxuICAgIGJhY2tlbmQubWFrZVRlbnNvckluZm8oW2luZGljZXMubGVuZ3RoXSwgJ2ludDMyJywgaW5kaWNlcyksXG4gIF07XG59XG5cbmV4cG9ydCBjb25zdCB1bmlxdWVDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogVW5pcXVlLFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogdW5pcXVlIGFzIHt9IGFzIEtlcm5lbEZ1bmMsXG59O1xuIl19