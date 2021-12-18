/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
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
export var Rank;
(function (Rank) {
    Rank["R0"] = "R0";
    Rank["R1"] = "R1";
    Rank["R2"] = "R2";
    Rank["R3"] = "R3";
    Rank["R4"] = "R4";
    Rank["R5"] = "R5";
    Rank["R6"] = "R6";
})(Rank || (Rank = {}));
// Looks for upcasting types. Used, for example, in operations with mixed dtype
// inputs.
var UpcastInt32AndMap;
(function (UpcastInt32AndMap) {
    UpcastInt32AndMap["float32"] = "float32";
    UpcastInt32AndMap["int32"] = "int32";
    UpcastInt32AndMap["bool"] = "int32";
    UpcastInt32AndMap["complex64"] = "complex64";
})(UpcastInt32AndMap || (UpcastInt32AndMap = {}));
var UpcastBoolAndMap;
(function (UpcastBoolAndMap) {
    UpcastBoolAndMap["float32"] = "float32";
    UpcastBoolAndMap["int32"] = "int32";
    UpcastBoolAndMap["bool"] = "bool";
    UpcastBoolAndMap["complex64"] = "complex64";
})(UpcastBoolAndMap || (UpcastBoolAndMap = {}));
var UpcastFloat32AndMap;
(function (UpcastFloat32AndMap) {
    UpcastFloat32AndMap["float32"] = "float32";
    UpcastFloat32AndMap["int32"] = "float32";
    UpcastFloat32AndMap["bool"] = "float32";
    UpcastFloat32AndMap["complex64"] = "complex64";
})(UpcastFloat32AndMap || (UpcastFloat32AndMap = {}));
var UpcastComplex64AndMap;
(function (UpcastComplex64AndMap) {
    UpcastComplex64AndMap["float32"] = "complex64";
    UpcastComplex64AndMap["int32"] = "complex64";
    UpcastComplex64AndMap["bool"] = "complex64";
    UpcastComplex64AndMap["complex64"] = "complex64";
})(UpcastComplex64AndMap || (UpcastComplex64AndMap = {}));
const upcastTypeMap = {
    'float32': UpcastFloat32AndMap,
    'int32': UpcastInt32AndMap,
    'bool': UpcastBoolAndMap,
    'complex64': UpcastComplex64AndMap
};
export function upcastType(typeA, typeB) {
    if (typeA === 'string' || typeB === 'string') {
        if (typeA === 'string' && typeB === 'string') {
            return 'string';
        }
        throw new Error(`Can not upcast ${typeA} with ${typeB}`);
    }
    return upcastTypeMap[typeA][typeB];
}
/** Returns the output type after summation. */
export function sumOutType(type) {
    return upcastType(type, 'int32');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZmpzLWNvcmUvc3JjL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQWlESCxNQUFNLENBQU4sSUFBWSxJQVFYO0FBUkQsV0FBWSxJQUFJO0lBQ2QsaUJBQVMsQ0FBQTtJQUNULGlCQUFTLENBQUE7SUFDVCxpQkFBUyxDQUFBO0lBQ1QsaUJBQVMsQ0FBQTtJQUNULGlCQUFTLENBQUE7SUFDVCxpQkFBUyxDQUFBO0lBQ1QsaUJBQVMsQ0FBQTtBQUNYLENBQUMsRUFSVyxJQUFJLEtBQUosSUFBSSxRQVFmO0FBV0QsK0VBQStFO0FBQy9FLFVBQVU7QUFDVixJQUFLLGlCQUtKO0FBTEQsV0FBSyxpQkFBaUI7SUFDcEIsd0NBQXFCLENBQUE7SUFDckIsb0NBQWlCLENBQUE7SUFDakIsbUNBQWdCLENBQUE7SUFDaEIsNENBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUxJLGlCQUFpQixLQUFqQixpQkFBaUIsUUFLckI7QUFFRCxJQUFLLGdCQUtKO0FBTEQsV0FBSyxnQkFBZ0I7SUFDbkIsdUNBQXFCLENBQUE7SUFDckIsbUNBQWlCLENBQUE7SUFDakIsaUNBQWUsQ0FBQTtJQUNmLDJDQUF5QixDQUFBO0FBQzNCLENBQUMsRUFMSSxnQkFBZ0IsS0FBaEIsZ0JBQWdCLFFBS3BCO0FBRUQsSUFBSyxtQkFLSjtBQUxELFdBQUssbUJBQW1CO0lBQ3RCLDBDQUFxQixDQUFBO0lBQ3JCLHdDQUFtQixDQUFBO0lBQ25CLHVDQUFrQixDQUFBO0lBQ2xCLDhDQUF5QixDQUFBO0FBQzNCLENBQUMsRUFMSSxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBS3ZCO0FBRUQsSUFBSyxxQkFLSjtBQUxELFdBQUsscUJBQXFCO0lBQ3hCLDhDQUF1QixDQUFBO0lBQ3ZCLDRDQUFxQixDQUFBO0lBQ3JCLDJDQUFvQixDQUFBO0lBQ3BCLGdEQUF5QixDQUFBO0FBQzNCLENBQUMsRUFMSSxxQkFBcUIsS0FBckIscUJBQXFCLFFBS3pCO0FBRUQsTUFBTSxhQUFhLEdBQUc7SUFDcEIsU0FBUyxFQUFFLG1CQUFtQjtJQUM5QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsV0FBVyxFQUFFLHFCQUFxQjtDQUNuQyxDQUFDO0FBRUYsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFlLEVBQUUsS0FBZTtJQUN6RCxJQUFJLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM1QyxJQUFJLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM1QyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEtBQUssU0FBUyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELCtDQUErQztBQUMvQyxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQWM7SUFDdkMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKiBAZG9jYWxpYXMgbnVtYmVyW10gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcGVNYXAge1xuICBSMDogbnVtYmVyW107XG4gIFIxOiBbbnVtYmVyXTtcbiAgUjI6IFtudW1iZXIsIG51bWJlcl07XG4gIFIzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIFI0OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgUjU6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIFI2OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG59XG5cbi8qKiBAZG9jYWxpYXMgbnVtYmVyW10gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlNYXAge1xuICBSMDogbnVtYmVyO1xuICBSMTogbnVtYmVyW107XG4gIFIyOiBudW1iZXJbXVtdO1xuICBSMzogbnVtYmVyW11bXVtdO1xuICBSNDogbnVtYmVyW11bXVtdW107XG4gIFI1OiBudW1iZXJbXVtdW11bXVtdO1xuICBSNjogbnVtYmVyW11bXVtdW11bXVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFUeXBlTWFwIHtcbiAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xuICBpbnQzMjogSW50MzJBcnJheTtcbiAgYm9vbDogVWludDhBcnJheTtcbiAgY29tcGxleDY0OiBGbG9hdDMyQXJyYXk7XG4gIHN0cmluZzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2luZ2xlVmFsdWVNYXAge1xuICBib29sOiBib29sZWFuO1xuICBpbnQzMjogbnVtYmVyO1xuICBmbG9hdDMyOiBudW1iZXI7XG4gIGNvbXBsZXg2NDogbnVtYmVyO1xuICBzdHJpbmc6IHN0cmluZztcbn1cblxuLyoqIEBkb2NhbGlhcyAnZmxvYXQzMid8J2ludDMyJ3wnYm9vbCd8J2NvbXBsZXg2NCd8J3N0cmluZycgKi9cbmV4cG9ydCB0eXBlIERhdGFUeXBlID0ga2V5b2YgRGF0YVR5cGVNYXA7XG5leHBvcnQgdHlwZSBOdW1lcmljRGF0YVR5cGUgPSAnZmxvYXQzMid8J2ludDMyJ3wnYm9vbCd8J2NvbXBsZXg2NCc7XG5leHBvcnQgdHlwZSBUeXBlZEFycmF5ID0gRmxvYXQzMkFycmF5fEludDMyQXJyYXl8VWludDhBcnJheTtcbi8qKiBUZW5zb3IgZGF0YSB1c2VkIGluIHRlbnNvciBjcmVhdGlvbiBhbmQgdXNlci1mYWNpbmcgQVBJLiAqL1xuZXhwb3J0IHR5cGUgRGF0YVZhbHVlcyA9IERhdGFUeXBlTWFwW0RhdGFUeXBlXTtcbi8qKiBUaGUgdW5kZXJseWluZyB0ZW5zb3IgZGF0YSB0aGF0IGdldHMgc3RvcmVkIGluIGEgYmFja2VuZC4gKi9cbmV4cG9ydCB0eXBlIEJhY2tlbmRWYWx1ZXMgPSBGbG9hdDMyQXJyYXl8SW50MzJBcnJheXxVaW50OEFycmF5fFVpbnQ4QXJyYXlbXTtcblxuZXhwb3J0IGVudW0gUmFuayB7XG4gIFIwID0gJ1IwJyxcbiAgUjEgPSAnUjEnLFxuICBSMiA9ICdSMicsXG4gIFIzID0gJ1IzJyxcbiAgUjQgPSAnUjQnLFxuICBSNSA9ICdSNScsXG4gIFI2ID0gJ1I2J1xufVxuXG5leHBvcnQgdHlwZSBGbGF0VmVjdG9yID0gYm9vbGVhbltdfG51bWJlcltdfFR5cGVkQXJyYXk7XG5leHBvcnQgdHlwZSBSZWd1bGFyQXJyYXk8VD4gPVxuICAgIFRbXXxUW11bXXxUW11bXVtdfFRbXVtdW11bXXxUW11bXVtdW11bXXxUW11bXVtdW11bXVtdO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5leHBvcnQgaW50ZXJmYWNlIFJlY3Vyc2l2ZUFycmF5PFQgZXh0ZW5kcyBhbnk+IHtcbiAgW2luZGV4OiBudW1iZXJdOiBUfFJlY3Vyc2l2ZUFycmF5PFQ+O1xufVxuXG4vLyBMb29rcyBmb3IgdXBjYXN0aW5nIHR5cGVzLiBVc2VkLCBmb3IgZXhhbXBsZSwgaW4gb3BlcmF0aW9ucyB3aXRoIG1peGVkIGR0eXBlXG4vLyBpbnB1dHMuXG5lbnVtIFVwY2FzdEludDMyQW5kTWFwIHtcbiAgJ2Zsb2F0MzInID0gJ2Zsb2F0MzInLFxuICAnaW50MzInID0gJ2ludDMyJyxcbiAgJ2Jvb2wnID0gJ2ludDMyJyxcbiAgJ2NvbXBsZXg2NCcgPSAnY29tcGxleDY0J1xufVxuXG5lbnVtIFVwY2FzdEJvb2xBbmRNYXAge1xuICAnZmxvYXQzMicgPSAnZmxvYXQzMicsXG4gICdpbnQzMicgPSAnaW50MzInLFxuICAnYm9vbCcgPSAnYm9vbCcsXG4gICdjb21wbGV4NjQnID0gJ2NvbXBsZXg2NCdcbn1cblxuZW51bSBVcGNhc3RGbG9hdDMyQW5kTWFwIHtcbiAgJ2Zsb2F0MzInID0gJ2Zsb2F0MzInLFxuICAnaW50MzInID0gJ2Zsb2F0MzInLFxuICAnYm9vbCcgPSAnZmxvYXQzMicsXG4gICdjb21wbGV4NjQnID0gJ2NvbXBsZXg2NCdcbn1cblxuZW51bSBVcGNhc3RDb21wbGV4NjRBbmRNYXAge1xuICAnZmxvYXQzMicgPSAnY29tcGxleDY0JyxcbiAgJ2ludDMyJyA9ICdjb21wbGV4NjQnLFxuICAnYm9vbCcgPSAnY29tcGxleDY0JyxcbiAgJ2NvbXBsZXg2NCcgPSAnY29tcGxleDY0J1xufVxuXG5jb25zdCB1cGNhc3RUeXBlTWFwID0ge1xuICAnZmxvYXQzMic6IFVwY2FzdEZsb2F0MzJBbmRNYXAsXG4gICdpbnQzMic6IFVwY2FzdEludDMyQW5kTWFwLFxuICAnYm9vbCc6IFVwY2FzdEJvb2xBbmRNYXAsXG4gICdjb21wbGV4NjQnOiBVcGNhc3RDb21wbGV4NjRBbmRNYXBcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGNhc3RUeXBlKHR5cGVBOiBEYXRhVHlwZSwgdHlwZUI6IERhdGFUeXBlKTogRGF0YVR5cGUge1xuICBpZiAodHlwZUEgPT09ICdzdHJpbmcnIHx8IHR5cGVCID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlQSA9PT0gJ3N0cmluZycgJiYgdHlwZUIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCB1cGNhc3QgJHt0eXBlQX0gd2l0aCAke3R5cGVCfWApO1xuICB9XG4gIHJldHVybiB1cGNhc3RUeXBlTWFwW3R5cGVBXVt0eXBlQl07XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBvdXRwdXQgdHlwZSBhZnRlciBzdW1tYXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gc3VtT3V0VHlwZSh0eXBlOiBEYXRhVHlwZSk6IERhdGFUeXBlIHtcbiAgcmV0dXJuIHVwY2FzdFR5cGUodHlwZSwgJ2ludDMyJyk7XG59XG5cbi8qKiBAZG9jYWxpYXMgVHlwZWRBcnJheXxBcnJheSAqL1xuZXhwb3J0IHR5cGUgVGVuc29yTGlrZSA9XG4gICAgVHlwZWRBcnJheXxudW1iZXJ8Ym9vbGVhbnxzdHJpbmd8UmVjdXJzaXZlQXJyYXk8bnVtYmVyfG51bWJlcltdfFR5cGVkQXJyYXk+fFxuICAgIFJlY3Vyc2l2ZUFycmF5PGJvb2xlYW4+fFJlY3Vyc2l2ZUFycmF5PHN0cmluZz58VWludDhBcnJheVtdO1xuZXhwb3J0IHR5cGUgU2NhbGFyTGlrZSA9IG51bWJlcnxib29sZWFufHN0cmluZ3xVaW50OEFycmF5O1xuLyoqIEBkb2NhbGlhcyBUeXBlZEFycmF5fEFycmF5ICovXG5leHBvcnQgdHlwZSBUZW5zb3JMaWtlMUQgPSBUeXBlZEFycmF5fG51bWJlcltdfGJvb2xlYW5bXXxzdHJpbmdbXXxVaW50OEFycmF5W107XG4vKiogQGRvY2FsaWFzIFR5cGVkQXJyYXl8QXJyYXkgKi9cbmV4cG9ydCB0eXBlIFRlbnNvckxpa2UyRCA9IFR5cGVkQXJyYXl8bnVtYmVyW118bnVtYmVyW11bXXxib29sZWFuW118Ym9vbGVhbltdW118XG4gICAgc3RyaW5nW118c3RyaW5nW11bXXxVaW50OEFycmF5W118VWludDhBcnJheVtdW107XG4vKiogQGRvY2FsaWFzIFR5cGVkQXJyYXl8QXJyYXkgKi9cbmV4cG9ydCB0eXBlIFRlbnNvckxpa2UzRCA9IFR5cGVkQXJyYXl8bnVtYmVyW118bnVtYmVyW11bXVtdfGJvb2xlYW5bXXxcbiAgICBib29sZWFuW11bXVtdfHN0cmluZ1tdfHN0cmluZ1tdW11bXXxVaW50OEFycmF5W118VWludDhBcnJheVtdW11bXTtcbi8qKiBAZG9jYWxpYXMgVHlwZWRBcnJheXxBcnJheSAqL1xuZXhwb3J0IHR5cGUgVGVuc29yTGlrZTREID0gVHlwZWRBcnJheXxudW1iZXJbXXxudW1iZXJbXVtdW11bXXxib29sZWFuW118XG4gICAgYm9vbGVhbltdW11bXVtdfHN0cmluZ1tdfHN0cmluZ1tdW11bXVtdfFVpbnQ4QXJyYXlbXXxVaW50OEFycmF5W11bXVtdW107XG4vKiogQGRvY2FsaWFzIFR5cGVkQXJyYXl8QXJyYXkgKi9cbmV4cG9ydCB0eXBlIFRlbnNvckxpa2U1RCA9XG4gICAgVHlwZWRBcnJheXxudW1iZXJbXXxudW1iZXJbXVtdW11bXVtdfGJvb2xlYW5bXXxib29sZWFuW11bXVtdW11bXXxzdHJpbmdbXXxcbiAgICBzdHJpbmdbXVtdW11bXVtdfFVpbnQ4QXJyYXlbXXxVaW50OEFycmF5W11bXVtdW11bXTtcbi8qKiBAZG9jYWxpYXMgVHlwZWRBcnJheXxBcnJheSAqL1xuZXhwb3J0IHR5cGUgVGVuc29yTGlrZTZEID1cbiAgICBUeXBlZEFycmF5fG51bWJlcltdfG51bWJlcltdW11bXVtdW11bXXxib29sZWFuW118Ym9vbGVhbltdW11bXVtdW11bXXxcbiAgICBzdHJpbmdbXXxzdHJpbmdbXVtdW11bXVtdW118VWludDhBcnJheVtdfFVpbnQ4QXJyYXlbXVtdW11bXVtdO1xuXG4vKiogVHlwZSBmb3IgcmVwcmVzZW50aW5nIGltYWdlIGRhdGEgaW4gVWludDhBcnJheSB0eXBlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBQaXhlbERhdGEge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgZGF0YTogVWludDhBcnJheTtcbn1cbiJdfQ==