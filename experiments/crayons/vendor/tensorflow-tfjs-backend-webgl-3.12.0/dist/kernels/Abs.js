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
import { Abs, env } from '@tensorflow/tfjs-core';
import { simpleAbsImplCPU } from '../kernel_utils/shared';
import { UnaryOpProgram } from '../unaryop_gpu';
import { UnaryOpPackedProgram } from '../unaryop_packed_gpu';
const ABS = `return abs(x);`;
export function abs(args) {
    const { inputs, backend } = args;
    const { x } = inputs;
    // TODO: handle cases when x is complex. Once the cpu implementation
    // can handle complex values, refactor to use unaryKernelFunc.
    if (backend.shouldExecuteOnCPU([x]) && x.dtype !== 'complex64') {
        const xData = backend.texData.get(x.dataId);
        const outValues = simpleAbsImplCPU(xData.values);
        return backend.makeTensorInfo(x.shape, x.dtype, outValues);
    }
    let program;
    if (env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
        program = new UnaryOpPackedProgram(x.shape, ABS);
    }
    else {
        program = new UnaryOpProgram(x.shape, ABS);
    }
    return backend.runWebGLProgram(program, [x], x.dtype);
}
export const absConfig = {
    kernelName: Abs,
    backendName: 'webgl',
    kernelFunc: abs
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL0Ficy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsR0FBRyxFQUFhLEdBQUcsRUFBbUQsTUFBTSx1QkFBdUIsQ0FBQztBQUc1RyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFM0QsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7QUFFN0IsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFvRDtJQUV0RSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUMvQixNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBRW5CLG9FQUFvRTtJQUNwRSw4REFBOEQ7SUFDOUQsSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQzlELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBb0IsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDNUQ7SUFFRCxJQUFJLE9BQTRDLENBQUM7SUFDakQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsRUFBRTtRQUNoRCxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2xEO1NBQU07UUFDTCxPQUFPLEdBQUcsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM1QztJQUNELE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBaUI7SUFDckMsVUFBVSxFQUFFLEdBQUc7SUFDZixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsR0FBdUI7Q0FDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtBYnMsIEFic0lucHV0cywgZW52LCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIFRlbnNvckluZm8sIFR5cGVkQXJyYXl9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRXZWJHTH0gZnJvbSAnLi4vYmFja2VuZF93ZWJnbCc7XG5pbXBvcnQge3NpbXBsZUFic0ltcGxDUFV9IGZyb20gJy4uL2tlcm5lbF91dGlscy9zaGFyZWQnO1xuaW1wb3J0IHtVbmFyeU9wUHJvZ3JhbX0gZnJvbSAnLi4vdW5hcnlvcF9ncHUnO1xuaW1wb3J0IHtVbmFyeU9wUGFja2VkUHJvZ3JhbX0gZnJvbSAnLi4vdW5hcnlvcF9wYWNrZWRfZ3B1JztcblxuY29uc3QgQUJTID0gYHJldHVybiBhYnMoeCk7YDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFicyhhcmdzOiB7aW5wdXRzOiBBYnNJbnB1dHMsIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0x9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZH0gPSBhcmdzO1xuICBjb25zdCB7eH0gPSBpbnB1dHM7XG5cbiAgLy8gVE9ETzogaGFuZGxlIGNhc2VzIHdoZW4geCBpcyBjb21wbGV4LiBPbmNlIHRoZSBjcHUgaW1wbGVtZW50YXRpb25cbiAgLy8gY2FuIGhhbmRsZSBjb21wbGV4IHZhbHVlcywgcmVmYWN0b3IgdG8gdXNlIHVuYXJ5S2VybmVsRnVuYy5cbiAgaWYgKGJhY2tlbmQuc2hvdWxkRXhlY3V0ZU9uQ1BVKFt4XSkgJiYgeC5kdHlwZSAhPT0gJ2NvbXBsZXg2NCcpIHtcbiAgICBjb25zdCB4RGF0YSA9IGJhY2tlbmQudGV4RGF0YS5nZXQoeC5kYXRhSWQpO1xuICAgIGNvbnN0IG91dFZhbHVlcyA9IHNpbXBsZUFic0ltcGxDUFUoeERhdGEudmFsdWVzIGFzIFR5cGVkQXJyYXkpO1xuICAgIHJldHVybiBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKHguc2hhcGUsIHguZHR5cGUsIG91dFZhbHVlcyk7XG4gIH1cblxuICBsZXQgcHJvZ3JhbTogVW5hcnlPcFByb2dyYW18VW5hcnlPcFBhY2tlZFByb2dyYW07XG4gIGlmIChlbnYoKS5nZXRCb29sKCdXRUJHTF9QQUNLX1VOQVJZX09QRVJBVElPTlMnKSkge1xuICAgIHByb2dyYW0gPSBuZXcgVW5hcnlPcFBhY2tlZFByb2dyYW0oeC5zaGFwZSwgQUJTKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9ncmFtID0gbmV3IFVuYXJ5T3BQcm9ncmFtKHguc2hhcGUsIEFCUyk7XG4gIH1cbiAgcmV0dXJuIGJhY2tlbmQucnVuV2ViR0xQcm9ncmFtKHByb2dyYW0sIFt4XSwgeC5kdHlwZSk7XG59XG5cbmV4cG9ydCBjb25zdCBhYnNDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogQWJzLFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogYWJzIGFzIHt9IGFzIEtlcm5lbEZ1bmNcbn07XG4iXX0=