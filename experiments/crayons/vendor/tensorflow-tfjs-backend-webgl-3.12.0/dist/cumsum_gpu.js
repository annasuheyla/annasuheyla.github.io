import { getCoordsDataType } from './shader_compiler';
export class CumSumProgram {
    constructor(shape, exclusive, reverse) {
        this.variableNames = ['x'];
        this.customUniforms = [{ name: 'index', type: 'float' }];
        this.outputShape = shape;
        const rank = shape.length;
        const val = exclusive ? '0.0' : `getX(${getCoords(rank, 'coords')})`;
        const length = shape[shape.length - 1];
        let condition = '';
        let idxString = '';
        // When exclusive is set, the cumsum op becomes roll op that copies the
        // value from the previous index based on the direction specified by the
        // reverse flag.
        if (exclusive) {
            condition = reverse ? `end != ${length - 1}` : 'end != 0';
            idxString = reverse ? 'end + 1' : 'end - 1';
        }
        else {
            condition = reverse ? `end + pow2 < ${length}` : 'end >= pow2';
            idxString = (reverse ? 'end + pow2' : 'end - pow2');
        }
        this.userCode = `
      void main() {
        ${getCoordsDataType(rank)} coords = getOutputCoords();
        int end = ${getFinalCoord(rank, 'coords')};
        float val = ${val};
        int pow2 = int(pow(2.0, index));
        if (${condition}) {
          int idx = ${idxString};
          ${getFinalCoord(rank, 'coords')} = idx;
          val += getX(${getCoords(rank, 'coords')});
        }
        setOutput(val);
      }
    `;
    }
}
function getCoords(rank, name) {
    if (rank === 1) {
        return `${name}`;
    }
    else if (rank === 2) {
        return `${name}.x, ${name}.y`;
    }
    else if (rank === 3) {
        return `${name}.x, ${name}.y, ${name}.z`;
    }
    else if (rank === 4) {
        return `${name}.x, ${name}.y, ${name}.z, ${name}.w`;
    }
    else {
        throw Error(`Cumulative sum for rank ${rank} is not yet supported`);
    }
}
function getFinalCoord(rank, name) {
    if (rank === 1) {
        return `${name}`;
    }
    else if (rank === 2) {
        return `${name}.y`;
    }
    else if (rank === 3) {
        return `${name}.z`;
    }
    else if (rank === 4) {
        return `${name}.w`;
    }
    else {
        throw Error(`Cumulative sum for rank ${rank} is not yet supported`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vtc3VtX2dwdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMvY3Vtc3VtX2dwdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsT0FBTyxFQUFDLGlCQUFpQixFQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFFakUsTUFBTSxPQUFPLGFBQWE7SUFNeEIsWUFBWSxLQUFlLEVBQUUsU0FBa0IsRUFBRSxPQUFnQjtRQUxqRSxrQkFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHdEIsbUJBQWMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBc0IsRUFBQyxDQUFDLENBQUM7UUFHL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDckUsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQix1RUFBdUU7UUFDdkUsd0VBQXdFO1FBQ3hFLGdCQUFnQjtRQUNoQixJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDMUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7U0FDN0M7YUFBTTtZQUNMLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQy9ELFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUc7O1VBRVYsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUNiLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO3NCQUMzQixHQUFHOztjQUVYLFNBQVM7c0JBQ0QsU0FBUztZQUNuQixhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzt3QkFDakIsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7Ozs7S0FJNUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELFNBQVMsU0FBUyxDQUFDLElBQVksRUFBRSxJQUFZO0lBQzNDLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNkLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQztLQUNsQjtTQUFNLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLEdBQUcsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDO0tBQzFDO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQztLQUNyRDtTQUFNO1FBQ0wsTUFBTSxLQUFLLENBQUMsMkJBQTJCLElBQUksdUJBQXVCLENBQUMsQ0FBQztLQUNyRTtBQUNILENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUMvQyxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDZCxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7S0FDbEI7U0FBTSxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO0tBQ3BCO1NBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQztLQUNwQjtTQUFNLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUM7S0FDcEI7U0FBTTtRQUNMLE1BQU0sS0FBSyxDQUFDLDJCQUEyQixJQUFJLHVCQUF1QixDQUFDLENBQUM7S0FDckU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuaW1wb3J0IHtHUEdQVVByb2dyYW19IGZyb20gJy4vZ3BncHVfbWF0aCc7XG5pbXBvcnQge2dldENvb3Jkc0RhdGFUeXBlLCBVbmlmb3JtVHlwZX0gZnJvbSAnLi9zaGFkZXJfY29tcGlsZXInO1xuXG5leHBvcnQgY2xhc3MgQ3VtU3VtUHJvZ3JhbSBpbXBsZW1lbnRzIEdQR1BVUHJvZ3JhbSB7XG4gIHZhcmlhYmxlTmFtZXMgPSBbJ3gnXTtcbiAgb3V0cHV0U2hhcGU6IG51bWJlcltdO1xuICB1c2VyQ29kZTogc3RyaW5nO1xuICBjdXN0b21Vbmlmb3JtcyA9IFt7bmFtZTogJ2luZGV4JywgdHlwZTogJ2Zsb2F0JyBhcyBVbmlmb3JtVHlwZX1dO1xuXG4gIGNvbnN0cnVjdG9yKHNoYXBlOiBudW1iZXJbXSwgZXhjbHVzaXZlOiBib29sZWFuLCByZXZlcnNlOiBib29sZWFuKSB7XG4gICAgdGhpcy5vdXRwdXRTaGFwZSA9IHNoYXBlO1xuICAgIGNvbnN0IHJhbmsgPSBzaGFwZS5sZW5ndGg7XG4gICAgY29uc3QgdmFsID0gZXhjbHVzaXZlID8gJzAuMCcgOiBgZ2V0WCgke2dldENvb3JkcyhyYW5rLCAnY29vcmRzJyl9KWA7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hhcGVbc2hhcGUubGVuZ3RoIC0gMV07XG4gICAgbGV0IGNvbmRpdGlvbiA9ICcnO1xuICAgIGxldCBpZHhTdHJpbmcgPSAnJztcbiAgICAvLyBXaGVuIGV4Y2x1c2l2ZSBpcyBzZXQsIHRoZSBjdW1zdW0gb3AgYmVjb21lcyByb2xsIG9wIHRoYXQgY29waWVzIHRoZVxuICAgIC8vIHZhbHVlIGZyb20gdGhlIHByZXZpb3VzIGluZGV4IGJhc2VkIG9uIHRoZSBkaXJlY3Rpb24gc3BlY2lmaWVkIGJ5IHRoZVxuICAgIC8vIHJldmVyc2UgZmxhZy5cbiAgICBpZiAoZXhjbHVzaXZlKSB7XG4gICAgICBjb25kaXRpb24gPSByZXZlcnNlID8gYGVuZCAhPSAke2xlbmd0aCAtIDF9YCA6ICdlbmQgIT0gMCc7XG4gICAgICBpZHhTdHJpbmcgPSByZXZlcnNlID8gJ2VuZCArIDEnIDogJ2VuZCAtIDEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25kaXRpb24gPSByZXZlcnNlID8gYGVuZCArIHBvdzIgPCAke2xlbmd0aH1gIDogJ2VuZCA+PSBwb3cyJztcbiAgICAgIGlkeFN0cmluZyA9IChyZXZlcnNlID8gJ2VuZCArIHBvdzInIDogJ2VuZCAtIHBvdzInKTtcbiAgICB9XG5cbiAgICB0aGlzLnVzZXJDb2RlID0gYFxuICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAke2dldENvb3Jkc0RhdGFUeXBlKHJhbmspfSBjb29yZHMgPSBnZXRPdXRwdXRDb29yZHMoKTtcbiAgICAgICAgaW50IGVuZCA9ICR7Z2V0RmluYWxDb29yZChyYW5rLCAnY29vcmRzJyl9O1xuICAgICAgICBmbG9hdCB2YWwgPSAke3ZhbH07XG4gICAgICAgIGludCBwb3cyID0gaW50KHBvdygyLjAsIGluZGV4KSk7XG4gICAgICAgIGlmICgke2NvbmRpdGlvbn0pIHtcbiAgICAgICAgICBpbnQgaWR4ID0gJHtpZHhTdHJpbmd9O1xuICAgICAgICAgICR7Z2V0RmluYWxDb29yZChyYW5rLCAnY29vcmRzJyl9ID0gaWR4O1xuICAgICAgICAgIHZhbCArPSBnZXRYKCR7Z2V0Q29vcmRzKHJhbmssICdjb29yZHMnKX0pO1xuICAgICAgICB9XG4gICAgICAgIHNldE91dHB1dCh2YWwpO1xuICAgICAgfVxuICAgIGA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29vcmRzKHJhbms6IG51bWJlciwgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHJhbmsgPT09IDEpIHtcbiAgICByZXR1cm4gYCR7bmFtZX1gO1xuICB9IGVsc2UgaWYgKHJhbmsgPT09IDIpIHtcbiAgICByZXR1cm4gYCR7bmFtZX0ueCwgJHtuYW1lfS55YDtcbiAgfSBlbHNlIGlmIChyYW5rID09PSAzKSB7XG4gICAgcmV0dXJuIGAke25hbWV9LngsICR7bmFtZX0ueSwgJHtuYW1lfS56YDtcbiAgfSBlbHNlIGlmIChyYW5rID09PSA0KSB7XG4gICAgcmV0dXJuIGAke25hbWV9LngsICR7bmFtZX0ueSwgJHtuYW1lfS56LCAke25hbWV9LndgO1xuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKGBDdW11bGF0aXZlIHN1bSBmb3IgcmFuayAke3Jhbmt9IGlzIG5vdCB5ZXQgc3VwcG9ydGVkYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RmluYWxDb29yZChyYW5rOiBudW1iZXIsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChyYW5rID09PSAxKSB7XG4gICAgcmV0dXJuIGAke25hbWV9YDtcbiAgfSBlbHNlIGlmIChyYW5rID09PSAyKSB7XG4gICAgcmV0dXJuIGAke25hbWV9LnlgO1xuICB9IGVsc2UgaWYgKHJhbmsgPT09IDMpIHtcbiAgICByZXR1cm4gYCR7bmFtZX0uemA7XG4gIH0gZWxzZSBpZiAocmFuayA9PT0gNCkge1xuICAgIHJldHVybiBgJHtuYW1lfS53YDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcihgQ3VtdWxhdGl2ZSBzdW0gZm9yIHJhbmsgJHtyYW5rfSBpcyBub3QgeWV0IHN1cHBvcnRlZGApO1xuICB9XG59XG4iXX0=