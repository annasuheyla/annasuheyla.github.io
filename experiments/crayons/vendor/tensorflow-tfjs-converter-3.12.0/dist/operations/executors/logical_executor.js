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
// tslint:disable-next-line: no-imports-from-dist
import * as tfOps from '@tensorflow/tfjs-core/dist/ops/ops_for_converter';
import { getParamValue } from './utils';
export const executeOp = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Equal': {
            return [tfOps.equal(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'NotEqual': {
            return [tfOps.notEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Greater': {
            return [tfOps.greater(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'GreaterEqual': {
            return [tfOps.greaterEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Less': {
            return [tfOps.less(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LessEqual': {
            return [tfOps.lessEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalAnd': {
            return [tfOps.logicalAnd(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalNot': {
            return [tfOps.logicalNot(getParamValue('a', node, tensorMap, context))];
        }
        case 'LogicalOr': {
            return [tfOps.logicalOr(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Select':
        case 'SelectV2': {
            return [tfOps.where(getParamValue('condition', node, tensorMap, context), getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};
export const CATEGORY = 'logical';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbF9leGVjdXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29udmVydGVyL3NyYy9vcGVyYXRpb25zL2V4ZWN1dG9ycy9sb2dpY2FsX2V4ZWN1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUdILGlEQUFpRDtBQUNqRCxPQUFPLEtBQUssS0FBSyxNQUFNLGtEQUFrRCxDQUFDO0FBTTFFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFdEMsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUNsQixDQUFDLElBQVUsRUFBRSxTQUEwQixFQUN0QyxPQUF5QixFQUFZLEVBQUU7SUFDdEMsUUFBUSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ2YsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNmLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsRUFDdEQsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELEtBQUssVUFBVSxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDbEIsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNqQixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLEVBQ3RELGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxLQUFLLGNBQWMsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUN0QixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLEVBQ3RELGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2QsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsS0FBSyxXQUFXLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDbkIsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsS0FBSyxZQUFZLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FDcEIsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsS0FBSyxZQUFZLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FDcEIsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELEtBQUssV0FBVyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ25CLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsRUFDdEQsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxVQUFVLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNmLGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsRUFDOUQsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxFQUN0RCxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0Q7WUFDRSxNQUFNLFNBQVMsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUM7S0FDOUQ7QUFDSCxDQUFDLENBQUM7QUFFTixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW1wb3J0cy1mcm9tLWRpc3RcbmltcG9ydCAqIGFzIHRmT3BzIGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZS9kaXN0L29wcy9vcHNfZm9yX2NvbnZlcnRlcic7XG5cbmltcG9ydCB7TmFtZWRUZW5zb3JzTWFwfSBmcm9tICcuLi8uLi9kYXRhL3R5cGVzJztcbmltcG9ydCB7RXhlY3V0aW9uQ29udGV4dH0gZnJvbSAnLi4vLi4vZXhlY3V0b3IvZXhlY3V0aW9uX2NvbnRleHQnO1xuaW1wb3J0IHtJbnRlcm5hbE9wRXhlY3V0b3IsIE5vZGV9IGZyb20gJy4uL3R5cGVzJztcblxuaW1wb3J0IHtnZXRQYXJhbVZhbHVlfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGV4ZWN1dGVPcDogSW50ZXJuYWxPcEV4ZWN1dG9yID1cbiAgICAobm9kZTogTm9kZSwgdGVuc29yTWFwOiBOYW1lZFRlbnNvcnNNYXAsXG4gICAgIGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBUZW5zb3JbXSA9PiB7XG4gICAgICBzd2l0Y2ggKG5vZGUub3ApIHtcbiAgICAgICAgY2FzZSAnRXF1YWwnOiB7XG4gICAgICAgICAgcmV0dXJuIFt0Zk9wcy5lcXVhbChcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdOb3RFcXVhbCc6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLm5vdEVxdWFsKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdhJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IsXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2InLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcildO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0dyZWF0ZXInOiB7XG4gICAgICAgICAgcmV0dXJuIFt0Zk9wcy5ncmVhdGVyKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdhJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IsXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2InLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcildO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0dyZWF0ZXJFcXVhbCc6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLmdyZWF0ZXJFcXVhbChcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdMZXNzJzoge1xuICAgICAgICAgIHJldHVybiBbdGZPcHMubGVzcyhcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdMZXNzRXF1YWwnOiB7XG4gICAgICAgICAgcmV0dXJuIFt0Zk9wcy5sZXNzRXF1YWwoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2EnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnTG9naWNhbEFuZCc6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLmxvZ2ljYWxBbmQoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2EnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYicsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnTG9naWNhbE5vdCc6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLmxvZ2ljYWxOb3QoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2EnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcildO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0xvZ2ljYWxPcic6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLmxvZ2ljYWxPcihcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdTZWxlY3QnOlxuICAgICAgICBjYXNlICdTZWxlY3RWMic6IHtcbiAgICAgICAgICByZXR1cm4gW3RmT3BzLndoZXJlKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdjb25kaXRpb24nLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIFRlbnNvcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnYScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdiJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IFR5cGVFcnJvcihgTm9kZSB0eXBlICR7bm9kZS5vcH0gaXMgbm90IGltcGxlbWVudGVkYCk7XG4gICAgICB9XG4gICAgfTtcblxuZXhwb3J0IGNvbnN0IENBVEVHT1JZID0gJ2xvZ2ljYWwnO1xuIl19