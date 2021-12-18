/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
import * as tf from '../index';
import { ALL_ENVS, describeWithFlags } from '../jasmine_util';
import { expectArraysClose } from '../test_util';
let defaultValue;
describeWithFlags('sparseToDense', ALL_ENVS, () => {
    beforeEach(() => defaultValue = tf.scalar(0, 'int32'));
    it('should work for scalar indices', async () => {
        const indices = tf.scalar(2, 'int32');
        const values = tf.scalar(100, 'int32');
        const shape = [6];
        const result = tf.sparseToDense(indices, values, shape, defaultValue);
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [0, 0, 100, 0, 0, 0]);
    });
    it('should work for vector', async () => {
        const indices = tf.tensor1d([0, 2, 4], 'int32');
        const values = tf.tensor1d([100, 101, 102], 'int32');
        const shape = [6];
        const result = tf.sparseToDense(indices, values, shape, defaultValue);
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [100, 0, 101, 0, 102, 0]);
    });
    it('should work for scalar value', async () => {
        const indices = tf.tensor1d([0, 2, 4], 'int32');
        const values = tf.scalar(10, 'int32');
        const shape = [6];
        const result = tf.sparseToDense(indices, values, shape, defaultValue);
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [10, 0, 10, 0, 10, 0]);
    });
    it('should work for matrix', async () => {
        const indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
        const values = tf.tensor1d([5, 6], 'float32');
        const shape = [2, 2];
        const result = tf.sparseToDense(indices, values, shape, defaultValue.toFloat());
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [0, 5, 0, 6]);
    });
    it('should throw exception if default value does not match dtype', () => {
        const indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
        const values = tf.tensor1d([5, 6], 'float32');
        const shape = [2, 2];
        expect(() => tf.sparseToDense(indices, values, shape, tf.scalar(1, 'int32')))
            .toThrowError();
    });
    it('should allow setting default value', async () => {
        const indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
        const values = tf.tensor1d([5, 6], 'float32');
        const shape = [2, 2];
        const result = tf.sparseToDense(indices, values, shape, tf.scalar(1));
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [1, 5, 1, 6]);
    });
    it('no default value passed', async () => {
        const indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
        const values = tf.tensor1d([5, 6], 'float32');
        const shape = [2, 2];
        const result = tf.sparseToDense(indices, values, shape);
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual(values.dtype);
        expectArraysClose(await result.data(), [0, 5, 0, 6]);
    });
    it('should support TensorLike inputs', async () => {
        const indices = [[0, 1], [1, 1]];
        const values = [5, 6];
        const shape = [2, 2];
        const result = tf.sparseToDense(indices, values, shape, defaultValue.toFloat());
        expect(result.shape).toEqual(shape);
        expect(result.dtype).toEqual('float32');
        expectArraysClose(await result.data(), [0, 5, 0, 6]);
    });
    it('should work with 0-sized tensors', async () => {
        const indices = tf.zeros([0], 'int32');
        const values = tf.zeros([0]);
        const defaultValue = tf.scalar(5);
        const result = tf.sparseToDense(indices, values, [3], defaultValue);
        expectArraysClose(await result.data(), [5, 5, 5]);
    });
    it('should throw error when indices are not int32', () => {
        const indices = tf.scalar(2, 'float32');
        const values = tf.scalar(100, 'int32');
        const shape = [6];
        expect(() => tf.sparseToDense(indices, values, shape, defaultValue))
            .toThrow();
    });
    it('should throw error when indices rank > 2', () => {
        const indices = tf.tensor3d([1], [1, 1, 1], 'int32');
        const values = tf.tensor1d([100], 'float32');
        const shape = [6];
        expect(() => tf.sparseToDense(indices, values, shape, defaultValue))
            .toThrow();
    });
    it('should throw error when values has rank > 1', () => {
        const indices = tf.tensor1d([0, 4, 2], 'int32');
        const values = tf.tensor2d([1.0, 2.0, 3.0], [3, 1], 'float32');
        const shape = [6];
        expect(() => tf.sparseToDense(indices, values, shape, defaultValue))
            .toThrow();
    });
    it('should throw error when values has wrong size', () => {
        const indices = tf.tensor1d([0, 4, 2], 'int32');
        const values = tf.tensor1d([1.0, 2.0, 3.0, 4.0], 'float32');
        const shape = [6];
        expect(() => tf.sparseToDense(indices, values, shape, defaultValue))
            .toThrow();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcnNlX3RvX2RlbnNlX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvcmUvc3JjL29wcy9zcGFyc2VfdG9fZGVuc2VfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRS9DLElBQUksWUFBdUIsQ0FBQztBQUM1QixpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUNoRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkQsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzlDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsaUJBQWlCLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxpQkFBaUIsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM1QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLGlCQUFpQixDQUFDLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sTUFBTSxHQUNSLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0s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TyxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDL0QsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0ICogYXMgdGYgZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHtBTExfRU5WUywgZGVzY3JpYmVXaXRoRmxhZ3N9IGZyb20gJy4uL2phc21pbmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdEFycmF5c0Nsb3NlfSBmcm9tICcuLi90ZXN0X3V0aWwnO1xuXG5sZXQgZGVmYXVsdFZhbHVlOiB0Zi5TY2FsYXI7XG5kZXNjcmliZVdpdGhGbGFncygnc3BhcnNlVG9EZW5zZScsIEFMTF9FTlZTLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4gZGVmYXVsdFZhbHVlID0gdGYuc2NhbGFyKDAsICdpbnQzMicpKTtcbiAgaXQoJ3Nob3VsZCB3b3JrIGZvciBzY2FsYXIgaW5kaWNlcycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBpbmRpY2VzID0gdGYuc2NhbGFyKDIsICdpbnQzMicpO1xuICAgIGNvbnN0IHZhbHVlcyA9IHRmLnNjYWxhcigxMDAsICdpbnQzMicpO1xuICAgIGNvbnN0IHNoYXBlID0gWzZdO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRmLnNwYXJzZVRvRGVuc2UoaW5kaWNlcywgdmFsdWVzLCBzaGFwZSwgZGVmYXVsdFZhbHVlKTtcbiAgICBleHBlY3QocmVzdWx0LnNoYXBlKS50b0VxdWFsKHNoYXBlKTtcbiAgICBleHBlY3QocmVzdWx0LmR0eXBlKS50b0VxdWFsKHZhbHVlcy5kdHlwZSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzdWx0LmRhdGEoKSwgWzAsIDAsIDEwMCwgMCwgMCwgMF0pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCB3b3JrIGZvciB2ZWN0b3InLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnRlbnNvcjFkKFswLCAyLCA0XSwgJ2ludDMyJyk7XG4gICAgY29uc3QgdmFsdWVzID0gdGYudGVuc29yMWQoWzEwMCwgMTAxLCAxMDJdLCAnaW50MzInKTtcbiAgICBjb25zdCBzaGFwZSA9IFs2XTtcbiAgICBjb25zdCByZXN1bHQgPSB0Zi5zcGFyc2VUb0RlbnNlKGluZGljZXMsIHZhbHVlcywgc2hhcGUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgZXhwZWN0KHJlc3VsdC5zaGFwZSkudG9FcXVhbChzaGFwZSk7XG4gICAgZXhwZWN0KHJlc3VsdC5kdHlwZSkudG9FcXVhbCh2YWx1ZXMuZHR5cGUpO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHJlc3VsdC5kYXRhKCksIFsxMDAsIDAsIDEwMSwgMCwgMTAyLCAwXSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHdvcmsgZm9yIHNjYWxhciB2YWx1ZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBpbmRpY2VzID0gdGYudGVuc29yMWQoWzAsIDIsIDRdLCAnaW50MzInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB0Zi5zY2FsYXIoMTAsICdpbnQzMicpO1xuICAgIGNvbnN0IHNoYXBlID0gWzZdO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRmLnNwYXJzZVRvRGVuc2UoaW5kaWNlcywgdmFsdWVzLCBzaGFwZSwgZGVmYXVsdFZhbHVlKTtcbiAgICBleHBlY3QocmVzdWx0LnNoYXBlKS50b0VxdWFsKHNoYXBlKTtcbiAgICBleHBlY3QocmVzdWx0LmR0eXBlKS50b0VxdWFsKHZhbHVlcy5kdHlwZSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzdWx0LmRhdGEoKSwgWzEwLCAwLCAxMCwgMCwgMTAsIDBdKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgd29yayBmb3IgbWF0cml4JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluZGljZXMgPSB0Zi50ZW5zb3IyZChbMCwgMSwgMSwgMV0sIFsyLCAyXSwgJ2ludDMyJyk7XG4gICAgY29uc3QgdmFsdWVzID0gdGYudGVuc29yMWQoWzUsIDZdLCAnZmxvYXQzMicpO1xuICAgIGNvbnN0IHNoYXBlID0gWzIsIDJdO1xuICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICAgIHRmLnNwYXJzZVRvRGVuc2UoaW5kaWNlcywgdmFsdWVzLCBzaGFwZSwgZGVmYXVsdFZhbHVlLnRvRmxvYXQoKSk7XG4gICAgZXhwZWN0KHJlc3VsdC5zaGFwZSkudG9FcXVhbChzaGFwZSk7XG4gICAgZXhwZWN0KHJlc3VsdC5kdHlwZSkudG9FcXVhbCh2YWx1ZXMuZHR5cGUpO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHJlc3VsdC5kYXRhKCksIFswLCA1LCAwLCA2XSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGlmIGRlZmF1bHQgdmFsdWUgZG9lcyBub3QgbWF0Y2ggZHR5cGUnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnRlbnNvcjJkKFswLCAxLCAxLCAxXSwgWzIsIDJdLCAnaW50MzInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB0Zi50ZW5zb3IxZChbNSwgNl0sICdmbG9hdDMyJyk7XG4gICAgY29uc3Qgc2hhcGUgPSBbMiwgMl07XG4gICAgZXhwZWN0KFxuICAgICAgICAoKSA9PiB0Zi5zcGFyc2VUb0RlbnNlKGluZGljZXMsIHZhbHVlcywgc2hhcGUsIHRmLnNjYWxhcigxLCAnaW50MzInKSkpXG4gICAgICAgIC50b1Rocm93RXJyb3IoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBhbGxvdyBzZXR0aW5nIGRlZmF1bHQgdmFsdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnRlbnNvcjJkKFswLCAxLCAxLCAxXSwgWzIsIDJdLCAnaW50MzInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB0Zi50ZW5zb3IxZChbNSwgNl0sICdmbG9hdDMyJyk7XG4gICAgY29uc3Qgc2hhcGUgPSBbMiwgMl07XG4gICAgY29uc3QgcmVzdWx0ID0gdGYuc3BhcnNlVG9EZW5zZShpbmRpY2VzLCB2YWx1ZXMsIHNoYXBlLCB0Zi5zY2FsYXIoMSkpO1xuICAgIGV4cGVjdChyZXN1bHQuc2hhcGUpLnRvRXF1YWwoc2hhcGUpO1xuICAgIGV4cGVjdChyZXN1bHQuZHR5cGUpLnRvRXF1YWwodmFsdWVzLmR0eXBlKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXN1bHQuZGF0YSgpLCBbMSwgNSwgMSwgNl0pO1xuICB9KTtcblxuICBpdCgnbm8gZGVmYXVsdCB2YWx1ZSBwYXNzZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnRlbnNvcjJkKFswLCAxLCAxLCAxXSwgWzIsIDJdLCAnaW50MzInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB0Zi50ZW5zb3IxZChbNSwgNl0sICdmbG9hdDMyJyk7XG4gICAgY29uc3Qgc2hhcGUgPSBbMiwgMl07XG4gICAgY29uc3QgcmVzdWx0ID0gdGYuc3BhcnNlVG9EZW5zZShpbmRpY2VzLCB2YWx1ZXMsIHNoYXBlKTtcbiAgICBleHBlY3QocmVzdWx0LnNoYXBlKS50b0VxdWFsKHNoYXBlKTtcbiAgICBleHBlY3QocmVzdWx0LmR0eXBlKS50b0VxdWFsKHZhbHVlcy5kdHlwZSk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzdWx0LmRhdGEoKSwgWzAsIDUsIDAsIDZdKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdXBwb3J0IFRlbnNvckxpa2UgaW5wdXRzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGluZGljZXMgPSBbWzAsIDFdLCBbMSwgMV1dO1xuICAgIGNvbnN0IHZhbHVlcyA9IFs1LCA2XTtcbiAgICBjb25zdCBzaGFwZSA9IFsyLCAyXTtcbiAgICBjb25zdCByZXN1bHQgPVxuICAgICAgICB0Zi5zcGFyc2VUb0RlbnNlKGluZGljZXMsIHZhbHVlcywgc2hhcGUsIGRlZmF1bHRWYWx1ZS50b0Zsb2F0KCkpO1xuICAgIGV4cGVjdChyZXN1bHQuc2hhcGUpLnRvRXF1YWwoc2hhcGUpO1xuICAgIGV4cGVjdChyZXN1bHQuZHR5cGUpLnRvRXF1YWwoJ2Zsb2F0MzInKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXN1bHQuZGF0YSgpLCBbMCwgNSwgMCwgNl0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHdvcmsgd2l0aCAwLXNpemVkIHRlbnNvcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnplcm9zKFswXSwgJ2ludDMyJyk7XG4gICAgY29uc3QgdmFsdWVzID0gdGYuemVyb3MoWzBdKTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0Zi5zY2FsYXIoNSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdGYuc3BhcnNlVG9EZW5zZShpbmRpY2VzLCB2YWx1ZXMsIFszXSwgZGVmYXVsdFZhbHVlKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXN1bHQuZGF0YSgpLCBbNSwgNSwgNV0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHRocm93IGVycm9yIHdoZW4gaW5kaWNlcyBhcmUgbm90IGludDMyJywgKCkgPT4ge1xuICAgIGNvbnN0IGluZGljZXMgPSB0Zi5zY2FsYXIoMiwgJ2Zsb2F0MzInKTtcbiAgICBjb25zdCB2YWx1ZXMgPSB0Zi5zY2FsYXIoMTAwLCAnaW50MzInKTtcbiAgICBjb25zdCBzaGFwZSA9IFs2XTtcbiAgICBleHBlY3QoKCkgPT4gdGYuc3BhcnNlVG9EZW5zZShpbmRpY2VzLCB2YWx1ZXMsIHNoYXBlLCBkZWZhdWx0VmFsdWUpKVxuICAgICAgICAudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHRocm93IGVycm9yIHdoZW4gaW5kaWNlcyByYW5rID4gMicsICgpID0+IHtcbiAgICBjb25zdCBpbmRpY2VzID0gdGYudGVuc29yM2QoWzFdLCBbMSwgMSwgMV0sICdpbnQzMicpO1xuICAgIGNvbnN0IHZhbHVlcyA9IHRmLnRlbnNvcjFkKFsxMDBdLCAnZmxvYXQzMicpO1xuICAgIGNvbnN0IHNoYXBlID0gWzZdO1xuICAgIGV4cGVjdCgoKSA9PiB0Zi5zcGFyc2VUb0RlbnNlKGluZGljZXMsIHZhbHVlcywgc2hhcGUsIGRlZmF1bHRWYWx1ZSkpXG4gICAgICAgIC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgZXJyb3Igd2hlbiB2YWx1ZXMgaGFzIHJhbmsgPiAxJywgKCkgPT4ge1xuICAgIGNvbnN0IGluZGljZXMgPSB0Zi50ZW5zb3IxZChbMCwgNCwgMl0sICdpbnQzMicpO1xuICAgIGNvbnN0IHZhbHVlcyA9IHRmLnRlbnNvcjJkKFsxLjAsIDIuMCwgMy4wXSwgWzMsIDFdLCAnZmxvYXQzMicpO1xuICAgIGNvbnN0IHNoYXBlID0gWzZdO1xuICAgIGV4cGVjdCgoKSA9PiB0Zi5zcGFyc2VUb0RlbnNlKGluZGljZXMsIHZhbHVlcywgc2hhcGUsIGRlZmF1bHRWYWx1ZSkpXG4gICAgICAgIC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgZXJyb3Igd2hlbiB2YWx1ZXMgaGFzIHdyb25nIHNpemUnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRmLnRlbnNvcjFkKFswLCA0LCAyXSwgJ2ludDMyJyk7XG4gICAgY29uc3QgdmFsdWVzID0gdGYudGVuc29yMWQoWzEuMCwgMi4wLCAzLjAsIDQuMF0sICdmbG9hdDMyJyk7XG4gICAgY29uc3Qgc2hhcGUgPSBbNl07XG4gICAgZXhwZWN0KCgpID0+IHRmLnNwYXJzZVRvRGVuc2UoaW5kaWNlcywgdmFsdWVzLCBzaGFwZSwgZGVmYXVsdFZhbHVlKSlcbiAgICAgICAgLnRvVGhyb3coKTtcbiAgfSk7XG59KTtcbiJdfQ==