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
import { Transpose } from '@tensorflow/tfjs-core';
import { transposeImpl } from './Transpose_impl';
import { transposeImplCPU as cpuTranspose } from './Transpose_impl';
export function transpose(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { perm } = attrs;
    const webglBackend = backend;
    const xRank = x.shape.length;
    const newShape = new Array(xRank);
    for (let i = 0; i < newShape.length; i++) {
        newShape[i] = x.shape[perm[i]];
    }
    let out;
    if (webglBackend.shouldExecuteOnCPU([x])) {
        const xTexData = webglBackend.texData.get(x.dataId);
        const values = xTexData.values;
        const outValues = cpuTranspose(values, x.shape, x.dtype, perm, newShape);
        out = webglBackend.makeTensorInfo(newShape, x.dtype);
        const outData = webglBackend.texData.get(out.dataId);
        outData.values = outValues;
    }
    else {
        out = transposeImpl(x, perm, webglBackend);
    }
    return out;
}
export const transposeConfig = {
    kernelName: Transpose,
    backendName: 'webgl',
    kernelFunc: transpose
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNwb3NlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL1RyYW5zcG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQXVDLFNBQVMsRUFBOEMsTUFBTSx1QkFBdUIsQ0FBQztBQUluSSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixJQUFJLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFJekI7SUFDQyxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDdEMsTUFBTSxFQUFDLENBQUMsRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUNuQixNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUU3QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUU3QixNQUFNLFFBQVEsR0FBYSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQztJQUVELElBQUksR0FBZSxDQUFDO0lBQ3BCLElBQUksWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQW9CLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXpFLEdBQUcsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0tBQzVCO1NBQU07UUFDTCxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDNUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWlCO0lBQzNDLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxTQUE2QjtDQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0tlcm5lbENvbmZpZywgS2VybmVsRnVuYywgVGVuc29ySW5mbywgVHJhbnNwb3NlLCBUcmFuc3Bvc2VBdHRycywgVHJhbnNwb3NlSW5wdXRzLCBUeXBlZEFycmF5fSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuXG5pbXBvcnQge3RyYW5zcG9zZUltcGx9IGZyb20gJy4vVHJhbnNwb3NlX2ltcGwnO1xuaW1wb3J0IHt0cmFuc3Bvc2VJbXBsQ1BVIGFzIGNwdVRyYW5zcG9zZX0gZnJvbSAnLi9UcmFuc3Bvc2VfaW1wbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2UoYXJnczoge1xuICBpbnB1dHM6IFRyYW5zcG9zZUlucHV0cyxcbiAgYXR0cnM6IFRyYW5zcG9zZUF0dHJzLFxuICBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMXG59KSB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmQsIGF0dHJzfSA9IGFyZ3M7XG4gIGNvbnN0IHt4fSA9IGlucHV0cztcbiAgY29uc3Qge3Blcm19ID0gYXR0cnM7XG4gIGNvbnN0IHdlYmdsQmFja2VuZCA9IGJhY2tlbmQ7XG5cbiAgY29uc3QgeFJhbmsgPSB4LnNoYXBlLmxlbmd0aDtcblxuICBjb25zdCBuZXdTaGFwZTogbnVtYmVyW10gPSBuZXcgQXJyYXkoeFJhbmspO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1NoYXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgbmV3U2hhcGVbaV0gPSB4LnNoYXBlW3Blcm1baV1dO1xuICB9XG5cbiAgbGV0IG91dDogVGVuc29ySW5mbztcbiAgaWYgKHdlYmdsQmFja2VuZC5zaG91bGRFeGVjdXRlT25DUFUoW3hdKSkge1xuICAgIGNvbnN0IHhUZXhEYXRhID0gd2ViZ2xCYWNrZW5kLnRleERhdGEuZ2V0KHguZGF0YUlkKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB4VGV4RGF0YS52YWx1ZXMgYXMgVHlwZWRBcnJheTtcbiAgICBjb25zdCBvdXRWYWx1ZXMgPSBjcHVUcmFuc3Bvc2UodmFsdWVzLCB4LnNoYXBlLCB4LmR0eXBlLCBwZXJtLCBuZXdTaGFwZSk7XG5cbiAgICBvdXQgPSB3ZWJnbEJhY2tlbmQubWFrZVRlbnNvckluZm8obmV3U2hhcGUsIHguZHR5cGUpO1xuICAgIGNvbnN0IG91dERhdGEgPSB3ZWJnbEJhY2tlbmQudGV4RGF0YS5nZXQob3V0LmRhdGFJZCk7XG4gICAgb3V0RGF0YS52YWx1ZXMgPSBvdXRWYWx1ZXM7XG4gIH0gZWxzZSB7XG4gICAgb3V0ID0gdHJhbnNwb3NlSW1wbCh4LCBwZXJtLCB3ZWJnbEJhY2tlbmQpO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc3Bvc2VDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogVHJhbnNwb3NlLFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogdHJhbnNwb3NlIGFzIHt9IGFzIEtlcm5lbEZ1bmNcbn07XG4iXX0=