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
import './abs';
import './acos';
import './acosh';
import './add';
import './all';
import './any';
import './arg_max';
import './arg_min';
import './as_scalar';
import './as_type';
import './as1d';
import './as2d';
import './as3d';
import './as4d';
import './as5d';
import './asin';
import './asinh';
import './atan';
import './atan2';
import './atanh';
import './avg_pool';
import './batch_to_space_nd';
import './batchnorm';
import './broadcast_to';
import './cast';
import './ceil';
import './clip_by_value';
import './concat';
import './conv1d';
import './conv2d_transpose';
import './conv2d';
import './cos';
import './cosh';
import './cumsum';
import './depth_to_space';
import './depthwise_conv2d';
import './dilation2d';
import './div_no_nan';
import './div';
import './dot';
import './elu';
import './equal';
import './erf';
import './exp';
import './expand_dims';
import './expm1';
import './fft';
import './flatten';
import './floor';
import './floorDiv';
import './gather';
import './greater_equal';
import './greater';
import './ifft';
import './irfft';
import './is_finite';
import './is_inf';
import './is_nan';
import './leaky_relu';
import './less_equal';
import './less';
import './local_response_normalization';
import './log_sigmoid';
import './log_softmax';
import './log_sum_exp';
import './log';
import './log1p';
import './logical_and';
import './logical_not';
import './logical_or';
import './logical_xor';
import './mat_mul';
import './max_pool';
import './max';
import './maximum';
import './mean';
import './min';
import './minimum';
import './mirror_pad';
import './mod';
import './mul';
import './neg';
import './norm';
import './not_equal';
import './one_hot';
import './ones_like';
import './pad';
import './pool';
import './pow';
import './prelu';
import './prod';
import './reciprocal';
import './relu';
import './relu6';
import './reshape_as';
import './reshape';
import './resize_bilinear';
import './resize_nearest_neighbor';
import './reverse';
import './rfft';
import './round';
import './rsqrt';
import './selu';
import './separable_conv2d';
import './sigmoid';
import './sign';
import './sin';
import './sinh';
import './slice';
import './softmax';
import './softplus';
import './space_to_batch_nd';
import './split';
import './sqrt';
import './square';
import './squared_difference';
import './squeeze';
import './stack';
import './step';
import './strided_slice';
import './sub';
import './sum';
import './tan';
import './tanh';
import './tile';
import './to_bool';
import './to_float';
import './to_int';
import './topk';
import './transpose';
import './unique';
import './unsorted_segment_sum';
import './unstack';
import './where';
import './zeros_like';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfYWxsX2NoYWluZWRfb3BzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1jb3JlL3NyYy9wdWJsaWMvY2hhaW5lZF9vcHMvcmVnaXN0ZXJfYWxsX2NoYWluZWRfb3BzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2YsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxTQUFTLENBQUM7QUFDakIsT0FBTyxPQUFPLENBQUM7QUFDZixPQUFPLE9BQU8sQ0FBQztBQUNmLE9BQU8sT0FBTyxDQUFDO0FBQ2YsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxhQUFhLENBQUM7QUFDckIsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxTQUFTLENBQUM7QUFDakIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxTQUFTLENBQUM7QUFDakIsT0FBTyxTQUFTLENBQUM7QUFDakIsT0FBTyxZQUFZLENBQUM7QUFDcEIsT0FBTyxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGFBQWEsQ0FBQztBQUNyQixPQUFPLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sUUFBUSxDQUFDO0FBQ2hCLE9BQU8saUJBQWlCLENBQUM7QUFDekIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLFVBQVUsQ0FBQztBQUNsQixPQUFPLE9BQU8sQ0FBQztBQUNmLE9BQU8sUUFBUSxD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QU8sUUFBUSxDQUFDO0FBQ2hCLE9BQU8saUJBQWlCLENBQUM7QUFDekIsT0FBTyxPQUFPLENBQUM7QUFDZixPQUFPLE9BQU8sQ0FBQztBQUNmLE9BQU8sT0FBTyxDQUFDO0FBQ2YsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxZQUFZLENBQUM7QUFDcEIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxhQUFhLENBQUM7QUFDckIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLFdBQVcsQ0FBQztBQUNuQixPQUFPLFNBQVMsQ0FBQztBQUNqQixPQUFPLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0ICcuL2Ficyc7XG5pbXBvcnQgJy4vYWNvcyc7XG5pbXBvcnQgJy4vYWNvc2gnO1xuaW1wb3J0ICcuL2FkZCc7XG5pbXBvcnQgJy4vYWxsJztcbmltcG9ydCAnLi9hbnknO1xuaW1wb3J0ICcuL2FyZ19tYXgnO1xuaW1wb3J0ICcuL2FyZ19taW4nO1xuaW1wb3J0ICcuL2FzX3NjYWxhcic7XG5pbXBvcnQgJy4vYXNfdHlwZSc7XG5pbXBvcnQgJy4vYXMxZCc7XG5pbXBvcnQgJy4vYXMyZCc7XG5pbXBvcnQgJy4vYXMzZCc7XG5pbXBvcnQgJy4vYXM0ZCc7XG5pbXBvcnQgJy4vYXM1ZCc7XG5pbXBvcnQgJy4vYXNpbic7XG5pbXBvcnQgJy4vYXNpbmgnO1xuaW1wb3J0ICcuL2F0YW4nO1xuaW1wb3J0ICcuL2F0YW4yJztcbmltcG9ydCAnLi9hdGFuaCc7XG5pbXBvcnQgJy4vYXZnX3Bvb2wnO1xuaW1wb3J0ICcuL2JhdGNoX3RvX3NwYWNlX25kJztcbmltcG9ydCAnLi9iYXRjaG5vcm0nO1xuaW1wb3J0ICcuL2Jyb2FkY2FzdF90byc7XG5pbXBvcnQgJy4vY2FzdCc7XG5pbXBvcnQgJy4vY2VpbCc7XG5pbXBvcnQgJy4vY2xpcF9ieV92YWx1ZSc7XG5pbXBvcnQgJy4vY29uY2F0JztcbmltcG9ydCAnLi9jb252MWQnO1xuaW1wb3J0ICcuL2NvbnYyZF90cmFuc3Bvc2UnO1xuaW1wb3J0ICcuL2NvbnYyZCc7XG5pbXBvcnQgJy4vY29zJztcbmltcG9ydCAnLi9jb3NoJztcbmltcG9ydCAnLi9jdW1zdW0nO1xuaW1wb3J0ICcuL2RlcHRoX3RvX3NwYWNlJztcbmltcG9ydCAnLi9kZXB0aHdpc2VfY29udjJkJztcbmltcG9ydCAnLi9kaWxhdGlvbjJkJztcbmltcG9ydCAnLi9kaXZfbm9fbmFuJztcbmltcG9ydCAnLi9kaXYnO1xuaW1wb3J0ICcuL2RvdCc7XG5pbXBvcnQgJy4vZWx1JztcbmltcG9ydCAnLi9lcXVhbCc7XG5pbXBvcnQgJy4vZXJmJztcbmltcG9ydCAnLi9leHAnO1xuaW1wb3J0ICcuL2V4cGFuZF9kaW1zJztcbmltcG9ydCAnLi9leHBtMSc7XG5pbXBvcnQgJy4vZmZ0JztcbmltcG9ydCAnLi9mbGF0dGVuJztcbmltcG9ydCAnLi9mbG9vcic7XG5pbXBvcnQgJy4vZmxvb3JEaXYnO1xuaW1wb3J0ICcuL2dhdGhlcic7XG5pbXBvcnQgJy4vZ3JlYXRlcl9lcXVhbCc7XG5pbXBvcnQgJy4vZ3JlYXRlcic7XG5pbXBvcnQgJy4vaWZmdCc7XG5pbXBvcnQgJy4vaXJmZnQnO1xuaW1wb3J0ICcuL2lzX2Zpbml0ZSc7XG5pbXBvcnQgJy4vaXNfaW5mJztcbmltcG9ydCAnLi9pc19uYW4nO1xuaW1wb3J0ICcuL2xlYWt5X3JlbHUnO1xuaW1wb3J0ICcuL2xlc3NfZXF1YWwnO1xuaW1wb3J0ICcuL2xlc3MnO1xuaW1wb3J0ICcuL2xvY2FsX3Jlc3BvbnNlX25vcm1hbGl6YXRpb24nO1xuaW1wb3J0ICcuL2xvZ19zaWdtb2lkJztcbmltcG9ydCAnLi9sb2dfc29mdG1heCc7XG5pbXBvcnQgJy4vbG9nX3N1bV9leHAnO1xuaW1wb3J0ICcuL2xvZyc7XG5pbXBvcnQgJy4vbG9nMXAnO1xuaW1wb3J0ICcuL2xvZ2ljYWxfYW5kJztcbmltcG9ydCAnLi9sb2dpY2FsX25vdCc7XG5pbXBvcnQgJy4vbG9naWNhbF9vcic7XG5pbXBvcnQgJy4vbG9naWNhbF94b3InO1xuaW1wb3J0ICcuL21hdF9tdWwnO1xuaW1wb3J0ICcuL21heF9wb29sJztcbmltcG9ydCAnLi9tYXgnO1xuaW1wb3J0ICcuL21heGltdW0nO1xuaW1wb3J0ICcuL21lYW4nO1xuaW1wb3J0ICcuL21pbic7XG5pbXBvcnQgJy4vbWluaW11bSc7XG5pbXBvcnQgJy4vbWlycm9yX3BhZCc7XG5pbXBvcnQgJy4vbW9kJztcbmltcG9ydCAnLi9tdWwnO1xuaW1wb3J0ICcuL25lZyc7XG5pbXBvcnQgJy4vbm9ybSc7XG5pbXBvcnQgJy4vbm90X2VxdWFsJztcbmltcG9ydCAnLi9vbmVfaG90JztcbmltcG9ydCAnLi9vbmVzX2xpa2UnO1xuaW1wb3J0ICcuL3BhZCc7XG5pbXBvcnQgJy4vcG9vbCc7XG5pbXBvcnQgJy4vcG93JztcbmltcG9ydCAnLi9wcmVsdSc7XG5pbXBvcnQgJy4vcHJvZCc7XG5pbXBvcnQgJy4vcmVjaXByb2NhbCc7XG5pbXBvcnQgJy4vcmVsdSc7XG5pbXBvcnQgJy4vcmVsdTYnO1xuaW1wb3J0ICcuL3Jlc2hhcGVfYXMnO1xuaW1wb3J0ICcuL3Jlc2hhcGUnO1xuaW1wb3J0ICcuL3Jlc2l6ZV9iaWxpbmVhcic7XG5pbXBvcnQgJy4vcmVzaXplX25lYXJlc3RfbmVpZ2hib3InO1xuaW1wb3J0ICcuL3JldmVyc2UnO1xuaW1wb3J0ICcuL3JmZnQnO1xuaW1wb3J0ICcuL3JvdW5kJztcbmltcG9ydCAnLi9yc3FydCc7XG5pbXBvcnQgJy4vc2VsdSc7XG5pbXBvcnQgJy4vc2VwYXJhYmxlX2NvbnYyZCc7XG5pbXBvcnQgJy4vc2lnbW9pZCc7XG5pbXBvcnQgJy4vc2lnbic7XG5pbXBvcnQgJy4vc2luJztcbmltcG9ydCAnLi9zaW5oJztcbmltcG9ydCAnLi9zbGljZSc7XG5pbXBvcnQgJy4vc29mdG1heCc7XG5pbXBvcnQgJy4vc29mdHBsdXMnO1xuaW1wb3J0ICcuL3NwYWNlX3RvX2JhdGNoX25kJztcbmltcG9ydCAnLi9zcGxpdCc7XG5pbXBvcnQgJy4vc3FydCc7XG5pbXBvcnQgJy4vc3F1YXJlJztcbmltcG9ydCAnLi9zcXVhcmVkX2RpZmZlcmVuY2UnO1xuaW1wb3J0ICcuL3NxdWVlemUnO1xuaW1wb3J0ICcuL3N0YWNrJztcbmltcG9ydCAnLi9zdGVwJztcbmltcG9ydCAnLi9zdHJpZGVkX3NsaWNlJztcbmltcG9ydCAnLi9zdWInO1xuaW1wb3J0ICcuL3N1bSc7XG5pbXBvcnQgJy4vdGFuJztcbmltcG9ydCAnLi90YW5oJztcbmltcG9ydCAnLi90aWxlJztcbmltcG9ydCAnLi90b19ib29sJztcbmltcG9ydCAnLi90b19mbG9hdCc7XG5pbXBvcnQgJy4vdG9faW50JztcbmltcG9ydCAnLi90b3BrJztcbmltcG9ydCAnLi90cmFuc3Bvc2UnO1xuaW1wb3J0ICcuL3VuaXF1ZSc7XG5pbXBvcnQgJy4vdW5zb3J0ZWRfc2VnbWVudF9zdW0nO1xuaW1wb3J0ICcuL3Vuc3RhY2snO1xuaW1wb3J0ICcuL3doZXJlJztcbmltcG9ydCAnLi96ZXJvc19saWtlJztcbiJdfQ==