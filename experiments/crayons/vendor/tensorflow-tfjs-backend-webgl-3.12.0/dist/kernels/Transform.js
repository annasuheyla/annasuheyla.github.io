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
import { Transform } from '@tensorflow/tfjs-core';
import { TransformProgram } from '../transform_gpu';
export function transform(args) {
    const { inputs, backend, attrs } = args;
    const { image, transforms } = inputs;
    const { interpolation, fillMode, fillValue, outputShape } = attrs;
    const [batch, imageHeight, imageWidth, numChannels] = image.shape;
    const [outHeight, outWidth] = outputShape != null ? outputShape : [imageHeight, imageWidth];
    const outShape = [batch, outHeight, outWidth,
        numChannels];
    const program = new TransformProgram(imageHeight, imageWidth, interpolation, fillMode, fillValue, outShape);
    return backend.runWebGLProgram(program, [image, transforms], 'float32');
}
export const transformConfig = {
    kernelName: Transform,
    backendName: 'webgl',
    kernelFunc: transform
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL1RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQXVDLFNBQVMsRUFBa0MsTUFBTSx1QkFBdUIsQ0FBQztBQUd2SCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBSXpCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ25DLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFFaEUsTUFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDbEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsR0FDdkIsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRSxNQUFNLFFBQVEsR0FDVixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUTtRQUMxQixXQUFXLENBQXFDLENBQUM7SUFFdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FDaEMsV0FBVyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRSxPQUFPLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWlCO0lBQzNDLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxTQUE2QjtDQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0tlcm5lbENvbmZpZywgS2VybmVsRnVuYywgVGVuc29ySW5mbywgVHJhbnNmb3JtLCBUcmFuc2Zvcm1BdHRycywgVHJhbnNmb3JtSW5wdXRzfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtUcmFuc2Zvcm1Qcm9ncmFtfSBmcm9tICcuLi90cmFuc2Zvcm1fZ3B1JztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShhcmdzOiB7XG4gIGlucHV0czogVHJhbnNmb3JtSW5wdXRzLFxuICBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMLFxuICBhdHRyczogVHJhbnNmb3JtQXR0cnNcbn0pOiBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge2ltYWdlLCB0cmFuc2Zvcm1zfSA9IGlucHV0cztcbiAgY29uc3Qge2ludGVycG9sYXRpb24sIGZpbGxNb2RlLCBmaWxsVmFsdWUsIG91dHB1dFNoYXBlfSA9IGF0dHJzO1xuXG4gIGNvbnN0IFtiYXRjaCwgaW1hZ2VIZWlnaHQsIGltYWdlV2lkdGgsIG51bUNoYW5uZWxzXSA9IGltYWdlLnNoYXBlO1xuICBjb25zdCBbb3V0SGVpZ2h0LCBvdXRXaWR0aF0gPVxuICAgICAgb3V0cHV0U2hhcGUgIT0gbnVsbCA/IG91dHB1dFNoYXBlIDogW2ltYWdlSGVpZ2h0LCBpbWFnZVdpZHRoXTtcbiAgY29uc3Qgb3V0U2hhcGUgPVxuICAgICAgW2JhdGNoLCBvdXRIZWlnaHQsIG91dFdpZHRoLFxuICAgICAgIG51bUNoYW5uZWxzXSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcblxuICBjb25zdCBwcm9ncmFtID0gbmV3IFRyYW5zZm9ybVByb2dyYW0oXG4gICAgICBpbWFnZUhlaWdodCwgaW1hZ2VXaWR0aCwgaW50ZXJwb2xhdGlvbiwgZmlsbE1vZGUsIGZpbGxWYWx1ZSwgb3V0U2hhcGUpO1xuICByZXR1cm4gYmFja2VuZC5ydW5XZWJHTFByb2dyYW0ocHJvZ3JhbSwgW2ltYWdlLCB0cmFuc2Zvcm1zXSwgJ2Zsb2F0MzInKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUNvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBUcmFuc2Zvcm0sXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiB0cmFuc2Zvcm0gYXMge30gYXMgS2VybmVsRnVuY1xufTtcbiJdfQ==