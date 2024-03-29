/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { Keypoint } from '../../types';
/**
 * A calculator to copy score between landmarks.
 *
 * Landmarks to copy from and to copy to can be of different type (normalized or
 * non-normalized), but landmarks to copy to and output landmarks should be of
 * the same type.
 * @param landmarksFrom  A list of landmarks.
 *     to copy from.
 * @param landmarksTo  A list of landmarks.
 *     to copy to.
 * @param copyScore Copy the score from the `landmarksFrom` parameter.
 */
export declare function calculateScoreCopy(landmarksFrom: Keypoint[], landmarksTo: Keypoint[], copyScore?: boolean): {
    x: number;
    y: number;
    z?: number;
    score?: number;
    name?: string;
}[];
