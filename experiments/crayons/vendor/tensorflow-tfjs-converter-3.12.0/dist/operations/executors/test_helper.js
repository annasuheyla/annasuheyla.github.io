export function createNumberAttr(value) {
    return { value, type: 'number' };
}
export function createNumberAttrFromIndex(inputIndex) {
    return { inputIndexStart: inputIndex, type: 'number' };
}
export function createStrAttr(str) {
    return { value: str, type: 'string' };
}
export function createStrArrayAttr(strs) {
    return { value: strs, type: 'string[]' };
}
export function createBoolAttr(value) {
    return { value, type: 'bool' };
}
export function createTensorShapeAttr(value) {
    return { value, type: 'shape' };
}
export function createShapeAttrFromIndex(inputIndex) {
    return { inputIndexStart: inputIndex, type: 'shape' };
}
export function createNumericArrayAttr(value) {
    return { value, type: 'number[]' };
}
export function createNumericArrayAttrFromIndex(inputIndex) {
    return { inputIndexStart: inputIndex, type: 'number[]' };
}
export function createBooleanArrayAttrFromIndex(inputIndex) {
    return { inputIndexStart: inputIndex, type: 'bool[]' };
}
export function createTensorAttr(index) {
    return { inputIndexStart: index, type: 'tensor' };
}
export function createTensorsAttr(index, paramLength) {
    return { inputIndexStart: index, inputIndexEnd: paramLength, type: 'tensors' };
}
export function createDtypeAttr(dtype) {
    return { value: dtype, type: 'dtype' };
}
export function validateParam(node, opMappers, tfOpName) {
    const opMapper = tfOpName != null ?
        opMappers.find(mapper => mapper.tfOpName === tfOpName) :
        opMappers.find(mapper => mapper.tfOpName === node.op);
    const matched = Object.keys(node.inputParams).every(key => {
        const value = node.inputParams[key];
        const def = opMapper.inputs.find(param => param.name === key);
        return def && def.type === value.type &&
            def.start === value.inputIndexStart && def.end === value.inputIndexEnd;
    }) &&
        Object.keys(node.attrParams).every(key => {
            const value = node.attrParams[key];
            const def = opMapper.attrs.find(param => param.name === key);
            return def && def.type === value.type;
        });
    if (!matched) {
        console.log('node = ', node);
        console.log('opMapper = ', opMapper);
    }
    return matched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvbnZlcnRlci9zcmMvb3BlcmF0aW9ucy9leGVjdXRvcnMvdGVzdF9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFhO0lBQzVDLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsVUFBa0I7SUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEdBQVc7SUFDdkMsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBYztJQUMvQyxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBYztJQUMzQyxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQWU7SUFDbkQsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxVQUFrQjtJQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxLQUFlO0lBQ3BELE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxNQUFNLFVBQVUsK0JBQStCLENBQUMsVUFBa0I7SUFFaEUsT0FBTyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLFVBQVUsK0JBQStCLENBQUMsVUFBa0I7SUFFaEUsT0FBTyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBYTtJQUM1QyxPQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsS0FBYSxFQUFFLFdBQW1CO0lBQ3BDLE9BQU8sRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQWE7SUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUN6QixJQUFVLEVBQUUsU0FBcUIsRUFBRSxRQUFpQjtJQUN0RCxNQUFNLFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7UUFDL0IsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4RCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzlELE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUk7WUFDakMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsZUFBZSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQztJQUM3RSxDQUFDLENBQUM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDN0QsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cbmltcG9ydCB7SW5wdXRQYXJhbVZhbHVlLCBPcE1hcHBlciwgUGFyYW1WYWx1ZX0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtOb2RlfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOdW1iZXJBdHRyKHZhbHVlOiBudW1iZXIpOiBQYXJhbVZhbHVlIHtcbiAgcmV0dXJuIHt2YWx1ZSwgdHlwZTogJ251bWJlcid9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTnVtYmVyQXR0ckZyb21JbmRleChpbnB1dEluZGV4OiBudW1iZXIpOiBJbnB1dFBhcmFtVmFsdWUge1xuICByZXR1cm4ge2lucHV0SW5kZXhTdGFydDogaW5wdXRJbmRleCwgdHlwZTogJ251bWJlcid9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyQXR0cihzdHI6IHN0cmluZyk6IFBhcmFtVmFsdWUge1xuICByZXR1cm4ge3ZhbHVlOiBzdHIsIHR5cGU6ICdzdHJpbmcnfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0ckFycmF5QXR0cihzdHJzOiBzdHJpbmdbXSk6IFBhcmFtVmFsdWUge1xuICByZXR1cm4ge3ZhbHVlOiBzdHJzLCB0eXBlOiAnc3RyaW5nW10nfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvb2xBdHRyKHZhbHVlOiBib29sZWFuKTogUGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7dmFsdWUsIHR5cGU6ICdib29sJ307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZW5zb3JTaGFwZUF0dHIodmFsdWU6IG51bWJlcltdKTogUGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7dmFsdWUsIHR5cGU6ICdzaGFwZSd9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhcGVBdHRyRnJvbUluZGV4KGlucHV0SW5kZXg6IG51bWJlcik6IElucHV0UGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7aW5wdXRJbmRleFN0YXJ0OiBpbnB1dEluZGV4LCB0eXBlOiAnc2hhcGUnfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU51bWVyaWNBcnJheUF0dHIodmFsdWU6IG51bWJlcltdKTogUGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7dmFsdWUsIHR5cGU6ICdudW1iZXJbXSd9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTnVtZXJpY0FycmF5QXR0ckZyb21JbmRleChpbnB1dEluZGV4OiBudW1iZXIpOlxuICAgIElucHV0UGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7aW5wdXRJbmRleFN0YXJ0OiBpbnB1dEluZGV4LCB0eXBlOiAnbnVtYmVyW10nfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvb2xlYW5BcnJheUF0dHJGcm9tSW5kZXgoaW5wdXRJbmRleDogbnVtYmVyKTpcbiAgICBJbnB1dFBhcmFtVmFsdWUge1xuICByZXR1cm4ge2lucHV0SW5kZXhTdGFydDogaW5wdXRJbmRleCwgdHlwZTogJ2Jvb2xbXSd9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVuc29yQXR0cihpbmRleDogbnVtYmVyKTogSW5wdXRQYXJhbVZhbHVlIHtcbiAgcmV0dXJuIHtpbnB1dEluZGV4U3RhcnQ6IGluZGV4LCB0eXBlOiAndGVuc29yJ307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZW5zb3JzQXR0cihcbiAgICBpbmRleDogbnVtYmVyLCBwYXJhbUxlbmd0aDogbnVtYmVyKTogSW5wdXRQYXJhbVZhbHVlIHtcbiAgcmV0dXJuIHtpbnB1dEluZGV4U3RhcnQ6IGluZGV4LCBpbnB1dEluZGV4RW5kOiBwYXJhbUxlbmd0aCwgdHlwZTogJ3RlbnNvcnMnfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUR0eXBlQXR0cihkdHlwZTogc3RyaW5nKTogUGFyYW1WYWx1ZSB7XG4gIHJldHVybiB7dmFsdWU6IGR0eXBlLCB0eXBlOiAnZHR5cGUnfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGFyYW0oXG4gICAgbm9kZTogTm9kZSwgb3BNYXBwZXJzOiBPcE1hcHBlcltdLCB0Zk9wTmFtZT86IHN0cmluZykge1xuICBjb25zdCBvcE1hcHBlciA9IHRmT3BOYW1lICE9IG51bGwgP1xuICAgICAgb3BNYXBwZXJzLmZpbmQobWFwcGVyID0+IG1hcHBlci50Zk9wTmFtZSA9PT0gdGZPcE5hbWUpIDpcbiAgICAgIG9wTWFwcGVycy5maW5kKG1hcHBlciA9PiBtYXBwZXIudGZPcE5hbWUgPT09IG5vZGUub3ApO1xuICBjb25zdCBtYXRjaGVkID0gT2JqZWN0LmtleXMobm9kZS5pbnB1dFBhcmFtcykuZXZlcnkoa2V5ID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IG5vZGUuaW5wdXRQYXJhbXNba2V5XTtcbiAgICBjb25zdCBkZWYgPSBvcE1hcHBlci5pbnB1dHMuZmluZChwYXJhbSA9PiBwYXJhbS5uYW1lID09PSBrZXkpO1xuICAgIHJldHVybiBkZWYgJiYgZGVmLnR5cGUgPT09IHZhbHVlLnR5cGUgJiZcbiAgICAgICAgZGVmLnN0YXJ0ID09PSB2YWx1ZS5pbnB1dEluZGV4U3RhcnQgJiYgZGVmLmVuZCA9PT0gdmFsdWUuaW5wdXRJbmRleEVuZDtcbiAgfSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKG5vZGUuYXR0clBhcmFtcykuZXZlcnkoa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBub2RlLmF0dHJQYXJhbXNba2V5XTtcbiAgICAgICAgY29uc3QgZGVmID0gb3BNYXBwZXIuYXR0cnMuZmluZChwYXJhbSA9PiBwYXJhbS5uYW1lID09PSBrZXkpO1xuICAgICAgICByZXR1cm4gZGVmICYmIGRlZi50eXBlID09PSB2YWx1ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghbWF0Y2hlZCkge1xuICAgIGNvbnNvbGUubG9nKCdub2RlID0gJywgbm9kZSk7XG4gICAgY29uc29sZS5sb2coJ29wTWFwcGVyID0gJywgb3BNYXBwZXIpO1xuICB9XG4gIHJldHVybiBtYXRjaGVkO1xufVxuIl19