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
import { useShapeUniforms } from './gpgpu_math';
import { getChannels } from './packing_util';
import { getCoordsDataType } from './shader_compiler';
export class PackProgram {
    constructor(outputShape) {
        this.variableNames = ['A'];
        this.packedInputs = false;
        this.packedOutput = true;
        // Only input / output 3D tensors.
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        this.enableShapeUniforms = useShapeUniforms(this.outputShape.length);
        if (this.rank === 0) {
            this.userCode = `
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;
        }
        else {
            const channels = getChannels('rc', this.rank);
            const dtype = getCoordsDataType(this.rank);
            const outOfBoundsCondition = this.getOutOfBoundsCondition(channels);
            const setup = this.getSetup(channels);
            const output = this.getOutput(channels);
            this.userCode = `
        void main() {
          ${dtype} rc = getOutputCoords();

          if(${outOfBoundsCondition}) {
            setOutput(vec4(0));
          } else {
            ${setup}

            setOutput(vec4(${output}));
          }
        }
      `;
        }
    }
    getSourceCoordsArr(dims) {
        const coords = [];
        for (let row = 0; row <= 1; row++) {
            for (let col = 0; col <= 1; col++) {
                let coord = `${row === 0 ? 'r' : 'rp1'}, ${col === 0 ? 'c' : 'cp1'}`;
                for (let d = 2; d < this.rank; d++) {
                    coord = `${dims[dims.length - 1 - d]},` + coord;
                }
                coords.push(coord);
            }
        }
        return coords;
    }
    getOutOfBoundsCondition(dims) {
        if (this.rank === 1) {
            return `rc > ${this.enableShapeUniforms ? 'outShape' :
                this.outputShape[0]}`;
        }
        let cond = '';
        for (let i = this.rank - 2; i < this.rank; i++) {
            cond += `${dims[i]} >= ${this.enableShapeUniforms ? `outShape[${i}]` :
                this.outputShape[i]}`;
            if (i < this.rank - 1) {
                cond += '||';
            }
        }
        return cond;
    }
    getSetup(dims) {
        if (this.rank === 1) {
            return '';
        }
        const innerDims = dims.slice(-2);
        const col = this.enableShapeUniforms ? `outShape[${this.rank} - 1]` :
            this.outputShape[this.rank - 1];
        const row = this.enableShapeUniforms ? `outShape[${this.rank} - 2]` :
            this.outputShape[this.rank - 2];
        return `
      int r = ${innerDims[0]};
      int c = ${innerDims[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${col};
      bool rEdge = rp1 >= ${row};
    `;
    }
    getOutput(dims) {
        const sourceCoords = this.getSourceCoordsArr(dims);
        if (this.rank === 1) {
            return `getA(rc),
              rc + 1 >= ${this.enableShapeUniforms ? 'outShape' :
                this.outputShape[0]} ? 0. : getA(rc + 1),
              0, 0`;
        }
        return `getA(${sourceCoords[0]}),
            cEdge ? 0. : getA(${sourceCoords[1]}),
            rEdge ? 0. : getA(${sourceCoords[2]}),
            rEdge || cEdge ? 0. : getA(${sourceCoords[3]})`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja19ncHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL3BhY2tfZ3B1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUVILE9BQU8sRUFBZSxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM1RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsTUFBTSxPQUFPLFdBQVc7SUFTdEIsWUFDSSxXQUNZO1FBVmhCLGtCQUFhLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUd0QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQU9DLGtDQUFrQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHOzs7O09BSWYsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxvQkFBb0IsR0FDdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENB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Q0FBQyxDQUFDO1FBRXJDLE9BQU87Z0JBQ0ssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWixTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OzRCQUlBLEdBQUc7NEJBQ0gsR0FBRztLQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUFjO1FBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU87MEJBQ2EsSUFBSSxDQUFDLG1CQUFtQixDQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7bUJBQ2xCLENBQUM7U0FDZjtRQUVELE9BQU8sUUFBUSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dDQUNGLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0NBQ2YsWUFBWSxDQUFDLENBQUMsQ0FBQzt5Q0FDTixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUMxRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7R1BHUFVQcm9ncmFtLCB1c2VTaGFwZVVuaWZvcm1zfSBmcm9tICcuL2dwZ3B1X21hdGgnO1xuaW1wb3J0IHtnZXRDaGFubmVsc30gZnJvbSAnLi9wYWNraW5nX3V0aWwnO1xuaW1wb3J0IHtnZXRDb29yZHNEYXRhVHlwZX0gZnJvbSAnLi9zaGFkZXJfY29tcGlsZXInO1xuXG5leHBvcnQgY2xhc3MgUGFja1Byb2dyYW0gaW1wbGVtZW50cyBHUEdQVVByb2dyYW0ge1xuICB2YXJpYWJsZU5hbWVzID0gWydBJ107XG4gIG91dHB1dFNoYXBlOiBudW1iZXJbXTtcbiAgdXNlckNvZGU6IHN0cmluZztcbiAgcGFja2VkSW5wdXRzID0gZmFsc2U7XG4gIHBhY2tlZE91dHB1dCA9IHRydWU7XG4gIGVuYWJsZVNoYXBlVW5pZm9ybXM6IGJvb2xlYW47XG4gIHJhbms6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIG91dHB1dFNoYXBlOlxuICAgICAgICAgIG51bWJlcltdKSB7ICAvLyBUT0RPKGh0dHBzOi8vZ2l0aHViLmNvbS90ZW5zb3JmbG93L3RmanMvaXNzdWVzLzg5Myk6XG4gICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgaW5wdXQgLyBvdXRwdXQgM0QgdGVuc29ycy5cbiAgICB0aGlzLm91dHB1dFNoYXBlID0gb3V0cHV0U2hhcGU7XG4gICAgdGhpcy5yYW5rID0gb3V0cHV0U2hhcGUubGVuZ3RoO1xuICAgIHRoaXMuZW5hYmxlU2hhcGVVbmlmb3JtcyA9IHVzZVNoYXBlVW5pZm9ybXModGhpcy5vdXRwdXRTaGFwZS5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMucmFuayA9PT0gMCkge1xuICAgICAgdGhpcy51c2VyQ29kZSA9IGBcbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIHNldE91dHB1dCh2ZWM0KGdldEEoKSwgMC4sIDAuLCAwLikpO1xuICAgICAgICB9XG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjaGFubmVscyA9IGdldENoYW5uZWxzKCdyYycsIHRoaXMucmFuayk7XG4gICAgICBjb25zdCBkdHlwZSA9IGdldENvb3Jkc0RhdGFUeXBlKHRoaXMucmFuayk7XG4gICAgICBjb25zdCBvdXRPZkJvdW5kc0NvbmRpdGlvbiA9XG4gICAgICAgICAgdGhpcy5nZXRPdXRPZkJvdW5kc0NvbmRpdGlvbihjaGFubmVscyk7XG4gICAgICBjb25zdCBzZXR1cCA9IHRoaXMuZ2V0U2V0dXAoY2hhbm5lbHMpO1xuICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5nZXRPdXRwdXQoY2hhbm5lbHMpO1xuXG4gICAgICB0aGlzLnVzZXJDb2RlID0gYFxuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgJHtkdHlwZX0gcmMgPSBnZXRPdXRwdXRDb29yZHMoKTtcblxuICAgICAgICAgIGlmKCR7b3V0T2ZCb3VuZHNDb25kaXRpb259KSB7XG4gICAgICAgICAgICBzZXRPdXRwdXQodmVjNCgwKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR7c2V0dXB9XG5cbiAgICAgICAgICAgIHNldE91dHB1dCh2ZWM0KCR7b3V0cHV0fSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUNvb3Jkc0FycihkaW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8PSAxOyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDw9IDE7IGNvbCsrKSB7XG4gICAgICAgIGxldCBjb29yZCA9IGAke3JvdyA9PT0gMCA/ICdyJyA6ICdycDEnfSwgJHtjb2wgPT09IDAgPyAnYycgOiAnY3AxJ31gO1xuXG4gICAgICAgIGZvciAobGV0IGQgPSAyOyBkIDwgdGhpcy5yYW5rOyBkKyspIHtcbiAgICAgICAgICBjb29yZCA9IGAke2RpbXNbZGltcy5sZW5ndGggLSAxIC0gZF19LGAgKyBjb29yZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3V0T2ZCb3VuZHNDb25kaXRpb24oZGltczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnJhbmsgPT09IDEpIHtcbiAgICAgIHJldHVybiBgcmMgPiAke3RoaXMuZW5hYmxlU2hhcGVVbmlmb3Jtcz8gJ291dFNoYXBlJyA6XG4gICAgICAgICAgdGhpcy5vdXRwdXRTaGFwZVswXX1gO1xuICAgIH1cblxuICAgIGxldCBjb25kID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMucmFuayAtIDI7IGkgPCB0aGlzLnJhbms7IGkrKykge1xuICAgICAgY29uZCArPSBgJHtkaW1zW2ldfSA+PSAke3RoaXMuZW5hYmxlU2hhcGVVbmlmb3Jtcz8gYG91dFNoYXBlWyR7aX1dYCA6XG4gICAgICAgICB0aGlzLm91dHB1dFNoYXBlW2ldfWA7XG4gICAgICBpZiAoaSA8IHRoaXMucmFuayAtIDEpIHtcbiAgICAgICAgY29uZCArPSAnfHwnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb25kO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZXR1cChkaW1zOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMucmFuayA9PT0gMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGlubmVyRGltcyA9IGRpbXMuc2xpY2UoLTIpO1xuICAgIGNvbnN0IGNvbCA9IHRoaXMuZW5hYmxlU2hhcGVVbmlmb3Jtcz8gYG91dFNoYXBlWyR7dGhpcy5yYW5rfSAtIDFdYCA6XG4gICAgICAgIHRoaXMub3V0cHV0U2hhcGVbdGhpcy5yYW5rIC0gMV07XG4gICAgY29uc3Qgcm93ID0gdGhpcy5lbmFibGVTaGFwZVVuaWZvcm1zPyBgb3V0U2hhcGVbJHt0aGlzLnJhbmt9IC0gMl1gIDpcbiAgICAgICAgIHRoaXMub3V0cHV0U2hhcGVbdGhpcy5yYW5rIC0gMl07XG5cbiAgICByZXR1cm4gYFxuICAgICAgaW50IHIgPSAke2lubmVyRGltc1swXX07XG4gICAgICBpbnQgYyA9ICR7aW5uZXJEaW1zWzFdfTtcbiAgICAgIGludCBycDEgPSByICsgMTtcbiAgICAgIGludCBjcDEgPSBjICsgMTtcblxuICAgICAgYm9vbCBjRWRnZSA9IGNwMSA+PSAke2NvbH07XG4gICAgICBib29sIHJFZGdlID0gcnAxID49ICR7cm93fTtcbiAgICBgO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPdXRwdXQoZGltczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIGNvbnN0IHNvdXJjZUNvb3JkcyA9IHRoaXMuZ2V0U291cmNlQ29vcmRzQXJyKGRpbXMpO1xuICAgIGlmICh0aGlzLnJhbmsgPT09IDEpIHtcbiAgICAgIHJldHVybiBgZ2V0QShyYyksXG4gICAgICAgICAgICAgIHJjICsgMSA+PSAke3RoaXMuZW5hYmxlU2hhcGVVbmlmb3Jtcz8gJ291dFNoYXBlJyA6XG4gICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dFNoYXBlWzBdfSA/IDAuIDogZ2V0QShyYyArIDEpLFxuICAgICAgICAgICAgICAwLCAwYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYGdldEEoJHtzb3VyY2VDb29yZHNbMF19KSxcbiAgICAgICAgICAgIGNFZGdlID8gMC4gOiBnZXRBKCR7c291cmNlQ29vcmRzWzFdfSksXG4gICAgICAgICAgICByRWRnZSA/IDAuIDogZ2V0QSgke3NvdXJjZUNvb3Jkc1syXX0pLFxuICAgICAgICAgICAgckVkZ2UgfHwgY0VkZ2UgPyAwLiA6IGdldEEoJHtzb3VyY2VDb29yZHNbM119KWA7XG4gIH1cbn1cbiJdfQ==