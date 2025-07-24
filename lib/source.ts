import * as icons from '@remixicon/react'
import { loader } from 'fumadocs-core/source'
import { createElement } from 'react'
import { docs } from '@/.source'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      return
    }

    if (icon in icons)
      return createElement(icons[icon as keyof typeof icons])
    else
      throw new Error(`Icon not found: ${icon}`)
  },
})
