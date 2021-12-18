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
import { MaxPoolWithArgmax } from '@tensorflow/tfjs-core';
import { backend_util, util } from '@tensorflow/tfjs-core';
import { maxPoolWithArgmaxImpl } from './MaxPoolWithArgmax_impl';
export const maxPoolWithArgmaxConfig = {
    kernelName: MaxPoolWithArgmax,
    backendName: 'webgl',
    kernelFunc: ({ inputs, attrs, backend }) => {
        const { x } = inputs;
        const { filterSize, strides, pad, includeBatchInIndex } = attrs;
        const webglBackend = backend;
        util.assert(x.shape.length === 4, () => `Error in maxPool: input must be rank 4 but got rank ${x.shape.length}.`);
        const dilations = [1, 1];
        util.assert(backend_util.eitherStridesOrDilationsAreOne(strides, dilations), () => 'Error in maxPool: Either strides or dilations must be 1. ' +
            `Got strides ${strides} and dilations '${dilations}'`);
        const convInfo = backend_util.computePool2DInfo(x.shape, filterSize, strides, dilations, pad);
        const [result, indexes] = maxPoolWithArgmaxImpl(x, includeBatchInIndex, convInfo, webglBackend);
        return [result, indexes];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF4UG9vbFdpdGhBcmdtYXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL2tlcm5lbHMvTWF4UG9vbFdpdGhBcmdtYXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFrRCxNQUFNLHVCQUF1QixDQUFDO0FBQ3pHLE9BQU8sRUFBQyxZQUFZLEVBQWdCLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSXZFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRS9ELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFpQjtJQUNuRCxVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sRUFBQyxDQUFDLEVBQUMsR0FBRyxNQUFpQyxDQUFDO1FBQzlDLE1BQU0sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBQyxHQUNqRCxLQUFxQyxDQUFDO1FBQzFDLE1BQU0sWUFBWSxHQUFHLE9BQTJCLENBQUM7UUFFakQsSUFBSSxDQUFDLE1BQU0sQ0FDUCxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ3BCLEdBQUcsRUFBRSxDQUFDLHVEQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQixNQUFNLFNBQVMsR0FBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FDUCxZQUFZLENBQUMsOEJBQThCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUMvRCxHQUFHLEVBQUUsQ0FBQywyREFBMkQ7WUFDN0QsZUFBZSxPQUFPLG1CQUFtQixTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FDM0MsQ0FBQyxDQUFDLEtBQXlDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFDaEUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQ25CLHFCQUFxQixDQUFDLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtNYXhQb29sV2l0aEFyZ21heCwgTWF4UG9vbFdpdGhBcmdtYXhBdHRycywgTWF4UG9vbFdpdGhBcmdtYXhJbnB1dHN9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5pbXBvcnQge2JhY2tlbmRfdXRpbCwgS2VybmVsQ29uZmlnLCB1dGlsfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuXG5pbXBvcnQge21heFBvb2xXaXRoQXJnbWF4SW1wbH0gZnJvbSAnLi9NYXhQb29sV2l0aEFyZ21heF9pbXBsJztcblxuZXhwb3J0IGNvbnN0IG1heFBvb2xXaXRoQXJnbWF4Q29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IE1heFBvb2xXaXRoQXJnbWF4LFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogKHtpbnB1dHMsIGF0dHJzLCBiYWNrZW5kfSkgPT4ge1xuICAgIGNvbnN0IHt4fSA9IGlucHV0cyBhcyBNYXhQb29sV2l0aEFyZ21heElucHV0cztcbiAgICBjb25zdCB7ZmlsdGVyU2l6ZSwgc3RyaWRlcywgcGFkLCBpbmNsdWRlQmF0Y2hJbkluZGV4fSA9XG4gICAgICAgIGF0dHJzIGFzIHt9IGFzIE1heFBvb2xXaXRoQXJnbWF4QXR0cnM7XG4gICAgY29uc3Qgd2ViZ2xCYWNrZW5kID0gYmFja2VuZCBhcyBNYXRoQmFja2VuZFdlYkdMO1xuXG4gICAgdXRpbC5hc3NlcnQoXG4gICAgICAgIHguc2hhcGUubGVuZ3RoID09PSA0LFxuICAgICAgICAoKSA9PiBgRXJyb3IgaW4gbWF4UG9vbDogaW5wdXQgbXVzdCBiZSByYW5rIDQgYnV0IGdvdCByYW5rICR7XG4gICAgICAgICAgICB4LnNoYXBlLmxlbmd0aH0uYCk7XG4gICAgY29uc3QgZGlsYXRpb25zOiBbbnVtYmVyLCBudW1iZXJdID0gWzEsIDFdO1xuICAgIHV0aWwuYXNzZXJ0KFxuICAgICAgICBiYWNrZW5kX3V0aWwuZWl0aGVyU3RyaWRlc09yRGlsYXRpb25zQXJlT25lKHN0cmlkZXMsIGRpbGF0aW9ucyksXG4gICAgICAgICgpID0+ICdFcnJvciBpbiBtYXhQb29sOiBFaXRoZXIgc3RyaWRlcyBvciBkaWxhdGlvbnMgbXVzdCBiZSAxLiAnICtcbiAgICAgICAgICAgIGBHb3Qgc3RyaWRlcyAke3N0cmlkZXN9IGFuZCBkaWxhdGlvbnMgJyR7ZGlsYXRpb25zfSdgKTtcblxuICAgIGNvbnN0IGNvbnZJbmZvID0gYmFja2VuZF91dGlsLmNvbXB1dGVQb29sMkRJbmZvKFxuICAgICAgICB4LnNoYXBlIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLCBmaWx0ZXJTaXplLCBzdHJpZGVzLFxuICAgICAgICBkaWxhdGlvbnMsIHBhZCk7XG5cbiAgICBjb25zdCBbcmVzdWx0LCBpbmRleGVzXSA9XG4gICAgICAgIG1heFBvb2xXaXRoQXJnbWF4SW1wbCh4LCBpbmNsdWRlQmF0Y2hJbkluZGV4LCBjb252SW5mbywgd2ViZ2xCYWNrZW5kKTtcbiAgICByZXR1cm4gW3Jlc3VsdCwgaW5kZXhlc107XG4gIH1cbn07XG4iXX0=