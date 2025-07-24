import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import { remarkInstall } from 'fumadocs-docgen'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'

export const docs = defineDocs({
  dir: 'content/docs',
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
      ],
      langs: ['javascript', 'typescript', 'json', 'markdown', 'http', 'console'],
    },
    remarkPlugins: [remarkInstall],
  },
})
