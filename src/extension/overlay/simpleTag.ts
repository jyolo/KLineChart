/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { formatPrecision } from '../../common/utils/format'

import { OverlayTemplate } from '../../component/Overlay'

import { isFunction, isValid } from '../../common/utils/typeChecks'

const simpleTag: OverlayTemplate = {
  name: 'simpleTag',
  createPointFigures: ({ bounding, coordinates }) => {
    return {
      type: 'line',
      attrs: {
        coordinates: [
          { x: 0, y: coordinates[0].y },
          { x: bounding.width, y: coordinates[0].y }
        ]
      },
      ignoreEvent: true
    }
  },
  createYAxisFigures: ({ overlay, coordinates, bounding, yAxis, precision }) => {
    const isFromZero = yAxis?.isFromZero() ?? false
    let textAlign: CanvasTextAlign
    let x: number
    if (isFromZero) {
      textAlign = 'left'
      x = 0
    } else {
      textAlign = 'right'
      x = bounding.width
    }
    let text
    if (overlay.extendData !== null) {
      if (!isFunction(overlay.extendData)) {
        text = overlay.extendData.toString()
      } else {
        text = overlay.extendData(overlay)
      }
    }
    if (!isValid(text)) {
      text = formatPrecision(overlay.points[0].value, precision.price)
    }
    return { type: 'rectText', attrs: { x, y: coordinates[0].y, text, align: textAlign, baseline: 'middle' } }
  }
}

export default simpleTag
