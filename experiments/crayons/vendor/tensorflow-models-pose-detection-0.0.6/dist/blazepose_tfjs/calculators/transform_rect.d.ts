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
import { ImageSize } from '../../calculators/interfaces/common_interfaces';
import { Rect } from '../../calculators/interfaces/shape_interfaces';
import { RectTransformationConfig } from './interfaces/config_interfaces';
/**
 * Performs geometric transformation to the input normalized rectangle,
 * correpsonding to input normalized rectangle respectively.
 * @param rect The normalized rectangle.
 * @param imageSize The original imageSize.
 * @param config See documentation in `RectTransformationConfig`.
 */
export declare function transformNormalizedRect(rect: Rect, imageSize: ImageSize, config: RectTransformationConfig): Rect;
export declare function computeNewRotation(rotation: number, config: RectTransformationConfig): number;
