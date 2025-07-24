import { source } from '@/lib/source'

export const revalidate = false

export async function GET() {
  const pages = source.getPages()

  const noSlugPages: typeof pages = []
  const categories: Record<string, typeof pages> = {}

  for (const page of pages) {
    const [category] = page.slugs || []

    if (!category) {
      noSlugPages.push(page)
    }
    else {
      if (!categories[category])
        categories[category] = []

      categories[category].push(page)
    }
  }

  const output: string[] = []

  function formatter(pages: typeof noSlugPages) {
    return pages
      .map(page => `- [${page.data.title}](https://hookas.letstri.dev${page.url}): ${page.data.description}`)
      .join('\n')
  }

  if (noSlugPages.length > 0) {
    output.push(formatter(noSlugPages))
  }

  output.push(...Object.entries(categories)
    .map(([category, pages]) => `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n${formatter(pages)}`))

  return new Response(`# Hookas Documentation\n\n${output.join('\n\n')}`)
}
