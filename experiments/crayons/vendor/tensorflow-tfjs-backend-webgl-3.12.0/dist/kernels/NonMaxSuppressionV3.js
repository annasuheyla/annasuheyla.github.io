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
import { backend_util, kernel_impls, NonMaxSuppressionV3 } from '@tensorflow/tfjs-core';
const nonMaxSuppressionV3Impl = kernel_impls.nonMaxSuppressionV3Impl;
export function nonMaxSuppressionV3(args) {
    backend_util.warn('tf.nonMaxSuppression() in webgl locks the UI thread. ' +
        'Call tf.nonMaxSuppressionAsync() instead');
    const { inputs, backend, attrs } = args;
    const { boxes, scores } = inputs;
    const { maxOutputSize, iouThreshold, scoreThreshold } = attrs;
    const boxesVals = backend.readSync(boxes.dataId);
    const scoresVals = backend.readSync(scores.dataId);
    const { selectedIndices } = nonMaxSuppressionV3Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold);
    return backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices));
}
export const nonMaxSuppressionV3Config = {
    kernelName: NonMaxSuppressionV3,
    backendName: 'webgl',
    kernelFunc: nonMaxSuppressionV3
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uTWF4U3VwcHJlc3Npb25WMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9Ob25NYXhTdXBwcmVzc2lvblYzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUE0QixtQkFBbUIsRUFBa0UsTUFBTSx1QkFBdUIsQ0FBQztBQUVqTCxNQUFNLHVCQUF1QixHQUFHLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztBQUdyRSxNQUFNLFVBQVUsbUJBQW1CLENBQUMsSUFJbkM7SUFDQyxZQUFZLENBQUMsSUFBSSxDQUNiLHVEQUF1RDtRQUN2RCwwQ0FBMEMsQ0FBQyxDQUFDO0lBRWhELE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUMvQixNQUFNLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFFNUQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFlLENBQUM7SUFDL0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFlLENBQUM7SUFFakUsTUFBTSxFQUFDLGVBQWUsRUFBQyxHQUFHLHVCQUF1QixDQUM3QyxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFeEUsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUN6QixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQWlCO0lBQ3JELFVBQVUsRUFBRSxtQkFBbUI7SUFDL0IsV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFLG1CQUF1QztDQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge2JhY2tlbmRfdXRpbCwga2VybmVsX2ltcGxzLCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIE5vbk1heFN1cHByZXNzaW9uVjMsIE5vbk1heFN1cHByZXNzaW9uVjNBdHRycywgTm9uTWF4U3VwcHJlc3Npb25WM0lucHV0cywgVHlwZWRBcnJheX0gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuY29uc3Qgbm9uTWF4U3VwcHJlc3Npb25WM0ltcGwgPSBrZXJuZWxfaW1wbHMubm9uTWF4U3VwcHJlc3Npb25WM0ltcGw7XG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9uTWF4U3VwcHJlc3Npb25WMyhhcmdzOiB7XG4gIGlucHV0czogTm9uTWF4U3VwcHJlc3Npb25WM0lucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IE5vbk1heFN1cHByZXNzaW9uVjNBdHRyc1xufSkge1xuICBiYWNrZW5kX3V0aWwud2FybihcbiAgICAgICd0Zi5ub25NYXhTdXBwcmVzc2lvbigpIGluIHdlYmdsIGxvY2tzIHRoZSBVSSB0aHJlYWQuICcgK1xuICAgICAgJ0NhbGwgdGYubm9uTWF4U3VwcHJlc3Npb25Bc3luYygpIGluc3RlYWQnKTtcblxuICBjb25zdCB7aW5wdXRzLCBiYWNrZW5kLCBhdHRyc30gPSBhcmdzO1xuICBjb25zdCB7Ym94ZXMsIHNjb3Jlc30gPSBpbnB1dHM7XG4gIGNvbnN0IHttYXhPdXRwdXRTaXplLCBpb3VUaHJlc2hvbGQsIHNjb3JlVGhyZXNob2xkfSA9IGF0dHJzO1xuXG4gIGNvbnN0IGJveGVzVmFscyA9IGJhY2tlbmQucmVhZFN5bmMoYm94ZXMuZGF0YUlkKSBhcyBUeXBlZEFycmF5O1xuICBjb25zdCBzY29yZXNWYWxzID0gYmFja2VuZC5yZWFkU3luYyhzY29yZXMuZGF0YUlkKSBhcyBUeXBlZEFycmF5O1xuXG4gIGNvbnN0IHtzZWxlY3RlZEluZGljZXN9ID0gbm9uTWF4U3VwcHJlc3Npb25WM0ltcGwoXG4gICAgICBib3hlc1ZhbHMsIHNjb3Jlc1ZhbHMsIG1heE91dHB1dFNpemUsIGlvdVRocmVzaG9sZCwgc2NvcmVUaHJlc2hvbGQpO1xuXG4gIHJldHVybiBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKFxuICAgICAgW3NlbGVjdGVkSW5kaWNlcy5sZW5ndGhdLCAnaW50MzInLCBuZXcgSW50MzJBcnJheShzZWxlY3RlZEluZGljZXMpKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5vbk1heFN1cHByZXNzaW9uVjNDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogTm9uTWF4U3VwcHJlc3Npb25WMyxcbiAgYmFja2VuZE5hbWU6ICd3ZWJnbCcsXG4gIGtlcm5lbEZ1bmM6IG5vbk1heFN1cHByZXNzaW9uVjMgYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==