import * as tf from '../index';
import { ALL_ENVS, describeWithFlags } from '../jasmine_util';
import { expectArraysClose } from '../test_util';
describeWithFlags('logicalOr', ALL_ENVS, () => {
    it('Tensor1D.', async () => {
        let a = tf.tensor1d([1, 0, 0], 'bool');
        let b = tf.tensor1d([0, 1, 0], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 0]);
        a = tf.tensor1d([0, 0, 0], 'bool');
        b = tf.tensor1d([0, 0, 0], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [0, 0, 0]);
        a = tf.tensor1d([1, 1], 'bool');
        b = tf.tensor1d([1, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1]);
    });
    it('mismatched Tensor1D shapes', () => {
        const a = tf.tensor1d([1, 0], 'bool');
        const b = tf.tensor1d([0, 1, 0], 'bool');
        const f = () => {
            tf.logicalOr(a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D', async () => {
        let a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
        let b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 0, 1, 0, 1, 0]);
        a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
        b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [0, 0, 0, 1, 1, 1]);
    });
    it('broadcasting Tensor2D shapes', async () => {
        const a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
        const b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 1, 0, 1, 0]);
    });
    it('Tensor3D', async () => {
        let a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
        let b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 0, 1, 1, 0, 0]);
        a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
        b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [0, 0, 0, 1, 1, 1]);
    });
    it('broadcasting Tensor3D shapes', async () => {
        const a = tf.tensor3d([[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2], 'bool');
        const b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0]);
    });
    it('Tensor4D', async () => {
        let a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
        let b = tf.tensor4d([0, 1, 0, 0], [2, 2, 1, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 1, 0]);
        a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
        b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [0, 0, 0, 0]);
        a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
        b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 1, 1]);
    });
    it('broadcasting Tensor4D shapes', async () => {
        const a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
        const b = tf.tensor4d([[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 0, 0, 1, 1, 1, 1]);
    });
    it('TensorLike', async () => {
        const a = [true, false, false];
        const b = [false, true, false];
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 0]);
    });
    it('TensorLike Chained', async () => {
        const a = tf.tensor1d([1, 0, 0], 'bool');
        const b = [false, true, false];
        expectArraysClose(await a.logicalOr(b).data(), [1, 1, 0]);
    });
    it('throws when passed a as a non-tensor', () => {
        expect(() => tf.logicalOr({}, tf.scalar(1, 'bool')))
            .toThrowError(/Argument 'a' passed to 'logicalOr' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', () => {
        expect(() => tf.logicalOr(tf.scalar(1, 'bool'), {}))
            .toThrowError(/Argument 'b' passed to 'logicalOr' must be a Tensor/);
    });
    it('accepts a tensor-like object', async () => {
        const a = [1, 0, 0, 1];
        const b = [0, 1, 0, 1];
        expectArraysClose(await tf.logicalOr(a, b).data(), [1, 1, 0, 1]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbF9vcl90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1jb3JlL3NyYy9vcHMvbG9naWNhbF9vcl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFL0MsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDNUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlELENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RCxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ2IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUQsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlELGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsVUFBVSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDL0QsTUFBTSxDQUFDLENBQUM7UUFDWixNQUFNLENBQUMsR0FDSCxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RSxpQkFBaUIsQ0FDYixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEQsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEUsaUJBQWlCLENBQ2IsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBZSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUQsWUFBWSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsc0NBQXNDLEVBQUUsR0FBRyxFQUFFO1FBQzlDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQWUsQ0FBQyxDQUFDO2FBQzVELFlBQVksQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdGYgZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHtBTExfRU5WUywgZGVzY3JpYmVXaXRoRmxhZ3N9IGZyb20gJy4uL2phc21pbmVfdXRpbCc7XG5pbXBvcnQge2V4cGVjdEFycmF5c0Nsb3NlfSBmcm9tICcuLi90ZXN0X3V0aWwnO1xuXG5kZXNjcmliZVdpdGhGbGFncygnbG9naWNhbE9yJywgQUxMX0VOVlMsICgpID0+IHtcbiAgaXQoJ1RlbnNvcjFELicsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgYSA9IHRmLnRlbnNvcjFkKFsxLCAwLCAwXSwgJ2Jvb2wnKTtcbiAgICBsZXQgYiA9IHRmLnRlbnNvcjFkKFswLCAxLCAwXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMF0pO1xuXG4gICAgYSA9IHRmLnRlbnNvcjFkKFswLCAwLCAwXSwgJ2Jvb2wnKTtcbiAgICBiID0gdGYudGVuc29yMWQoWzAsIDAsIDBdLCAnYm9vbCcpO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHRmLmxvZ2ljYWxPcihhLCBiKS5kYXRhKCksIFswLCAwLCAwXSk7XG5cbiAgICBhID0gdGYudGVuc29yMWQoWzEsIDFdLCAnYm9vbCcpO1xuICAgIGIgPSB0Zi50ZW5zb3IxZChbMSwgMV0sICdib29sJyk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgdGYubG9naWNhbE9yKGEsIGIpLmRhdGEoKSwgWzEsIDFdKTtcbiAgfSk7XG4gIGl0KCdtaXNtYXRjaGVkIFRlbnNvcjFEIHNoYXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhID0gdGYudGVuc29yMWQoWzEsIDBdLCAnYm9vbCcpO1xuICAgIGNvbnN0IGIgPSB0Zi50ZW5zb3IxZChbMCwgMSwgMF0sICdib29sJyk7XG4gICAgY29uc3QgZiA9ICgpID0+IHtcbiAgICAgIHRmLmxvZ2ljYWxPcihhLCBiKTtcbiAgICB9O1xuICAgIGV4cGVjdChmKS50b1Rocm93RXJyb3IoKTtcbiAgfSk7XG5cbiAgaXQoJ1RlbnNvcjJEJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBhID0gdGYudGVuc29yMmQoW1sxLCAwLCAxXSwgWzAsIDAsIDBdXSwgWzIsIDNdLCAnYm9vbCcpO1xuICAgIGxldCBiID0gdGYudGVuc29yMmQoW1swLCAwLCAwXSwgWzAsIDEsIDBdXSwgWzIsIDNdLCAnYm9vbCcpO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHRmLmxvZ2ljYWxPcihhLCBiKS5kYXRhKCksIFsxLCAwLCAxLCAwLCAxLCAwXSk7XG5cbiAgICBhID0gdGYudGVuc29yMmQoW1swLCAwLCAwXSwgWzEsIDEsIDFdXSwgWzIsIDNdLCAnYm9vbCcpO1xuICAgIGIgPSB0Zi50ZW5zb3IyZChbWzAsIDAsIDBdLCBbMSwgMSwgMV1dLCBbMiwgM10sICdib29sJyk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgdGYubG9naWNhbE9yKGEsIGIpLmRhdGEoKSwgWzAsIDAsIDAsIDEsIDEsIDFdKTtcbiAgfSk7XG4gIGl0KCdicm9hZGNhc3RpbmcgVGVuc29yMkQgc2hhcGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IyZChbWzFdLCBbMF1dLCBbMiwgMV0sICdib29sJyk7XG4gICAgY29uc3QgYiA9IHRmLnRlbnNvcjJkKFtbMCwgMCwgMF0sIFswLCAxLCAwXV0sIFsyLCAzXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMSwgMCwgMSwgMF0pO1xuICB9KTtcblxuICBpdCgnVGVuc29yM0QnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGEgPSB0Zi50ZW5zb3IzZChbW1sxXSwgWzBdLCBbMV1dLCBbWzBdLCBbMF0sIFswXV1dLCBbMiwgMywgMV0sICdib29sJyk7XG4gICAgbGV0IGIgPSB0Zi50ZW5zb3IzZChbW1swXSwgWzBdLCBbMV1dLCBbWzFdLCBbMF0sIFswXV1dLCBbMiwgMywgMV0sICdib29sJyk7XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgdGYubG9naWNhbE9yKGEsIGIpLmRhdGEoKSwgWzEsIDAsIDEsIDEsIDAsIDBdKTtcblxuICAgIGEgPSB0Zi50ZW5zb3IzZChbW1swXSwgWzBdLCBbMF1dLCBbWzFdLCBbMV0sIFsxXV1dLCBbMiwgMywgMV0sICdib29sJyk7XG4gICAgYiA9IHRmLnRlbnNvcjNkKFtbWzBdLCBbMF0sIFswXV0sIFtbMV0sIFsxXSwgWzFdXV0sIFsyLCAzLCAxXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMCwgMCwgMCwgMSwgMSwgMV0pO1xuICB9KTtcbiAgaXQoJ2Jyb2FkY2FzdGluZyBUZW5zb3IzRCBzaGFwZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYSA9IHRmLnRlbnNvcjNkKFxuICAgICAgICBbW1sxLCAwXSwgWzAsIDBdLCBbMSwgMV1dLCBbWzAsIDBdLCBbMCwgMV0sIFswLCAwXV1dLCBbMiwgMywgMl0sXG4gICAgICAgICdib29sJyk7XG4gICAgY29uc3QgYiA9XG4gICAgICAgIHRmLnRlbnNvcjNkKFtbWzBdLCBbMF0sIFsxXV0sIFtbMV0sIFswXSwgWzBdXV0sIFsyLCAzLCAxXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShcbiAgICAgICAgYXdhaXQgdGYubG9naWNhbE9yKGEsIGIpLmRhdGEoKSwgWzEsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDBdKTtcbiAgfSk7XG5cbiAgaXQoJ1RlbnNvcjREJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBhID0gdGYudGVuc29yNGQoWzEsIDAsIDEsIDBdLCBbMiwgMiwgMSwgMV0sICdib29sJyk7XG4gICAgbGV0IGIgPSB0Zi50ZW5zb3I0ZChbMCwgMSwgMCwgMF0sIFsyLCAyLCAxLCAxXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMSwgMF0pO1xuXG4gICAgYSA9IHRmLnRlbnNvcjRkKFswLCAwLCAwLCAwXSwgWzIsIDIsIDEsIDFdLCAnYm9vbCcpO1xuICAgIGIgPSB0Zi50ZW5zb3I0ZChbMCwgMCwgMCwgMF0sIFsyLCAyLCAxLCAxXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMCwgMCwgMCwgMF0pO1xuXG4gICAgYSA9IHRmLnRlbnNvcjRkKFsxLCAxLCAxLCAxXSwgWzIsIDIsIDEsIDFdLCAnYm9vbCcpO1xuICAgIGIgPSB0Zi50ZW5zb3I0ZChbMSwgMSwgMSwgMV0sIFsyLCAyLCAxLCAxXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMSwgMV0pO1xuICB9KTtcbiAgaXQoJ2Jyb2FkY2FzdGluZyBUZW5zb3I0RCBzaGFwZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYSA9IHRmLnRlbnNvcjRkKFsxLCAwLCAxLCAwXSwgWzIsIDIsIDEsIDFdLCAnYm9vbCcpO1xuICAgIGNvbnN0IGIgPSB0Zi50ZW5zb3I0ZChcbiAgICAgICAgW1tbWzEsIDBdXSwgW1swLCAwXV1dLCBbW1swLCAwXV0sIFtbMSwgMV1dXV0sIFsyLCAyLCAxLCAyXSwgJ2Jvb2wnKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShcbiAgICAgICAgYXdhaXQgdGYubG9naWNhbE9yKGEsIGIpLmRhdGEoKSwgWzEsIDEsIDAsIDAsIDEsIDEsIDEsIDFdKTtcbiAgfSk7XG5cbiAgaXQoJ1RlbnNvckxpa2UnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYSA9IFt0cnVlLCBmYWxzZSwgZmFsc2VdO1xuICAgIGNvbnN0IGIgPSBbZmFsc2UsIHRydWUsIGZhbHNlXTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMF0pO1xuICB9KTtcblxuICBpdCgnVGVuc29yTGlrZSBDaGFpbmVkJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IxZChbMSwgMCwgMF0sICdib29sJyk7XG4gICAgY29uc3QgYiA9IFtmYWxzZSwgdHJ1ZSwgZmFsc2VdO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IGEubG9naWNhbE9yKGIpLmRhdGEoKSwgWzEsIDEsIDBdKTtcbiAgfSk7XG5cbiAgaXQoJ3Rocm93cyB3aGVuIHBhc3NlZCBhIGFzIGEgbm9uLXRlbnNvcicsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gdGYubG9naWNhbE9yKHt9IGFzIHRmLlRlbnNvciwgdGYuc2NhbGFyKDEsICdib29sJykpKVxuICAgICAgICAudG9UaHJvd0Vycm9yKC9Bcmd1bWVudCAnYScgcGFzc2VkIHRvICdsb2dpY2FsT3InIG11c3QgYmUgYSBUZW5zb3IvKTtcbiAgfSk7XG4gIGl0KCd0aHJvd3Mgd2hlbiBwYXNzZWQgYiBhcyBhIG5vbi10ZW5zb3InLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHRmLmxvZ2ljYWxPcih0Zi5zY2FsYXIoMSwgJ2Jvb2wnKSwge30gYXMgdGYuVGVuc29yKSlcbiAgICAgICAgLnRvVGhyb3dFcnJvcigvQXJndW1lbnQgJ2InIHBhc3NlZCB0byAnbG9naWNhbE9yJyBtdXN0IGJlIGEgVGVuc29yLyk7XG4gIH0pO1xuXG4gIGl0KCdhY2NlcHRzIGEgdGVuc29yLWxpa2Ugb2JqZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSBbMSwgMCwgMCwgMV07XG4gICAgY29uc3QgYiA9IFswLCAxLCAwLCAxXTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCB0Zi5sb2dpY2FsT3IoYSwgYikuZGF0YSgpLCBbMSwgMSwgMCwgMV0pO1xuICB9KTtcbn0pO1xuIl19