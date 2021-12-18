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
import { ArgMax, backend_util, util } from '@tensorflow/tfjs-core';
import { argMinMaxReduce } from '../kernel_utils/arg_min_max';
import { transpose } from './Transpose';
export function argMax(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { axis } = attrs;
    let axes = util.parseAxisParam(axis, x.shape);
    const permutedAxes = backend_util.getAxesPermutation(axes, x.shape.length);
    let $x = x;
    const intermediateTensorInfos = [];
    if (permutedAxes != null) {
        $x = transpose({ inputs: { x }, backend, attrs: { perm: permutedAxes } });
        intermediateTensorInfos.push($x);
        axes = backend_util.getInnerMostAxes(axes.length, $x.shape.length);
    }
    backend_util.assertAxesAreInnerMostDims('argMax', [axes[0]], $x.shape.length);
    const out = argMinMaxReduce(backend, $x, axes[0], 'max');
    intermediateTensorInfos.forEach(t => backend.disposeIntermediateTensorInfo(t));
    return out;
}
export const argMaxConfig = {
    kernelName: ArgMax,
    backendName: 'webgl',
    kernelFunc: argMax
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJnTWF4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL0FyZ01heC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUE2QixZQUFZLEVBQXdDLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR2xJLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE1BQU0sVUFBVSxNQUFNLENBQ2xCLElBQ3lFO0lBRTNFLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ25CLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFFckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWCxNQUFNLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztJQUNuQyxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7UUFDeEIsRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3BFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwRTtJQUVELFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV6RCx1QkFBdUIsQ0FBQyxPQUFPLENBQzNCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxVQUFVLEVBQUUsTUFBTTtJQUNsQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsTUFBMEI7Q0FDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtBcmdNYXgsIEFyZ01heEF0dHJzLCBBcmdNYXhJbnB1dHMsIGJhY2tlbmRfdXRpbCwgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JJbmZvLCB1dGlsfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHthcmdNaW5NYXhSZWR1Y2V9IGZyb20gJy4uL2tlcm5lbF91dGlscy9hcmdfbWluX21heCc7XG5cbmltcG9ydCB7dHJhbnNwb3NlfSBmcm9tICcuL1RyYW5zcG9zZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmdNYXgoXG4gICAgYXJnczpcbiAgICAgICAge2lucHV0czogQXJnTWF4SW5wdXRzLCBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMLCBhdHRyczogQXJnTWF4QXR0cnN9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge3h9ID0gaW5wdXRzO1xuICBjb25zdCB7YXhpc30gPSBhdHRycztcblxuICBsZXQgYXhlcyA9IHV0aWwucGFyc2VBeGlzUGFyYW0oYXhpcywgeC5zaGFwZSk7XG4gIGNvbnN0IHBlcm11dGVkQXhlcyA9IGJhY2tlbmRfdXRpbC5nZXRBeGVzUGVybXV0YXRpb24oYXhlcywgeC5zaGFwZS5sZW5ndGgpO1xuICBsZXQgJHggPSB4O1xuICBjb25zdCBpbnRlcm1lZGlhdGVUZW5zb3JJbmZvcyA9IFtdO1xuICBpZiAocGVybXV0ZWRBeGVzICE9IG51bGwpIHtcbiAgICAkeCA9IHRyYW5zcG9zZSh7aW5wdXRzOiB7eH0sIGJhY2tlbmQsIGF0dHJzOiB7cGVybTogcGVybXV0ZWRBeGVzfX0pO1xuICAgIGludGVybWVkaWF0ZVRlbnNvckluZm9zLnB1c2goJHgpO1xuICAgIGF4ZXMgPSBiYWNrZW5kX3V0aWwuZ2V0SW5uZXJNb3N0QXhlcyhheGVzLmxlbmd0aCwgJHguc2hhcGUubGVuZ3RoKTtcbiAgfVxuXG4gIGJhY2tlbmRfdXRpbC5hc3NlcnRBeGVzQXJlSW5uZXJNb3N0RGltcygnYXJnTWF4JywgW2F4ZXNbMF1dLCAkeC5zaGFwZS5sZW5ndGgpO1xuICBjb25zdCBvdXQgPSBhcmdNaW5NYXhSZWR1Y2UoYmFja2VuZCwgJHgsIGF4ZXNbMF0sICdtYXgnKTtcblxuICBpbnRlcm1lZGlhdGVUZW5zb3JJbmZvcy5mb3JFYWNoKFxuICAgICAgdCA9PiBiYWNrZW5kLmRpc3Bvc2VJbnRlcm1lZGlhdGVUZW5zb3JJbmZvKHQpKTtcbiAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGNvbnN0IGFyZ01heENvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBBcmdNYXgsXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBhcmdNYXggYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==