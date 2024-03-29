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
import { env, Neg } from '@tensorflow/tfjs-core';
import { negImplCPU } from '../kernel_utils/shared';
import { UnaryOpProgram } from '../unaryop_gpu';
import { UnaryOpPackedProgram } from '../unaryop_packed_gpu';
const NEG = `return -x;`;
// This doesn't use unaryKernelFunc because negImplCPU is not of type
// SimpleUnaryKernelImplCPU.
export function neg(args) {
    const { inputs, backend } = args;
    const { x } = inputs;
    if (backend.shouldExecuteOnCPU([x])) {
        const xData = backend.texData.get(x.dataId);
        const [outValues, newShape] = negImplCPU(xData.values, x.shape, x.dtype);
        return backend.makeTensorInfo(newShape, x.dtype, outValues);
    }
    let program;
    if (env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
        program = new UnaryOpPackedProgram(x.shape, NEG);
    }
    else {
        program = new UnaryOpProgram(x.shape, NEG);
    }
    return backend.runWebGLProgram(program, [x], x.dtype);
}
export const negConfig = {
    kernelName: Neg,
    backendName: 'webgl',
    kernelFunc: neg
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL05lZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsR0FBRyxFQUE0QixHQUFHLEVBQW9DLE1BQU0sdUJBQXVCLENBQUM7QUFFNUcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUM7QUFFekIscUVBQXFFO0FBQ3JFLDRCQUE0QjtBQUM1QixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQW9EO0lBRXRFLE1BQU0sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQy9CLE1BQU0sRUFBQyxDQUFDLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFFbkIsSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxHQUN2QixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQW9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzdEO0lBRUQsSUFBSSxPQUE0QyxDQUFDO0lBQ2pELElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLEVBQUU7UUFDaEQsT0FBTyxHQUFHLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0wsT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQWlCO0lBQ3JDLFVBQVUsRUFBRSxHQUFHO0lBQ2YsV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFLEdBQXVCO0NBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7ZW52LCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIE5lZywgTmVnSW5wdXRzLCBUZW5zb3JJbmZvLCBUeXBlZEFycmF5fSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuaW1wb3J0IHtNYXRoQmFja2VuZFdlYkdMfSBmcm9tICcuLi9iYWNrZW5kX3dlYmdsJztcbmltcG9ydCB7bmVnSW1wbENQVX0gZnJvbSAnLi4va2VybmVsX3V0aWxzL3NoYXJlZCc7XG5pbXBvcnQge1VuYXJ5T3BQcm9ncmFtfSBmcm9tICcuLi91bmFyeW9wX2dwdSc7XG5pbXBvcnQge1VuYXJ5T3BQYWNrZWRQcm9ncmFtfSBmcm9tICcuLi91bmFyeW9wX3BhY2tlZF9ncHUnO1xuXG5jb25zdCBORUcgPSBgcmV0dXJuIC14O2A7XG5cbi8vIFRoaXMgZG9lc24ndCB1c2UgdW5hcnlLZXJuZWxGdW5jIGJlY2F1c2UgbmVnSW1wbENQVSBpcyBub3Qgb2YgdHlwZVxuLy8gU2ltcGxlVW5hcnlLZXJuZWxJbXBsQ1BVLlxuZXhwb3J0IGZ1bmN0aW9uIG5lZyhhcmdzOiB7aW5wdXRzOiBOZWdJbnB1dHMsIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0x9KTpcbiAgICBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZH0gPSBhcmdzO1xuICBjb25zdCB7eH0gPSBpbnB1dHM7XG5cbiAgaWYgKGJhY2tlbmQuc2hvdWxkRXhlY3V0ZU9uQ1BVKFt4XSkpIHtcbiAgICBjb25zdCB4RGF0YSA9IGJhY2tlbmQudGV4RGF0YS5nZXQoeC5kYXRhSWQpO1xuICAgIGNvbnN0IFtvdXRWYWx1ZXMsIG5ld1NoYXBlXSA9XG4gICAgICAgIG5lZ0ltcGxDUFUoeERhdGEudmFsdWVzIGFzIFR5cGVkQXJyYXksIHguc2hhcGUsIHguZHR5cGUpO1xuICAgIHJldHVybiBiYWNrZW5kLm1ha2VUZW5zb3JJbmZvKG5ld1NoYXBlLCB4LmR0eXBlLCBvdXRWYWx1ZXMpO1xuICB9XG5cbiAgbGV0IHByb2dyYW06IFVuYXJ5T3BQcm9ncmFtfFVuYXJ5T3BQYWNrZWRQcm9ncmFtO1xuICBpZiAoZW52KCkuZ2V0Qm9vbCgnV0VCR0xfUEFDS19VTkFSWV9PUEVSQVRJT05TJykpIHtcbiAgICBwcm9ncmFtID0gbmV3IFVuYXJ5T3BQYWNrZWRQcm9ncmFtKHguc2hhcGUsIE5FRyk7XG4gIH0gZWxzZSB7XG4gICAgcHJvZ3JhbSA9IG5ldyBVbmFyeU9wUHJvZ3JhbSh4LnNoYXBlLCBORUcpO1xuICB9XG5cbiAgcmV0dXJuIGJhY2tlbmQucnVuV2ViR0xQcm9ncmFtKHByb2dyYW0sIFt4XSwgeC5kdHlwZSk7XG59XG5cbmV4cG9ydCBjb25zdCBuZWdDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogTmVnLFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogbmVnIGFzIHt9IGFzIEtlcm5lbEZ1bmNcbn07XG4iXX0=