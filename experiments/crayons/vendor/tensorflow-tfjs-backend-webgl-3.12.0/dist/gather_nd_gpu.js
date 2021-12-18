import { getCoordsDataType } from './shader_compiler';
export class GatherNDProgram {
    constructor(sliceDim, strides, shape) {
        this.sliceDim = sliceDim;
        this.strides = strides;
        this.variableNames = ['x', 'indices'];
        this.outputShape = shape;
        const stridesType = getCoordsDataType(strides.length);
        const dtype = getCoordsDataType(shape.length);
        const strideString = this.sliceDim > 1 ? 'strides[j]' : 'strides';
        this.userCode = `
        ${stridesType} strides = ${stridesType}(${this.strides});
         void main() {
          ${dtype} coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < ${this.sliceDim}; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * ${strideString};
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0aGVyX25kX2dwdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13ZWJnbC9zcmMvZ2F0aGVyX25kX2dwdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFDWSxRQUFnQixFQUFVLE9BQWlCLEVBQUUsS0FBZTtRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUp2RCxrQkFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBSy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUc7VUFDVixXQUFXLGNBQWMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPOztZQUVsRCxLQUFLOztnQ0FFZSxJQUFJLENBQUMsUUFBUTs7c0NBRVAsWUFBWTs7OztPQUkzQyxDQUFDO0lBQ04sQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuaW1wb3J0IHtHUEdQVVByb2dyYW19IGZyb20gJy4vZ3BncHVfbWF0aCc7XG5pbXBvcnQge2dldENvb3Jkc0RhdGFUeXBlfSBmcm9tICcuL3NoYWRlcl9jb21waWxlcic7XG5cbmV4cG9ydCBjbGFzcyBHYXRoZXJORFByb2dyYW0gaW1wbGVtZW50cyBHUEdQVVByb2dyYW0ge1xuICB2YXJpYWJsZU5hbWVzID0gWyd4JywgJ2luZGljZXMnXTtcbiAgb3V0cHV0U2hhcGU6IG51bWJlcltdO1xuICB1c2VyQ29kZTogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc2xpY2VEaW06IG51bWJlciwgcHJpdmF0ZSBzdHJpZGVzOiBudW1iZXJbXSwgc2hhcGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5vdXRwdXRTaGFwZSA9IHNoYXBlO1xuICAgIGNvbnN0IHN0cmlkZXNUeXBlID0gZ2V0Q29vcmRzRGF0YVR5cGUoc3RyaWRlcy5sZW5ndGgpO1xuICAgIGNvbnN0IGR0eXBlID0gZ2V0Q29vcmRzRGF0YVR5cGUoc2hhcGUubGVuZ3RoKTtcbiAgICBjb25zdCBzdHJpZGVTdHJpbmcgPSB0aGlzLnNsaWNlRGltID4gMSA/ICdzdHJpZGVzW2pdJyA6ICdzdHJpZGVzJztcbiAgICB0aGlzLnVzZXJDb2RlID0gYFxuICAgICAgICAke3N0cmlkZXNUeXBlfSBzdHJpZGVzID0gJHtzdHJpZGVzVHlwZX0oJHt0aGlzLnN0cmlkZXN9KTtcbiAgICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICAke2R0eXBlfSBjb29yZHMgPSBnZXRPdXRwdXRDb29yZHMoKTtcbiAgICAgICAgICBpbnQgZmxhdHRlbkluZGV4ID0gMDtcbiAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8ICR7dGhpcy5zbGljZURpbX07IGorKykge1xuICAgICAgICAgICAgaW50IGluZGV4ID0gcm91bmQoZ2V0SW5kaWNlcyhjb29yZHNbMF0sIGopKTtcbiAgICAgICAgICAgIGZsYXR0ZW5JbmRleCArPSBpbmRleCAqICR7c3RyaWRlU3RyaW5nfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0T3V0cHV0KGdldFgoZmxhdHRlbkluZGV4LCBjb29yZHNbMV0pKTtcbiAgICAgICAgfVxuICAgICAgYDtcbiAgfVxufVxuIl19