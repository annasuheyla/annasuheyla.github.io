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
import { AvgPool3D, backend_util } from '@tensorflow/tfjs-core';
import { Pool3DProgram } from '../pool_gpu';
export function avgPool3D(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { filterSize, strides, pad, dimRoundingMode, dataFormat } = attrs;
    const dilations = [1, 1, 1];
    const convInfo = backend_util.computePool3DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
    const avgPoolProgram = new Pool3DProgram(convInfo, 'avg', false);
    return backend.runWebGLProgram(avgPoolProgram, [x], 'float32');
}
export const avgPool3DConfig = {
    kernelName: AvgPool3D,
    backendName: 'webgl',
    kernelFunc: avgPool3D
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZnUG9vbDNELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL0F2Z1Bvb2wzRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxPQUFPLEVBQUMsU0FBUyxFQUFtQyxZQUFZLEVBQXVDLE1BQU0sdUJBQXVCLENBQUM7QUFHckksT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUUxQyxNQUFNLFVBQVUsU0FBUyxDQUFDLElBSXpCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxDQUFDLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFDbkIsTUFBTSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFDdEUsTUFBTSxTQUFTLEdBQTZCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0RCxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQzNDLENBQUMsQ0FBQyxLQUFpRCxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQ3hFLFNBQVMsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sY0FBYyxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakUsT0FBTyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWlCO0lBQzNDLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxTQUE2QjtDQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuaW1wb3J0IHtBdmdQb29sM0QsIEF2Z1Bvb2wzREF0dHJzLCBBdmdQb29sM0RJbnB1dHMsIGJhY2tlbmRfdXRpbCwgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JJbmZvfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtQb29sM0RQcm9ncmFtfSBmcm9tICcuLi9wb29sX2dwdSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhdmdQb29sM0QoYXJnczoge1xuICBpbnB1dHM6IEF2Z1Bvb2wzRElucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IEF2Z1Bvb2wzREF0dHJzXG59KTogVGVuc29ySW5mbyB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmQsIGF0dHJzfSA9IGFyZ3M7XG4gIGNvbnN0IHt4fSA9IGlucHV0cztcbiAgY29uc3Qge2ZpbHRlclNpemUsIHN0cmlkZXMsIHBhZCwgZGltUm91bmRpbmdNb2RlLCBkYXRhRm9ybWF0fSA9IGF0dHJzO1xuICBjb25zdCBkaWxhdGlvbnM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFsxLCAxLCAxXTtcblxuICBjb25zdCBjb252SW5mbyA9IGJhY2tlbmRfdXRpbC5jb21wdXRlUG9vbDNESW5mbyhcbiAgICAgIHguc2hhcGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgZmlsdGVyU2l6ZSwgc3RyaWRlcyxcbiAgICAgIGRpbGF0aW9ucywgcGFkLCBkaW1Sb3VuZGluZ01vZGUsIGRhdGFGb3JtYXQpO1xuICBjb25zdCBhdmdQb29sUHJvZ3JhbSA9IG5ldyBQb29sM0RQcm9ncmFtKGNvbnZJbmZvLCAnYXZnJywgZmFsc2UpO1xuICByZXR1cm4gYmFja2VuZC5ydW5XZWJHTFByb2dyYW0oYXZnUG9vbFByb2dyYW0sIFt4XSwgJ2Zsb2F0MzInKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF2Z1Bvb2wzRENvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBBdmdQb29sM0QsXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBhdmdQb29sM0QgYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==