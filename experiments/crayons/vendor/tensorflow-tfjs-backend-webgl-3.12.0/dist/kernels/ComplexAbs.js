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
import { ComplexAbs } from '@tensorflow/tfjs-core';
import { ComplexAbsProgram } from '../complex_abs_gpu';
// Returns a TensorInfo with the complex shape and the dataId of the
// underlying part. We need to do this because a reshaped complex tensor is
// not reflected in its parts.
function makeComplexComponentTensorInfo(complexTensor, complexPart) {
    return {
        dataId: complexPart.dataId,
        dtype: complexPart.dtype,
        shape: complexTensor.shape
    };
}
export function complexAbs(args) {
    const { inputs, backend } = args;
    const { x } = inputs;
    const xData = backend.texData.get(x.dataId);
    const program = new ComplexAbsProgram(x.shape);
    const programInputs = [
        makeComplexComponentTensorInfo(x, xData.complexTensorInfos.real),
        makeComplexComponentTensorInfo(x, xData.complexTensorInfos.imag),
    ];
    return backend.runWebGLProgram(program, programInputs, programInputs[0].dtype);
}
export const complexAbsConfig = {
    kernelName: ComplexAbs,
    backendName: 'webgl',
    kernelFunc: complexAbs
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcGxleEFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMva2VybmVscy9Db21wbGV4QWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQXlELE1BQU0sdUJBQXVCLENBQUM7QUFHekcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsb0VBQW9FO0FBQ3BFLDJFQUEyRTtBQUMzRSw4QkFBOEI7QUFDOUIsU0FBUyw4QkFBOEIsQ0FDbkMsYUFBeUIsRUFBRSxXQUF1QjtJQUNwRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1FBQzFCLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSztRQUN4QixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7S0FDM0IsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUN0QixJQUEyRDtJQUM3RCxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUMvQixNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBRW5CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxNQUFNLGFBQWEsR0FBRztRQUNwQiw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUNoRSw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztLQUNqRSxDQUFDO0lBRUYsT0FBTyxPQUFPLENBQUMsZUFBZSxDQUMxQixPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQWlCO0lBQzVDLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxVQUE4QjtDQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0NvbXBsZXhBYnMsIENvbXBsZXhBYnNJbnB1dHMsIEtlcm5lbENvbmZpZywgS2VybmVsRnVuYywgVGVuc29ySW5mb30gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcblxuaW1wb3J0IHtNYXRoQmFja2VuZFdlYkdMfSBmcm9tICcuLi9iYWNrZW5kX3dlYmdsJztcbmltcG9ydCB7Q29tcGxleEFic1Byb2dyYW19IGZyb20gJy4uL2NvbXBsZXhfYWJzX2dwdSc7XG5cbi8vIFJldHVybnMgYSBUZW5zb3JJbmZvIHdpdGggdGhlIGNvbXBsZXggc2hhcGUgYW5kIHRoZSBkYXRhSWQgb2YgdGhlXG4vLyB1bmRlcmx5aW5nIHBhcnQuIFdlIG5lZWQgdG8gZG8gdGhpcyBiZWNhdXNlIGEgcmVzaGFwZWQgY29tcGxleCB0ZW5zb3IgaXNcbi8vIG5vdCByZWZsZWN0ZWQgaW4gaXRzIHBhcnRzLlxuZnVuY3Rpb24gbWFrZUNvbXBsZXhDb21wb25lbnRUZW5zb3JJbmZvKFxuICAgIGNvbXBsZXhUZW5zb3I6IFRlbnNvckluZm8sIGNvbXBsZXhQYXJ0OiBUZW5zb3JJbmZvKTogVGVuc29ySW5mbyB7XG4gIHJldHVybiB7XG4gICAgZGF0YUlkOiBjb21wbGV4UGFydC5kYXRhSWQsXG4gICAgZHR5cGU6IGNvbXBsZXhQYXJ0LmR0eXBlLFxuICAgIHNoYXBlOiBjb21wbGV4VGVuc29yLnNoYXBlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wbGV4QWJzKFxuICAgIGFyZ3M6IHtpbnB1dHM6IENvbXBsZXhBYnNJbnB1dHMsIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0x9KTogVGVuc29ySW5mbyB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmR9ID0gYXJncztcbiAgY29uc3Qge3h9ID0gaW5wdXRzO1xuXG4gIGNvbnN0IHhEYXRhID0gYmFja2VuZC50ZXhEYXRhLmdldCh4LmRhdGFJZCk7XG5cbiAgY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21wbGV4QWJzUHJvZ3JhbSh4LnNoYXBlKTtcbiAgY29uc3QgcHJvZ3JhbUlucHV0cyA9IFtcbiAgICBtYWtlQ29tcGxleENvbXBvbmVudFRlbnNvckluZm8oeCwgeERhdGEuY29tcGxleFRlbnNvckluZm9zLnJlYWwpLFxuICAgIG1ha2VDb21wbGV4Q29tcG9uZW50VGVuc29ySW5mbyh4LCB4RGF0YS5jb21wbGV4VGVuc29ySW5mb3MuaW1hZyksXG4gIF07XG5cbiAgcmV0dXJuIGJhY2tlbmQucnVuV2ViR0xQcm9ncmFtKFxuICAgICAgcHJvZ3JhbSwgcHJvZ3JhbUlucHV0cywgcHJvZ3JhbUlucHV0c1swXS5kdHlwZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb21wbGV4QWJzQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IENvbXBsZXhBYnMsXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBjb21wbGV4QWJzIGFzIHt9IGFzIEtlcm5lbEZ1bmNcbn07XG4iXX0=