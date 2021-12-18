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
import { clone, util } from '@tensorflow/tfjs-core';
export function getParamValue(paramName, node, tensorMap, context, resourceManager) {
    const inputParam = node.inputParams[paramName];
    if (inputParam && inputParam.inputIndexStart !== undefined) {
        const start = inputParam.inputIndexStart;
        const end = inputParam.inputIndexEnd === 0 ?
            undefined :
            (inputParam.inputIndexEnd === undefined ? start + 1 :
                inputParam.inputIndexEnd);
        if (inputParam.type === 'tensor') {
            return getTensor(node.inputNames[inputParam.inputIndexStart], tensorMap, context, resourceManager);
        }
        if (inputParam.type === 'tensors') {
            const inputs = node.inputNames.slice(start, end);
            return inputs.map(name => getTensor(name, tensorMap, context, resourceManager));
        }
        const tensor = getTensor(node.inputNames.slice(start)[0], tensorMap, context, resourceManager);
        const data = tensor.dataSync();
        return inputParam.type === 'number' ?
            data[0] :
            util.toNestedArray(tensor.shape, data);
    }
    const attrParam = node.attrParams[paramName];
    return attrParam && attrParam.value;
}
/**
 * Retrieve the tensor from tensorsMap based on input name.
 * @param name Node input name
 * @param tensorsMap Tensors map keyed by the node
 * @param context contains tensors and information for running the current node.
 * @param resourceManager Optional. Contains global resources of the model.
 */
export function getTensor(name, tensorsMap, context, resourceManager) {
    const [nodeName, index] = parseNodeName(name);
    if (resourceManager != null) {
        const tensor = resourceManager.getHashTableHandleByName(nodeName);
        if (tensor != null) {
            return tensor;
        }
    }
    const contextId = context.currentContextIds.find(contextId => {
        return !!tensorsMap[getNodeNameWithContextId(nodeName, contextId)];
    });
    return contextId !== undefined ?
        tensorsMap[getNodeNameWithContextId(nodeName, contextId)][index] :
        undefined;
}
/**
 * Retrieve the tensors based on input name for current context.
 * @param name Node input name
 * @param tensorsMap Tensors map keyed by the node
 */
export function getTensorsForCurrentContenxt(name, tensorsMap, context) {
    return tensorsMap[getNodeNameWithContextId(name, context.currentContextId)];
}
/**
 * Returns the node name, outputName and index from the Node input name.
 * @param inputName The input name of the node, in format of
 * node_name:output_index, i.e. MatMul:0, if the output_index is not set, it is
 * default to 0.
 * If the input name contains output name i.e. StringSplit:indices:0, it will
 * return ['StringSplit', 0, 'indices'].
 */
export function getNodeNameAndIndex(inputName, context) {
    const [nodeName, index, outputName] = parseNodeName(inputName);
    return [
        getNodeNameWithContextId(nodeName, context && context.currentContextId),
        index, outputName
    ];
}
function getNodeNameWithContextId(name, contextId) {
    return !!contextId ? `${name}-${contextId}` : name;
}
export function parseNodeName(name) {
    const parts = name.split(':');
    if (parts.length === 1) {
        return [name, 0, undefined];
    }
    const nodeName = parts[0];
    const outputName = parts.length === 3 ? parts[1] : undefined;
    const index = Number(parts[parts.length - 1]);
    return [nodeName, index, outputName];
}
export function split(arr, size) {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}
export function getPadding(node, tensorMap, context) {
    let pad = getParamValue('pad', node, tensorMap, context);
    if (pad === 'explicit') {
        // This is 1d array, we need to convert it to 2d array
        pad = getParamValue('explicitPaddings', node, tensorMap, context);
        const explicitPadding = [[0, 0], [0, 0], [0, 0], [0, 0]];
        for (let i = 0; i < 4; i++) {
            explicitPadding[i][0] = pad[i * 2];
            explicitPadding[i][1] = pad[i * 2 + 1];
        }
        return explicitPadding;
    }
    return pad;
}
/**
 *  Reuse the tensor if it is marked as keep, otherwise clone the tensor to
 *  avoid disposal. This is important for TensorArray and TensorList ops, since
 *  internally they use a tensor as the id for TensorArray and TensorList, and
 * to simplify lookup, they also use Tensor.id as the key to the internal map.
 * These id tensors have been marked as kept in the backend, we need avoid clone
 * them in order to create new Tensor.id.
 * @param tensor
 */
export function cloneTensor(tensor) {
    return tensor.kept ? tensor : clone(tensor);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvbnZlcnRlci9zcmMvb3BlcmF0aW9ucy9leGVjdXRvcnMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLEtBQUssRUFBVSxJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQU8xRCxNQUFNLFVBQVUsYUFBYSxDQUN6QixTQUFpQixFQUFFLElBQVUsRUFBRSxTQUEwQixFQUN6RCxPQUF5QixFQUFFLGVBQWlDO0lBQzlELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7UUFDMUQsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUN6QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxVQUFVLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE9BQU8sU0FBUyxDQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQy9ELGVBQWUsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFakQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7U0FDbkU7UUFDRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLE9BQU8sVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QztJQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQztBQUN0QyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FDckIsSUFBWSxFQUFFLFVBQTJCLEVBQUUsT0FBeUIsRUFDcEUsZUFBaUM7SUFDbkMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUMsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO1FBQzNCLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBRUQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzRCxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUM1QixVQUFVLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsRSxTQUFTLENBQUM7QUFDaEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQ3hDLElBQVksRUFBRSxVQUEyQixFQUN6QyxPQUF5QjtJQUMzQixPQUFPLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsU0FBaUIsRUFBRSxPQUEwQjtJQUMvQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFL0QsT0FBTztRQUNMLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQ3ZFLEtBQUssRUFBRSxVQUFVO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsU0FBa0I7SUFDaEUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVk7SUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM3RCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUssQ0FBQyxHQUFhLEVBQUUsSUFBWTtJQUMvQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ3pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbEM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxNQUFNLFVBQVUsVUFBVSxDQUN0QixJQUFVLEVBQUUsU0FBMEIsRUFDdEMsT0FBeUI7SUFDM0IsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtRQUN0QixzREFBc0Q7UUFDdEQsR0FBRyxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sZUFBZSxHQUVqQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUksR0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFJLEdBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUNELE9BQU8sZUFBZSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQWM7SUFDeEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge2Nsb25lLCBUZW5zb3IsIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TmFtZWRUZW5zb3JzTWFwfSBmcm9tICcuLi8uLi9kYXRhL3R5cGVzJztcbmltcG9ydCB7RXhlY3V0aW9uQ29udGV4dH0gZnJvbSAnLi4vLi4vZXhlY3V0b3IvZXhlY3V0aW9uX2NvbnRleHQnO1xuaW1wb3J0IHtSZXNvdXJjZU1hbmFnZXJ9IGZyb20gJy4uLy4uL2V4ZWN1dG9yL3Jlc291cmNlX21hbmFnZXInO1xuaW1wb3J0IHtOb2RlLCBWYWx1ZVR5cGV9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmFtVmFsdWUoXG4gICAgcGFyYW1OYW1lOiBzdHJpbmcsIG5vZGU6IE5vZGUsIHRlbnNvck1hcDogTmFtZWRUZW5zb3JzTWFwLFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsIHJlc291cmNlTWFuYWdlcj86IFJlc291cmNlTWFuYWdlcik6IFZhbHVlVHlwZSB7XG4gIGNvbnN0IGlucHV0UGFyYW0gPSBub2RlLmlucHV0UGFyYW1zW3BhcmFtTmFtZV07XG4gIGlmIChpbnB1dFBhcmFtICYmIGlucHV0UGFyYW0uaW5wdXRJbmRleFN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBzdGFydCA9IGlucHV0UGFyYW0uaW5wdXRJbmRleFN0YXJ0O1xuICAgIGNvbnN0IGVuZCA9IGlucHV0UGFyYW0uaW5wdXRJbmRleEVuZCA9PT0gMCA/XG4gICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgIChpbnB1dFBhcmFtLmlucHV0SW5kZXhFbmQgPT09IHVuZGVmaW5lZCA/IHN0YXJ0ICsgMSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UGFyYW0uaW5wdXRJbmRleEVuZCk7XG4gICAgaWYgKGlucHV0UGFyYW0udHlwZSA9PT0gJ3RlbnNvcicpIHtcbiAgICAgIHJldHVybiBnZXRUZW5zb3IoXG4gICAgICAgICAgbm9kZS5pbnB1dE5hbWVzW2lucHV0UGFyYW0uaW5wdXRJbmRleFN0YXJ0XSwgdGVuc29yTWFwLCBjb250ZXh0LFxuICAgICAgICAgIHJlc291cmNlTWFuYWdlcik7XG4gICAgfVxuICAgIGlmIChpbnB1dFBhcmFtLnR5cGUgPT09ICd0ZW5zb3JzJykge1xuICAgICAgY29uc3QgaW5wdXRzID0gbm9kZS5pbnB1dE5hbWVzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgICByZXR1cm4gaW5wdXRzLm1hcChcbiAgICAgICAgICBuYW1lID0+IGdldFRlbnNvcihuYW1lLCB0ZW5zb3JNYXAsIGNvbnRleHQsIHJlc291cmNlTWFuYWdlcikpO1xuICAgIH1cbiAgICBjb25zdCB0ZW5zb3IgPSBnZXRUZW5zb3IoXG4gICAgICAgIG5vZGUuaW5wdXROYW1lcy5zbGljZShzdGFydClbMF0sIHRlbnNvck1hcCwgY29udGV4dCwgcmVzb3VyY2VNYW5hZ2VyKTtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yLmRhdGFTeW5jKCk7XG4gICAgcmV0dXJuIGlucHV0UGFyYW0udHlwZSA9PT0gJ251bWJlcicgP1xuICAgICAgICBkYXRhWzBdIDpcbiAgICAgICAgdXRpbC50b05lc3RlZEFycmF5KHRlbnNvci5zaGFwZSwgZGF0YSk7XG4gIH1cbiAgY29uc3QgYXR0clBhcmFtID0gbm9kZS5hdHRyUGFyYW1zW3BhcmFtTmFtZV07XG4gIHJldHVybiBhdHRyUGFyYW0gJiYgYXR0clBhcmFtLnZhbHVlO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSB0ZW5zb3IgZnJvbSB0ZW5zb3JzTWFwIGJhc2VkIG9uIGlucHV0IG5hbWUuXG4gKiBAcGFyYW0gbmFtZSBOb2RlIGlucHV0IG5hbWVcbiAqIEBwYXJhbSB0ZW5zb3JzTWFwIFRlbnNvcnMgbWFwIGtleWVkIGJ5IHRoZSBub2RlXG4gKiBAcGFyYW0gY29udGV4dCBjb250YWlucyB0ZW5zb3JzIGFuZCBpbmZvcm1hdGlvbiBmb3IgcnVubmluZyB0aGUgY3VycmVudCBub2RlLlxuICogQHBhcmFtIHJlc291cmNlTWFuYWdlciBPcHRpb25hbC4gQ29udGFpbnMgZ2xvYmFsIHJlc291cmNlcyBvZiB0aGUgbW9kZWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZW5zb3IoXG4gICAgbmFtZTogc3RyaW5nLCB0ZW5zb3JzTWFwOiBOYW1lZFRlbnNvcnNNYXAsIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQsXG4gICAgcmVzb3VyY2VNYW5hZ2VyPzogUmVzb3VyY2VNYW5hZ2VyKTogVGVuc29yIHtcbiAgY29uc3QgW25vZGVOYW1lLCBpbmRleF0gPSBwYXJzZU5vZGVOYW1lKG5hbWUpO1xuXG4gIGlmIChyZXNvdXJjZU1hbmFnZXIgIT0gbnVsbCkge1xuICAgIGNvbnN0IHRlbnNvciA9IHJlc291cmNlTWFuYWdlci5nZXRIYXNoVGFibGVIYW5kbGVCeU5hbWUobm9kZU5hbWUpO1xuICAgIGlmICh0ZW5zb3IgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRlbnNvcjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb250ZXh0SWQgPSBjb250ZXh0LmN1cnJlbnRDb250ZXh0SWRzLmZpbmQoY29udGV4dElkID0+IHtcbiAgICByZXR1cm4gISF0ZW5zb3JzTWFwW2dldE5vZGVOYW1lV2l0aENvbnRleHRJZChub2RlTmFtZSwgY29udGV4dElkKV07XG4gIH0pO1xuXG4gIHJldHVybiBjb250ZXh0SWQgIT09IHVuZGVmaW5lZCA/XG4gICAgICB0ZW5zb3JzTWFwW2dldE5vZGVOYW1lV2l0aENvbnRleHRJZChub2RlTmFtZSwgY29udGV4dElkKV1baW5kZXhdIDpcbiAgICAgIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgdGVuc29ycyBiYXNlZCBvbiBpbnB1dCBuYW1lIGZvciBjdXJyZW50IGNvbnRleHQuXG4gKiBAcGFyYW0gbmFtZSBOb2RlIGlucHV0IG5hbWVcbiAqIEBwYXJhbSB0ZW5zb3JzTWFwIFRlbnNvcnMgbWFwIGtleWVkIGJ5IHRoZSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZW5zb3JzRm9yQ3VycmVudENvbnRlbnh0KFxuICAgIG5hbWU6IHN0cmluZywgdGVuc29yc01hcDogTmFtZWRUZW5zb3JzTWFwLFxuICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBUZW5zb3JbXSB7XG4gIHJldHVybiB0ZW5zb3JzTWFwW2dldE5vZGVOYW1lV2l0aENvbnRleHRJZChuYW1lLCBjb250ZXh0LmN1cnJlbnRDb250ZXh0SWQpXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBub2RlIG5hbWUsIG91dHB1dE5hbWUgYW5kIGluZGV4IGZyb20gdGhlIE5vZGUgaW5wdXQgbmFtZS5cbiAqIEBwYXJhbSBpbnB1dE5hbWUgVGhlIGlucHV0IG5hbWUgb2YgdGhlIG5vZGUsIGluIGZvcm1hdCBvZlxuICogbm9kZV9uYW1lOm91dHB1dF9pbmRleCwgaS5lLiBNYXRNdWw6MCwgaWYgdGhlIG91dHB1dF9pbmRleCBpcyBub3Qgc2V0LCBpdCBpc1xuICogZGVmYXVsdCB0byAwLlxuICogSWYgdGhlIGlucHV0IG5hbWUgY29udGFpbnMgb3V0cHV0IG5hbWUgaS5lLiBTdHJpbmdTcGxpdDppbmRpY2VzOjAsIGl0IHdpbGxcbiAqIHJldHVybiBbJ1N0cmluZ1NwbGl0JywgMCwgJ2luZGljZXMnXS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVOYW1lQW5kSW5kZXgoXG4gICAgaW5wdXROYW1lOiBzdHJpbmcsIGNvbnRleHQ/OiBFeGVjdXRpb25Db250ZXh0KTogW3N0cmluZywgbnVtYmVyLCBzdHJpbmddIHtcbiAgY29uc3QgW25vZGVOYW1lLCBpbmRleCwgb3V0cHV0TmFtZV0gPSBwYXJzZU5vZGVOYW1lKGlucHV0TmFtZSk7XG5cbiAgcmV0dXJuIFtcbiAgICBnZXROb2RlTmFtZVdpdGhDb250ZXh0SWQobm9kZU5hbWUsIGNvbnRleHQgJiYgY29udGV4dC5jdXJyZW50Q29udGV4dElkKSxcbiAgICBpbmRleCwgb3V0cHV0TmFtZVxuICBdO1xufVxuXG5mdW5jdGlvbiBnZXROb2RlTmFtZVdpdGhDb250ZXh0SWQobmFtZTogc3RyaW5nLCBjb250ZXh0SWQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gISFjb250ZXh0SWQgPyBgJHtuYW1lfS0ke2NvbnRleHRJZH1gIDogbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTm9kZU5hbWUobmFtZTogc3RyaW5nKTogW3N0cmluZywgbnVtYmVyLCBzdHJpbmddIHtcbiAgY29uc3QgcGFydHMgPSBuYW1lLnNwbGl0KCc6Jyk7XG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gW25hbWUsIDAsIHVuZGVmaW5lZF07XG4gIH1cblxuICBjb25zdCBub2RlTmFtZSA9IHBhcnRzWzBdO1xuICBjb25zdCBvdXRwdXROYW1lID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFydHNbMV0gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGluZGV4ID0gTnVtYmVyKHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKTtcbiAgcmV0dXJuIFtub2RlTmFtZSwgaW5kZXgsIG91dHB1dE5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXQoYXJyOiBudW1iZXJbXSwgc2l6ZTogbnVtYmVyKSB7XG4gIGNvbnN0IHJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gc2l6ZSkge1xuICAgIHJlcy5wdXNoKGFyci5zbGljZShpLCBpICsgc2l6ZSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFkZGluZyhcbiAgICBub2RlOiBOb2RlLCB0ZW5zb3JNYXA6IE5hbWVkVGVuc29yc01hcCxcbiAgICBjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogVmFsdWVUeXBlIHtcbiAgbGV0IHBhZCA9IGdldFBhcmFtVmFsdWUoJ3BhZCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCk7XG4gIGlmIChwYWQgPT09ICdleHBsaWNpdCcpIHtcbiAgICAvLyBUaGlzIGlzIDFkIGFycmF5LCB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgdG8gMmQgYXJyYXlcbiAgICBwYWQgPSBnZXRQYXJhbVZhbHVlKCdleHBsaWNpdFBhZGRpbmdzJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KTtcbiAgICBjb25zdCBleHBsaWNpdFBhZGRpbmc6IFtcbiAgICAgIFtudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1cbiAgICBdID0gW1swLCAwXSwgWzAsIDBdLCBbMCwgMF0sIFswLCAwXV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGV4cGxpY2l0UGFkZGluZ1tpXVswXSA9IChwYWQgYXMgbnVtYmVyW10pW2kgKiAyXTtcbiAgICAgIGV4cGxpY2l0UGFkZGluZ1tpXVsxXSA9IChwYWQgYXMgbnVtYmVyW10pW2kgKiAyICsgMV07XG4gICAgfVxuICAgIHJldHVybiBleHBsaWNpdFBhZGRpbmc7XG4gIH1cbiAgcmV0dXJuIHBhZDtcbn1cblxuLyoqXG4gKiAgUmV1c2UgdGhlIHRlbnNvciBpZiBpdCBpcyBtYXJrZWQgYXMga2VlcCwgb3RoZXJ3aXNlIGNsb25lIHRoZSB0ZW5zb3IgdG9cbiAqICBhdm9pZCBkaXNwb3NhbC4gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFRlbnNvckFycmF5IGFuZCBUZW5zb3JMaXN0IG9wcywgc2luY2VcbiAqICBpbnRlcm5hbGx5IHRoZXkgdXNlIGEgdGVuc29yIGFzIHRoZSBpZCBmb3IgVGVuc29yQXJyYXkgYW5kIFRlbnNvckxpc3QsIGFuZFxuICogdG8gc2ltcGxpZnkgbG9va3VwLCB0aGV5IGFsc28gdXNlIFRlbnNvci5pZCBhcyB0aGUga2V5IHRvIHRoZSBpbnRlcm5hbCBtYXAuXG4gKiBUaGVzZSBpZCB0ZW5zb3JzIGhhdmUgYmVlbiBtYXJrZWQgYXMga2VwdCBpbiB0aGUgYmFja2VuZCwgd2UgbmVlZCBhdm9pZCBjbG9uZVxuICogdGhlbSBpbiBvcmRlciB0byBjcmVhdGUgbmV3IFRlbnNvci5pZC5cbiAqIEBwYXJhbSB0ZW5zb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVGVuc29yKHRlbnNvcjogVGVuc29yKTogVGVuc29yIHtcbiAgcmV0dXJuIHRlbnNvci5rZXB0ID8gdGVuc29yIDogY2xvbmUodGVuc29yKTtcbn1cbiJdfQ==