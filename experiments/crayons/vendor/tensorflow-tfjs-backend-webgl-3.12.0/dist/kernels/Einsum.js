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
import { backend_util, Einsum, util } from '@tensorflow/tfjs-core';
import { multiply } from './Multiply';
import { reshape } from './Reshape';
import { sum } from './Sum';
import { transpose } from './Transpose';
export function einsum(args) {
    const { inputs, backend, attrs } = args;
    const { equation } = attrs;
    const tensors = inputs;
    const { allDims, summedDims, idDims } = backend_util.decodeEinsumEquation(equation, tensors.length);
    backend_util.checkEinsumDimSizes(allDims.length, idDims, tensors);
    const { path, steps } = backend_util.getEinsumComputePath(summedDims, idDims);
    const nSteps = steps.length;
    let out = null;
    let numDimsRemaining = allDims.length;
    const tensorsToDispose = [];
    for (let i = 0; i < nSteps; ++i) {
        for (const idTerm of steps[i]) {
            const { permutationIndices: perm, expandDims: dimsToExpand } = backend_util.getEinsumPermutation(numDimsRemaining, idDims[idTerm]);
            let x;
            if (backend_util.isIdentityPermutation(perm)) {
                x = tensors[idTerm];
            }
            else {
                x = transpose({ inputs: { x: tensors[idTerm] }, backend, attrs: { perm } });
                tensorsToDispose.push(x);
            }
            const targetShape = x.shape.slice();
            for (let k = 0; k < dimsToExpand.length; ++k) {
                targetShape.splice(dimsToExpand[k], 0, 1);
            }
            if (!util.arraysEqual(x.shape, targetShape)) {
                x = reshape({ inputs: { x }, backend, attrs: { shape: targetShape } });
                tensorsToDispose.push(x);
            }
            if (out === null) {
                out = x;
            }
            else {
                // tslint:disable-next-line: no-unnecessary-type-assertion
                out = multiply({ inputs: { a: x, b: out }, backend });
                tensorsToDispose.push(out);
            }
        }
        if (i < nSteps - 1) {
            if (path[i] >= 0) {
                out = sum({
                    inputs: { x: out },
                    backend,
                    attrs: {
                        axis: path[i] - (allDims.length - numDimsRemaining),
                        keepDims: false
                    }
                });
                tensorsToDispose.push(out);
            }
            numDimsRemaining--;
        }
    }
    // Clean up intermediate tensors.
    for (const tensorInfo of tensorsToDispose) {
        if (tensorInfo === out) {
            continue;
        }
        backend.disposeIntermediateTensorInfo(tensorInfo);
    }
    return out;
}
export const einsumConfig = {
    kernelName: Einsum,
    backendName: 'webgl',
    kernelFunc: einsum
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWluc3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL0VpbnN1bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBMkUsSUFBSSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFJMUksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFVBQVUsTUFBTSxDQUNsQixJQUN5RTtJQUUzRSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDdEMsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLEtBQUssQ0FBQztJQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFrQixDQUFDO0lBRW5DLE1BQU0sRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxHQUMvQixZQUFZLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEUsTUFBTSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBRyxZQUFZLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTVFLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUIsSUFBSSxHQUFHLEdBQW9CLElBQUks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QVUsS0FBSyxHQUFHLEVBQUU7WUFDdEIsU0FBUztTQUNWO1FBQ0QsT0FBTyxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxVQUFVLEVBQUUsTUFBTTtJQUNsQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsTUFBMEI7Q0FDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtiYWNrZW5kX3V0aWwsIEVpbnN1bSwgRWluc3VtQXR0cnMsIEVpbnN1bUlucHV0cywgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3IsIFRlbnNvckluZm8sIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRXZWJHTH0gZnJvbSAnLi4vYmFja2VuZF93ZWJnbCc7XG5cbmltcG9ydCB7bXVsdGlwbHl9IGZyb20gJy4vTXVsdGlwbHknO1xuaW1wb3J0IHtyZXNoYXBlfSBmcm9tICcuL1Jlc2hhcGUnO1xuaW1wb3J0IHtzdW19IGZyb20gJy4vU3VtJztcbmltcG9ydCB7dHJhbnNwb3NlfSBmcm9tICcuL1RyYW5zcG9zZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBlaW5zdW0oXG4gICAgYXJnczpcbiAgICAgICAge2lucHV0czogRWluc3VtSW5wdXRzLCBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMLCBhdHRyczogRWluc3VtQXR0cnN9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge2VxdWF0aW9ufSA9IGF0dHJzO1xuICBjb25zdCB0ZW5zb3JzID0gaW5wdXRzIGFzIFRlbnNvcltdO1xuXG4gIGNvbnN0IHthbGxEaW1zLCBzdW1tZWREaW1zLCBpZERpbXN9ID1cbiAgICAgIGJhY2tlbmRfdXRpbC5kZWNvZGVFaW5zdW1FcXVhdGlvbihlcXVhdGlvbiwgdGVuc29ycy5sZW5ndGgpO1xuICBiYWNrZW5kX3V0aWwuY2hlY2tFaW5zdW1EaW1TaXplcyhhbGxEaW1zLmxlbmd0aCwgaWREaW1zLCB0ZW5zb3JzKTtcbiAgY29uc3Qge3BhdGgsIHN0ZXBzfSA9IGJhY2tlbmRfdXRpbC5nZXRFaW5zdW1Db21wdXRlUGF0aChzdW1tZWREaW1zLCBpZERpbXMpO1xuXG4gIGNvbnN0IG5TdGVwcyA9IHN0ZXBzLmxlbmd0aDtcbiAgbGV0IG91dDogVGVuc29ySW5mb3xudWxsID0gbnVsbDtcbiAgbGV0IG51bURpbXNSZW1haW5pbmcgPSBhbGxEaW1zLmxlbmd0aDtcbiAgY29uc3QgdGVuc29yc1RvRGlzcG9zZTogVGVuc29ySW5mb1tdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgblN0ZXBzOyArK2kpIHtcbiAgICBmb3IgKGNvbnN0IGlkVGVybSBvZiBzdGVwc1tpXSkge1xuICAgICAgY29uc3Qge3Blcm11dGF0aW9uSW5kaWNlczogcGVybSwgZXhwYW5kRGltczogZGltc1RvRXhwYW5kfSA9XG4gICAgICAgICAgYmFja2VuZF91dGlsLmdldEVpbnN1bVBlcm11dGF0aW9uKG51bURpbXNSZW1haW5pbmcsIGlkRGltc1tpZFRlcm1dKTtcbiAgICAgIGxldCB4OiBUZW5zb3JJbmZvO1xuICAgICAgaWYgKGJhY2tlbmRfdXRpbC5pc0lkZW50aXR5UGVybXV0YXRpb24ocGVybSkpIHtcbiAgICAgICAgeCA9IHRlbnNvcnNbaWRUZXJtXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSB0cmFuc3Bvc2Uoe2lucHV0czoge3g6IHRlbnNvcnNbaWRUZXJtXX0sIGJhY2tlbmQsIGF0dHJzOiB7cGVybX19KTtcbiAgICAgICAgdGVuc29yc1RvRGlzcG9zZS5wdXNoKHgpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFyZ2V0U2hhcGU6IG51bWJlcltdID0geC5zaGFwZS5zbGljZSgpO1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBkaW1zVG9FeHBhbmQubGVuZ3RoOyArK2spIHtcbiAgICAgICAgdGFyZ2V0U2hhcGUuc3BsaWNlKGRpbXNUb0V4cGFuZFtrXSwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbC5hcnJheXNFcXVhbCh4LnNoYXBlLCB0YXJnZXRTaGFwZSkpIHtcbiAgICAgICAgeCA9IHJlc2hhcGUoe2lucHV0czoge3h9LCBiYWNrZW5kLCBhdHRyczoge3NoYXBlOiB0YXJnZXRTaGFwZX19KTtcbiAgICAgICAgdGVuc29yc1RvRGlzcG9zZS5wdXNoKHgpO1xuICAgICAgfVxuICAgICAgaWYgKG91dCA9PT0gbnVsbCkge1xuICAgICAgICBvdXQgPSB4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICBvdXQgPSBtdWx0aXBseSh7aW5wdXRzOiB7YTogeCwgYjogb3V0fSwgYmFja2VuZH0pIGFzIFRlbnNvckluZm87XG4gICAgICAgIHRlbnNvcnNUb0Rpc3Bvc2UucHVzaChvdXQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaSA8IG5TdGVwcyAtIDEpIHtcbiAgICAgIGlmIChwYXRoW2ldID49IDApIHtcbiAgICAgICAgb3V0ID0gc3VtKHtcbiAgICAgICAgICBpbnB1dHM6IHt4OiBvdXR9LFxuICAgICAgICAgIGJhY2tlbmQsXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIGF4aXM6IHBhdGhbaV0gLSAoYWxsRGltcy5sZW5ndGggLSBudW1EaW1zUmVtYWluaW5nKSxcbiAgICAgICAgICAgIGtlZXBEaW1zOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRlbnNvcnNUb0Rpc3Bvc2UucHVzaChvdXQpO1xuICAgICAgfVxuICAgICAgbnVtRGltc1JlbWFpbmluZy0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIENsZWFuIHVwIGludGVybWVkaWF0ZSB0ZW5zb3JzLlxuICBmb3IgKGNvbnN0IHRlbnNvckluZm8gb2YgdGVuc29yc1RvRGlzcG9zZSkge1xuICAgIGlmICh0ZW5zb3JJbmZvID09PSBvdXQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBiYWNrZW5kLmRpc3Bvc2VJbnRlcm1lZGlhdGVUZW5zb3JJbmZvKHRlbnNvckluZm8pO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGNvbnN0IGVpbnN1bUNvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBFaW5zdW0sXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBlaW5zdW0gYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==