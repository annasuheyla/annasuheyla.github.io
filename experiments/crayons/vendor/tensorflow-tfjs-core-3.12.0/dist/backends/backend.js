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
export const EPSILON_FLOAT32 = 1e-7;
export const EPSILON_FLOAT16 = 1e-4;
/** Convenient class for storing tensor-related data. */
export class DataStorage {
    constructor(backend, dataMover) {
        this.backend = backend;
        this.dataMover = dataMover;
        this.data = new WeakMap();
        this.dataIdsCount = 0;
    }
    get(dataId) {
        if (!this.data.has(dataId)) {
            this.dataMover.moveData(this.backend, dataId);
        }
        return this.data.get(dataId);
    }
    set(dataId, value) {
        this.dataIdsCount++;
        this.data.set(dataId, value);
    }
    has(dataId) {
        return this.data.has(dataId);
    }
    delete(dataId) {
        this.dataIdsCount--;
        return this.data.delete(dataId);
    }
    numDataIds() {
        return this.dataIdsCount;
    }
}
/**
 * The interface that defines the kernels that should be implemented when
 * adding a new backend. New backends don't need to implement every one of the
 * methods, this can be done gradually (throw an error for unimplemented
 * methods).
 */
export class KernelBackend {
    refCount(dataId) {
        return notYetImplemented('refCount');
    }
    incRef(dataId) {
        return notYetImplemented('incRef');
    }
    timerAvailable() {
        return true;
    }
    time(f) {
        return notYetImplemented('time');
    }
    read(dataId) {
        return notYetImplemented('read');
    }
    readSync(dataId) {
        return notYetImplemented('readSync');
    }
    numDataIds() {
        return notYetImplemented('numDataIds');
    }
    disposeData(dataId, force) {
        return notYetImplemented('disposeData');
    }
    write(values, shape, dtype) {
        return notYetImplemented('write');
    }
    move(dataId, values, shape, dtype, refCount) {
        return notYetImplemented('move');
    }
    memory() {
        return notYetImplemented('memory');
    }
    /** Returns the highest precision for floats in bits (e.g. 16 or 32) */
    floatPrecision() {
        return notYetImplemented('floatPrecision');
    }
    /** Returns the smallest representable number.  */
    epsilon() {
        return this.floatPrecision() === 32 ? EPSILON_FLOAT32 : EPSILON_FLOAT16;
    }
    dispose() {
        return notYetImplemented('dispose');
    }
}
function notYetImplemented(kernelName) {
    throw new Error(`'${kernelName}' not yet implemented or not found in the registry. ` +
        `This kernel may not be supported by the tfjs backend you have chosen`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29yZS9zcmMvYmFja2VuZHMvYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFLSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7QUF1QnBDLHdEQUF3RDtBQUN4RCxNQUFNLE9BQU8sV0FBVztJQUl0QixZQUFvQixPQUFzQixFQUFVLFNBQW9CO1FBQXBELFlBQU8sR0FBUCxPQUFPLENBQWU7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSGhFLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBYSxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRWtELENBQUM7SUFFNUUsR0FBRyxDQUFDLE1BQWM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsTUFBYyxFQUFFLEtBQVE7UUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFDLE1BQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBaUJEOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUFDeEIsUUFBUSxDQUFDLE1BQWM7UUFDckIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQWM7UUFDbkIsT0FBTyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFhO1FBQ2hCLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQUksQ0FBQyxNQUFjO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELFVBQVU7UUFDUixPQUFPLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxXQUFXLENBQUMsTUFBYyxFQUFFLEtBQWU7UUFDekMsT0FBTyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQXFCLEVBQUUsS0FBZSxFQUFFLEtBQWU7UUFDM0QsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsSUFBSSxDQUNBLE1BQWMsRUFBRSxNQUFxQixFQUFFLEtBQWUsRUFBRSxLQUFlLEVBQ3ZFLFFBQWdCO1FBQ2xCLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELE1BQU07UUFDSixPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCx1RUFBdUU7SUFDdkUsY0FBYztRQUNaLE9BQU8saUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0Qsa0RBQWtEO0lBQ2xELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzFFLENBQUM7SUFDRCxPQUFPO1FBQ0wsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFFRCxTQUFTLGlCQUFpQixDQUFDLFVBQWtCO0lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQ1gsSUFBSSxVQUFVLHNEQUFzRDtRQUNwRSxzRUFBc0UsQ0FBQyxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7QmFja2VuZCwgRGF0YUlkfSBmcm9tICcuLi90ZW5zb3InO1xuaW1wb3J0IHtCYWNrZW5kVmFsdWVzLCBEYXRhVHlwZX0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgRVBTSUxPTl9GTE9BVDMyID0gMWUtNztcbmV4cG9ydCBjb25zdCBFUFNJTE9OX0ZMT0FUMTYgPSAxZS00O1xuXG4vLyBSZXF1aXJlZCBpbmZvcm1hdGlvbiBmb3IgYWxsIGJhY2tlbmRzLlxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kVGltaW5nSW5mbyB7XG4gIGtlcm5lbE1zOiBudW1iZXJ8e2Vycm9yOiBzdHJpbmd9O1xuICBnZXRFeHRyYVByb2ZpbGVJbmZvPygpOiBzdHJpbmc7ICAvLyBhIGZpZWxkIGZvciBhZGRpdGlvbmFsIHRpbWluZyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlLmcuIHBhY2tpbmcgLyB1bnBhY2tpbmcgZm9yIFdlYkdMIGJhY2tlbmRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JTdG9yYWdlIHtcbiAgcmVhZChkYXRhSWQ6IERhdGFJZCk6IFByb21pc2U8QmFja2VuZFZhbHVlcz47XG4gIHJlYWRTeW5jKGRhdGFJZDogRGF0YUlkKTogQmFja2VuZFZhbHVlcztcbiAgZGlzcG9zZURhdGEoZGF0YUlkOiBEYXRhSWQsIGZvcmNlPzogYm9vbGVhbik6IGJvb2xlYW47XG4gIHdyaXRlKHZhbHVlczogQmFja2VuZFZhbHVlcywgc2hhcGU6IG51bWJlcltdLCBkdHlwZTogRGF0YVR5cGUpOiBEYXRhSWQ7XG4gIG1vdmUoXG4gICAgICBkYXRhSWQ6IERhdGFJZCwgdmFsdWVzOiBCYWNrZW5kVmFsdWVzLCBzaGFwZTogbnVtYmVyW10sIGR0eXBlOiBEYXRhVHlwZSxcbiAgICAgIHJlZkNvdW50OiBudW1iZXIpOiB2b2lkO1xuICBtZW1vcnkoKToge3VucmVsaWFibGU6IGJvb2xlYW47fTsgIC8vIEJhY2tlbmQtc3BlY2lmaWMgaW5mb3JtYXRpb24uXG4gIC8qKiBSZXR1cm5zIG51bWJlciBvZiBkYXRhIGlkcyBjdXJyZW50bHkgaW4gdGhlIHN0b3JhZ2UuICovXG4gIG51bURhdGFJZHMoKTogbnVtYmVyO1xuICByZWZDb3VudChkYXRhSWQ6IERhdGFJZCk6IG51bWJlcjtcbn1cblxuLyoqIENvbnZlbmllbnQgY2xhc3MgZm9yIHN0b3JpbmcgdGVuc29yLXJlbGF0ZWQgZGF0YS4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZTxUPiB7XG4gIHByaXZhdGUgZGF0YSA9IG5ldyBXZWFrTWFwPERhdGFJZCwgVD4oKTtcbiAgcHJpdmF0ZSBkYXRhSWRzQ291bnQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja2VuZDogS2VybmVsQmFja2VuZCwgcHJpdmF0ZSBkYXRhTW92ZXI6IERhdGFNb3Zlcikge31cblxuICBnZXQoZGF0YUlkOiBEYXRhSWQpIHtcbiAgICBpZiAoIXRoaXMuZGF0YS5oYXMoZGF0YUlkKSkge1xuICAgICAgdGhpcy5kYXRhTW92ZXIubW92ZURhdGEodGhpcy5iYWNrZW5kLCBkYXRhSWQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhLmdldChkYXRhSWQpO1xuICB9XG5cbiAgc2V0KGRhdGFJZDogRGF0YUlkLCB2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YUlkc0NvdW50Kys7XG4gICAgdGhpcy5kYXRhLnNldChkYXRhSWQsIHZhbHVlKTtcbiAgfVxuXG4gIGhhcyhkYXRhSWQ6IERhdGFJZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEuaGFzKGRhdGFJZCk7XG4gIH1cblxuICBkZWxldGUoZGF0YUlkOiBEYXRhSWQpOiBib29sZWFuIHtcbiAgICB0aGlzLmRhdGFJZHNDb3VudC0tO1xuICAgIHJldHVybiB0aGlzLmRhdGEuZGVsZXRlKGRhdGFJZCk7XG4gIH1cblxuICBudW1EYXRhSWRzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUlkc0NvdW50O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YU1vdmVyIHtcbiAgLyoqXG4gICAqIFRvIGJlIGNhbGxlZCBieSBiYWNrZW5kcyB3aGVuZXZlciB0aGV5IHNlZSBhIGRhdGFJZCB0aGF0IHRoZXkgZG9uJ3Qgb3duLlxuICAgKiBVcG9uIGNhbGxpbmcgdGhpcyBtZXRob2QsIHRoZSBtb3ZlciB3aWxsIGZldGNoIHRoZSB0ZW5zb3IgZnJvbSBhbm90aGVyXG4gICAqIGJhY2tlbmQgYW5kIHJlZ2lzdGVyIGl0IHdpdGggdGhlIGN1cnJlbnQgYWN0aXZlIGJhY2tlbmQuXG4gICAqL1xuICBtb3ZlRGF0YShiYWNrZW5kOiBLZXJuZWxCYWNrZW5kLCBkYXRhSWQ6IERhdGFJZCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZFRpbWVyIHtcbiAgLy8gY2hlY2sgaWYgYmFja2VuZCB0aW1lciBpcyBhdmFpbGFibGVcbiAgdGltZXJBdmFpbGFibGUoKTogYm9vbGVhbjtcbiAgdGltZShmOiAoKSA9PiB2b2lkKTogUHJvbWlzZTxCYWNrZW5kVGltaW5nSW5mbz47XG59XG5cbi8qKlxuICogVGhlIGludGVyZmFjZSB0aGF0IGRlZmluZXMgdGhlIGtlcm5lbHMgdGhhdCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgd2hlblxuICogYWRkaW5nIGEgbmV3IGJhY2tlbmQuIE5ldyBiYWNrZW5kcyBkb24ndCBuZWVkIHRvIGltcGxlbWVudCBldmVyeSBvbmUgb2YgdGhlXG4gKiBtZXRob2RzLCB0aGlzIGNhbiBiZSBkb25lIGdyYWR1YWxseSAodGhyb3cgYW4gZXJyb3IgZm9yIHVuaW1wbGVtZW50ZWRcbiAqIG1ldGhvZHMpLlxuICovXG5leHBvcnQgY2xhc3MgS2VybmVsQmFja2VuZCBpbXBsZW1lbnRzIFRlbnNvclN0b3JhZ2UsIEJhY2tlbmQsIEJhY2tlbmRUaW1lciB7XG4gIHJlZkNvdW50KGRhdGFJZDogRGF0YUlkKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbm90WWV0SW1wbGVtZW50ZWQoJ3JlZkNvdW50Jyk7XG4gIH1cbiAgaW5jUmVmKGRhdGFJZDogRGF0YUlkKTogdm9pZCB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCdpbmNSZWYnKTtcbiAgfVxuICB0aW1lckF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0aW1lKGY6ICgpID0+IHZvaWQpOiBQcm9taXNlPEJhY2tlbmRUaW1pbmdJbmZvPiB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCd0aW1lJyk7XG4gIH1cbiAgcmVhZChkYXRhSWQ6IG9iamVjdCk6IFByb21pc2U8QmFja2VuZFZhbHVlcz4ge1xuICAgIHJldHVybiBub3RZZXRJbXBsZW1lbnRlZCgncmVhZCcpO1xuICB9XG4gIHJlYWRTeW5jKGRhdGFJZDogb2JqZWN0KTogQmFja2VuZFZhbHVlcyB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCdyZWFkU3luYycpO1xuICB9XG4gIG51bURhdGFJZHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbm90WWV0SW1wbGVtZW50ZWQoJ251bURhdGFJZHMnKTtcbiAgfVxuICBkaXNwb3NlRGF0YShkYXRhSWQ6IG9iamVjdCwgZm9yY2U/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCdkaXNwb3NlRGF0YScpO1xuICB9XG4gIHdyaXRlKHZhbHVlczogQmFja2VuZFZhbHVlcywgc2hhcGU6IG51bWJlcltdLCBkdHlwZTogRGF0YVR5cGUpOiBEYXRhSWQge1xuICAgIHJldHVybiBub3RZZXRJbXBsZW1lbnRlZCgnd3JpdGUnKTtcbiAgfVxuICBtb3ZlKFxuICAgICAgZGF0YUlkOiBEYXRhSWQsIHZhbHVlczogQmFja2VuZFZhbHVlcywgc2hhcGU6IG51bWJlcltdLCBkdHlwZTogRGF0YVR5cGUsXG4gICAgICByZWZDb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCdtb3ZlJyk7XG4gIH1cbiAgbWVtb3J5KCk6IHt1bnJlbGlhYmxlOiBib29sZWFuOyByZWFzb25zPzogc3RyaW5nW119IHtcbiAgICByZXR1cm4gbm90WWV0SW1wbGVtZW50ZWQoJ21lbW9yeScpO1xuICB9XG4gIC8qKiBSZXR1cm5zIHRoZSBoaWdoZXN0IHByZWNpc2lvbiBmb3IgZmxvYXRzIGluIGJpdHMgKGUuZy4gMTYgb3IgMzIpICovXG4gIGZsb2F0UHJlY2lzaW9uKCk6IDE2fDMyIHtcbiAgICByZXR1cm4gbm90WWV0SW1wbGVtZW50ZWQoJ2Zsb2F0UHJlY2lzaW9uJyk7XG4gIH1cbiAgLyoqIFJldHVybnMgdGhlIHNtYWxsZXN0IHJlcHJlc2VudGFibGUgbnVtYmVyLiAgKi9cbiAgZXBzaWxvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsb2F0UHJlY2lzaW9uKCkgPT09IDMyID8gRVBTSUxPTl9GTE9BVDMyIDogRVBTSUxPTl9GTE9BVDE2O1xuICB9XG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIG5vdFlldEltcGxlbWVudGVkKCdkaXNwb3NlJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm90WWV0SW1wbGVtZW50ZWQoa2VybmVsTmFtZTogc3RyaW5nKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgJyR7a2VybmVsTmFtZX0nIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb3Igbm90IGZvdW5kIGluIHRoZSByZWdpc3RyeS4gYCArXG4gICAgICBgVGhpcyBrZXJuZWwgbWF5IG5vdCBiZSBzdXBwb3J0ZWQgYnkgdGhlIHRmanMgYmFja2VuZCB5b3UgaGF2ZSBjaG9zZW5gKTtcbn1cbiJdfQ==