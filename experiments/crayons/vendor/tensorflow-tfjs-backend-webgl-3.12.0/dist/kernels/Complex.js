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
import { Complex } from '@tensorflow/tfjs-core';
import { identity } from './Identity';
/**
 * In WebGL data is stored in GPU textures which can't be efficiently copied, so
 * complex tensors share data with their real and imaginary components. Complex
 * tensors' reference to the components is tracked by refCount on the individual
 * component. The refCounts are increased by the identity call.
 *
 * When a complex tensor is disposed, it will reduce the refCount on the
 * components by calling disposeData on each.
 */
export function complex(args) {
    const { inputs, backend } = args;
    const { real, imag } = inputs;
    const complexInfo = backend.makeTensorInfo(real.shape, 'complex64');
    const complex = backend.texData.get(complexInfo.dataId);
    const realTensorInfo = identity({ inputs: { x: real }, backend });
    const imagTensorInfo = identity({ inputs: { x: imag }, backend });
    complex.complexTensorInfos = { real: realTensorInfo, imag: imagTensorInfo };
    return complexInfo;
}
export const complexConfig = {
    kernelName: Complex,
    backendName: 'webgl',
    kernelFunc: complex
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcGxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9Db21wbGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxPQUFPLEVBQXNELE1BQU0sdUJBQXVCLENBQUM7QUFHbkcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUVwQzs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQ25CLElBQXdEO0lBQzFELE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBRTVCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFeEQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBQyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBQyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFFOUQsT0FBTyxDQUFDLGtCQUFrQixHQUFHLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7SUFFMUUsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBaUI7SUFDekMsVUFBVSxFQUFFLE9BQU87SUFDbkIsV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFLE9BQTJCO0NBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7Q29tcGxleCwgQ29tcGxleElucHV0cywgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JJbmZvfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnLi9JZGVudGl0eSc7XG5cbi8qKlxuICogSW4gV2ViR0wgZGF0YSBpcyBzdG9yZWQgaW4gR1BVIHRleHR1cmVzIHdoaWNoIGNhbid0IGJlIGVmZmljaWVudGx5IGNvcGllZCwgc29cbiAqIGNvbXBsZXggdGVuc29ycyBzaGFyZSBkYXRhIHdpdGggdGhlaXIgcmVhbCBhbmQgaW1hZ2luYXJ5IGNvbXBvbmVudHMuIENvbXBsZXhcbiAqIHRlbnNvcnMnIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50cyBpcyB0cmFja2VkIGJ5IHJlZkNvdW50IG9uIHRoZSBpbmRpdmlkdWFsXG4gKiBjb21wb25lbnQuIFRoZSByZWZDb3VudHMgYXJlIGluY3JlYXNlZCBieSB0aGUgaWRlbnRpdHkgY2FsbC5cbiAqXG4gKiBXaGVuIGEgY29tcGxleCB0ZW5zb3IgaXMgZGlzcG9zZWQsIGl0IHdpbGwgcmVkdWNlIHRoZSByZWZDb3VudCBvbiB0aGVcbiAqIGNvbXBvbmVudHMgYnkgY2FsbGluZyBkaXNwb3NlRGF0YSBvbiBlYWNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGxleChcbiAgICBhcmdzOiB7aW5wdXRzOiBDb21wbGV4SW5wdXRzLCBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMfSk6IFRlbnNvckluZm8ge1xuICBjb25zdCB7aW5wdXRzLCBiYWNrZW5kfSA9IGFyZ3M7XG4gIGNvbnN0IHtyZWFsLCBpbWFnfSA9IGlucHV0cztcblxuICBjb25zdCBjb21wbGV4SW5mbyA9IGJhY2tlbmQubWFrZVRlbnNvckluZm8ocmVhbC5zaGFwZSwgJ2NvbXBsZXg2NCcpO1xuICBjb25zdCBjb21wbGV4ID0gYmFja2VuZC50ZXhEYXRhLmdldChjb21wbGV4SW5mby5kYXRhSWQpO1xuXG4gIGNvbnN0IHJlYWxUZW5zb3JJbmZvID0gaWRlbnRpdHkoe2lucHV0czoge3g6IHJlYWx9LCBiYWNrZW5kfSk7XG5cbiAgY29uc3QgaW1hZ1RlbnNvckluZm8gPSBpZGVudGl0eSh7aW5wdXRzOiB7eDogaW1hZ30sIGJhY2tlbmR9KTtcblxuICBjb21wbGV4LmNvbXBsZXhUZW5zb3JJbmZvcyA9IHtyZWFsOiByZWFsVGVuc29ySW5mbywgaW1hZzogaW1hZ1RlbnNvckluZm99O1xuXG4gIHJldHVybiBjb21wbGV4SW5mbztcbn1cblxuZXhwb3J0IGNvbnN0IGNvbXBsZXhDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogQ29tcGxleCxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IGNvbXBsZXggYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==