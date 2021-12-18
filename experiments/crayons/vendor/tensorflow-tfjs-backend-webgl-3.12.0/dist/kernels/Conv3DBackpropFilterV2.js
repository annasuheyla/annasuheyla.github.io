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
import { backend_util, Conv3DBackpropFilterV2 } from '@tensorflow/tfjs-core';
import { Conv3DDerFilterProgram } from '../conv_backprop_gpu';
export function conv3DBackpropFilterV2(args) {
    const { inputs, backend, attrs } = args;
    const { x, dy } = inputs;
    const { strides, pad, filterShape } = attrs;
    const convInfo = backend_util.computeConv3DInfo(x.shape, filterShape, strides, 1 /* dilations */, pad);
    const program = new Conv3DDerFilterProgram(convInfo);
    return backend.runWebGLProgram(program, [x, dy], 'float32');
}
export const conv3DBackpropFilterV2Config = {
    kernelName: Conv3DBackpropFilterV2,
    backendName: 'webgl',
    kernelFunc: conv3DBackpropFilterV2
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udjNEQmFja3Byb3BGaWx0ZXJWMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9Db252M0RCYWNrcHJvcEZpbHRlclYyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQXNGLE1BQU0sdUJBQXVCLENBQUM7QUFHaEssT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFNUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLElBSXRDO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLE1BQU0sRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQyxHQUFHLEtBQUssQ0FBQztJQUUxQyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQzNDLENBQUMsQ0FBQyxLQUFpRCxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQ3pFLENBQUMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxPQUFPLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBaUI7SUFDeEQsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsc0JBQTBDO0NBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7YmFja2VuZF91dGlsLCBDb252M0RCYWNrcHJvcEZpbHRlclYyLCBDb252M0RCYWNrcHJvcEZpbHRlclYyQXR0cnMsIENvbnYzREJhY2twcm9wRmlsdGVyVjJJbnB1dHMsIEtlcm5lbENvbmZpZywgS2VybmVsRnVuY30gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuaW1wb3J0IHtNYXRoQmFja2VuZFdlYkdMfSBmcm9tICcuLi9iYWNrZW5kX3dlYmdsJztcbmltcG9ydCB7Q29udjNERGVyRmlsdGVyUHJvZ3JhbX0gZnJvbSAnLi4vY29udl9iYWNrcHJvcF9ncHUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udjNEQmFja3Byb3BGaWx0ZXJWMihhcmdzOiB7XG4gIGlucHV0czogQ29udjNEQmFja3Byb3BGaWx0ZXJWMklucHV0cyxcbiAgYXR0cnM6IENvbnYzREJhY2twcm9wRmlsdGVyVjJBdHRycyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTFxufSkge1xuICBjb25zdCB7aW5wdXRzLCBiYWNrZW5kLCBhdHRyc30gPSBhcmdzO1xuICBjb25zdCB7eCwgZHl9ID0gaW5wdXRzO1xuICBjb25zdCB7c3RyaWRlcywgcGFkLCBmaWx0ZXJTaGFwZX0gPSBhdHRycztcblxuICBjb25zdCBjb252SW5mbyA9IGJhY2tlbmRfdXRpbC5jb21wdXRlQ29udjNESW5mbyhcbiAgICAgIHguc2hhcGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgZmlsdGVyU2hhcGUsIHN0cmlkZXMsXG4gICAgICAxIC8qIGRpbGF0aW9ucyAqLywgcGFkKTtcblxuICBjb25zdCBwcm9ncmFtID0gbmV3IENvbnYzRERlckZpbHRlclByb2dyYW0oY29udkluZm8pO1xuICByZXR1cm4gYmFja2VuZC5ydW5XZWJHTFByb2dyYW0ocHJvZ3JhbSwgW3gsIGR5XSwgJ2Zsb2F0MzInKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbnYzREJhY2twcm9wRmlsdGVyVjJDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogQ29udjNEQmFja3Byb3BGaWx0ZXJWMixcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IGNvbnYzREJhY2twcm9wRmlsdGVyVjIgYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==