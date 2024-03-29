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
import * as tf from '@tensorflow/tfjs-core';
import { BoundingBox } from '../../../calculators/interfaces/shape_interfaces';
import { Keypoint } from '../../../types';
export interface AnchorTensor {
    x: tf.Tensor1D;
    y: tf.Tensor1D;
    w: tf.Tensor1D;
    h: tf.Tensor1D;
}
export interface LocationData {
    relativeBoundingBox?: BoundingBox;
    relativeKeypoints?: Keypoint[];
}
export interface Detection {
    score?: number[];
    locationData: LocationData;
    label?: string[];
    labelId?: number[];
    ind?: number;
}
