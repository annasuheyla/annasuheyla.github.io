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
import { env, MirrorPad } from '@tensorflow/tfjs-core';
import { MirrorPadProgram } from '../mirror_pad_gpu';
import { MirrorPadPackedProgram } from '../mirror_pad_packed_gpu';
export const mirrorPadKernelFunc = ({ inputs, backend, attrs }) => {
    const { x } = inputs;
    const { paddings, mode } = attrs;
    const program = env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ?
        new MirrorPadPackedProgram(x.shape, paddings, mode) :
        new MirrorPadProgram(x.shape, paddings, mode);
    const output = backend.runWebGLProgram(program, [x], x.dtype);
    return output;
};
export const mirrorPadConfig = {
    kernelName: MirrorPad,
    backendName: 'webgl',
    kernelFunc: mirrorPadKernelFunc,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlycm9yUGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL01pcnJvclBhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsR0FBRyxFQUE0QixTQUFTLEVBQThDLE1BQU0sdUJBQXVCLENBQUM7QUFHNUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBSWIsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEVBQUUsRUFBRTtJQUM5QyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ25CLE1BQU0sRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBRS9CLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFbEQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFpQjtJQUMzQyxVQUFVLEVBQUUsU0FBUztJQUNyQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsbUJBQXVDO0NBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7ZW52LCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIE1pcnJvclBhZCwgTWlycm9yUGFkQXR0cnMsIE1pcnJvclBhZElucHV0cywgVGVuc29ySW5mb30gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuaW1wb3J0IHtNYXRoQmFja2VuZFdlYkdMfSBmcm9tICcuLi9iYWNrZW5kX3dlYmdsJztcbmltcG9ydCB7TWlycm9yUGFkUHJvZ3JhbX0gZnJvbSAnLi4vbWlycm9yX3BhZF9ncHUnO1xuaW1wb3J0IHtNaXJyb3JQYWRQYWNrZWRQcm9ncmFtfSBmcm9tICcuLi9taXJyb3JfcGFkX3BhY2tlZF9ncHUnO1xuXG5leHBvcnQgY29uc3QgbWlycm9yUGFkS2VybmVsRnVuYzogKHBhcmFtczoge1xuICBpbnB1dHM6IE1pcnJvclBhZElucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IE1pcnJvclBhZEF0dHJzXG59KSA9PiBUZW5zb3JJbmZvID0gKHtpbnB1dHMsIGJhY2tlbmQsIGF0dHJzfSkgPT4ge1xuICBjb25zdCB7eH0gPSBpbnB1dHM7XG4gIGNvbnN0IHtwYWRkaW5ncywgbW9kZX0gPSBhdHRycztcblxuICBjb25zdCBwcm9ncmFtID0gZW52KCkuZ2V0Qm9vbCgnV0VCR0xfUEFDS19BUlJBWV9PUEVSQVRJT05TJykgP1xuICAgICAgbmV3IE1pcnJvclBhZFBhY2tlZFByb2dyYW0oeC5zaGFwZSwgcGFkZGluZ3MsIG1vZGUpIDpcbiAgICAgIG5ldyBNaXJyb3JQYWRQcm9ncmFtKHguc2hhcGUsIHBhZGRpbmdzLCBtb2RlKTtcblxuICBjb25zdCBvdXRwdXQgPSBiYWNrZW5kLnJ1bldlYkdMUHJvZ3JhbShwcm9ncmFtLCBbeF0sIHguZHR5cGUpO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgY29uc3QgbWlycm9yUGFkQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IE1pcnJvclBhZCxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IG1pcnJvclBhZEtlcm5lbEZ1bmMgYXMge30gYXMgS2VybmVsRnVuYyxcbn07XG4iXX0=