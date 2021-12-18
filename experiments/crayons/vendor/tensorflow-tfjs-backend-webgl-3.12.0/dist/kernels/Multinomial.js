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
import { Multinomial } from '@tensorflow/tfjs-core';
import { MultinomialProgram } from '../multinomial_gpu';
import { softmax } from './Softmax';
export function multinomial(args) {
    const { inputs, backend, attrs } = args;
    const { logits } = inputs;
    const { numSamples, seed, normalized } = attrs;
    const probs = normalized ?
        logits :
        softmax({ inputs: { logits }, backend, attrs: { dim: logits.shape.length - 1 } });
    const batchSize = probs.shape[0];
    const numOutcomes = probs.shape[1];
    const program = new MultinomialProgram(batchSize, numOutcomes, numSamples);
    const customValues = [[seed]];
    const res = backend.runWebGLProgram(program, [probs], 'int32', customValues);
    if (!normalized) {
        backend.disposeIntermediateTensorInfo(probs);
    }
    return res;
}
export const multinomialConfig = {
    kernelName: Multinomial,
    backendName: 'webgl',
    kernelFunc: multinomial
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlub21pYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL2tlcm5lbHMvTXVsdGlub21pYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUEyQixXQUFXLEVBQWtELE1BQU0sdUJBQXVCLENBQUM7QUFHN0gsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLFVBQVUsV0FBVyxDQUFDLElBSTNCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFDeEIsTUFBTSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLEdBQUcsS0FBSyxDQUFDO0lBRTdDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUNILEVBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUM7SUFDNUUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsT0FBTyxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQWlCO0lBQzdDLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFVBQVUsRUFBRSxXQUErQjtDQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0tlcm5lbENvbmZpZywgS2VybmVsRnVuYywgTXVsdGlub21pYWwsIE11bHRpbm9taWFsQXR0cnMsIE11bHRpbm9taWFsSW5wdXRzLCBUZW5zb3JJbmZvfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtNdWx0aW5vbWlhbFByb2dyYW19IGZyb20gJy4uL211bHRpbm9taWFsX2dwdSc7XG5cbmltcG9ydCB7c29mdG1heH0gZnJvbSAnLi9Tb2Z0bWF4JztcblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpbm9taWFsKGFyZ3M6IHtcbiAgaW5wdXRzOiBNdWx0aW5vbWlhbElucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IE11bHRpbm9taWFsQXR0cnNcbn0pOiBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge2xvZ2l0c30gPSBpbnB1dHM7XG4gIGNvbnN0IHtudW1TYW1wbGVzLCBzZWVkLCBub3JtYWxpemVkfSA9IGF0dHJzO1xuXG4gIGNvbnN0IHByb2JzID0gbm9ybWFsaXplZCA/XG4gICAgICBsb2dpdHMgOlxuICAgICAgc29mdG1heChcbiAgICAgICAgICB7aW5wdXRzOiB7bG9naXRzfSwgYmFja2VuZCwgYXR0cnM6IHtkaW06IGxvZ2l0cy5zaGFwZS5sZW5ndGggLSAxfX0pO1xuICBjb25zdCBiYXRjaFNpemUgPSBwcm9icy5zaGFwZVswXTtcbiAgY29uc3QgbnVtT3V0Y29tZXMgPSBwcm9icy5zaGFwZVsxXTtcbiAgY29uc3QgcHJvZ3JhbSA9IG5ldyBNdWx0aW5vbWlhbFByb2dyYW0oYmF0Y2hTaXplLCBudW1PdXRjb21lcywgbnVtU2FtcGxlcyk7XG4gIGNvbnN0IGN1c3RvbVZhbHVlcyA9IFtbc2VlZF1dO1xuICBjb25zdCByZXMgPSBiYWNrZW5kLnJ1bldlYkdMUHJvZ3JhbShwcm9ncmFtLCBbcHJvYnNdLCAnaW50MzInLCBjdXN0b21WYWx1ZXMpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHtcbiAgICBiYWNrZW5kLmRpc3Bvc2VJbnRlcm1lZGlhdGVUZW5zb3JJbmZvKHByb2JzKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgY29uc3QgbXVsdGlub21pYWxDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogTXVsdGlub21pYWwsXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBtdWx0aW5vbWlhbCBhcyB7fSBhcyBLZXJuZWxGdW5jXG59O1xuIl19