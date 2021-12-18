/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
import { SparseSegmentSum } from '@tensorflow/tfjs-core';
import { sparseSegmentReductionImplCPU } from '../kernel_utils/shared';
export function sparseSegmentSum(args) {
    const { inputs, backend } = args;
    const { data, indices, segmentIds } = inputs;
    if (data.shape.length < 1) {
        throw new Error(`Data should be at least 1 dimensional but received scalar`);
    }
    if (indices.shape.length !== 1) {
        throw new Error(`Indices should be a vector but received shape
             ${indices.shape}`);
    }
    if (segmentIds.shape.length !== 1) {
        throw new Error(`Segment ids should be a vector but received shape
             ${segmentIds.shape}`);
    }
    const $data = backend.readSync(data.dataId);
    const $indices = backend.readSync(indices.dataId);
    const $segmentIds = backend.readSync(segmentIds.dataId);
    const [outputData, outputDataShape] = sparseSegmentReductionImplCPU($data, data.shape, data.dtype, $indices, $segmentIds);
    return backend.makeTensorInfo(outputDataShape, data.dtype, outputData);
}
export const sparseSegmentSumConfig = {
    kernelName: SparseSegmentSum,
    backendName: 'webgl',
    kernelFunc: sparseSegmentSum,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcnNlU2VnbWVudFN1bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9TcGFyc2VTZWdtZW50U3VtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBMkIsZ0JBQWdCLEVBQWlELE1BQU0sdUJBQXVCLENBQUM7QUFHakksT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFckUsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixJQUFpRTtJQUVuRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUMvQixNQUFNLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFDM0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FDWCwyREFBMkQsQ0FBQyxDQUFDO0tBQ2xFO0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQztlQUNMLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQzdCO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQztlQUNMLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFlLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFlLENBQUM7SUFDaEUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFlLENBQUM7SUFFdEUsTUFBTSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsR0FBRyw2QkFBNkIsQ0FDL0QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUQsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBaUI7SUFDbEQsVUFBVSxFQUFFLGdCQUFnQjtJQUM1QixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsZ0JBQW9DO0NBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7S2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBTcGFyc2VTZWdtZW50U3VtLCBTcGFyc2VTZWdtZW50U3VtSW5wdXRzLCBUZW5zb3JJbmZvLCBUeXBlZEFycmF5fSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtzcGFyc2VTZWdtZW50UmVkdWN0aW9uSW1wbENQVX0gZnJvbSAnLi4va2VybmVsX3V0aWxzL3NoYXJlZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFyc2VTZWdtZW50U3VtKFxuICAgIGFyZ3M6IHtpbnB1dHM6IFNwYXJzZVNlZ21lbnRTdW1JbnB1dHMsIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0x9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZH0gPSBhcmdzO1xuICBjb25zdCB7ZGF0YSwgaW5kaWNlcywgc2VnbWVudElkc30gPSBpbnB1dHM7XG4gIGlmIChkYXRhLnNoYXBlLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBEYXRhIHNob3VsZCBiZSBhdCBsZWFzdCAxIGRpbWVuc2lvbmFsIGJ1dCByZWNlaXZlZCBzY2FsYXJgKTtcbiAgfVxuICBpZiAoaW5kaWNlcy5zaGFwZS5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEluZGljZXMgc2hvdWxkIGJlIGEgdmVjdG9yIGJ1dCByZWNlaXZlZCBzaGFwZVxuICAgICAgICAgICAgICR7aW5kaWNlcy5zaGFwZX1gKTtcbiAgfVxuICBpZiAoc2VnbWVudElkcy5zaGFwZS5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNlZ21lbnQgaWRzIHNob3VsZCBiZSBhIHZlY3RvciBidXQgcmVjZWl2ZWQgc2hhcGVcbiAgICAgICAgICAgICAke3NlZ21lbnRJZHMuc2hhcGV9YCk7XG4gIH1cblxuICBjb25zdCAkZGF0YSA9IGJhY2tlbmQucmVhZFN5bmMoZGF0YS5kYXRhSWQpIGFzIFR5cGVkQXJyYXk7XG4gIGNvbnN0ICRpbmRpY2VzID0gYmFja2VuZC5yZWFkU3luYyhpbmRpY2VzLmRhdGFJZCkgYXMgVHlwZWRBcnJheTtcbiAgY29uc3QgJHNlZ21lbnRJZHMgPSBiYWNrZW5kLnJlYWRTeW5jKHNlZ21lbnRJZHMuZGF0YUlkKSBhcyBUeXBlZEFycmF5O1xuXG4gIGNvbnN0IFtvdXRwdXREYXRhLCBvdXRwdXREYXRhU2hhcGVdID0gc3BhcnNlU2VnbWVudFJlZHVjdGlvbkltcGxDUFUoXG4gICAgICAkZGF0YSwgZGF0YS5zaGFwZSwgZGF0YS5kdHlwZSwgJGluZGljZXMsICRzZWdtZW50SWRzKTtcbiAgcmV0dXJuIGJhY2tlbmQubWFrZVRlbnNvckluZm8ob3V0cHV0RGF0YVNoYXBlLCBkYXRhLmR0eXBlLCBvdXRwdXREYXRhKTtcbn1cblxuZXhwb3J0IGNvbnN0IHNwYXJzZVNlZ21lbnRTdW1Db25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogU3BhcnNlU2VnbWVudFN1bSxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IHNwYXJzZVNlZ21lbnRTdW0gYXMge30gYXMgS2VybmVsRnVuYyxcbn07XG4iXX0=