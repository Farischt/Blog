import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'

import { height, OpenGraphImage, width } from 'components/utils/OpenGraphImage'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { getPostBySlug } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'
import { Settings, settingsQuery } from 'lib/sanity.queries'

export const config: PageConfig = { runtime: 'edge' }

export const defaultOgImage = async (
  font: Promise<ArrayBuffer>,
  title?: string,
) => {
  return new ImageResponse(
    <OpenGraphImage title={title || 'Missing Title'} />,
    {
      width,
      height,
      fonts: [
        {
          name: 'Inter',
          data: await font,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}

export default async function og(req: NextRequest) {
  const font = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )

  const { searchParams } = new URL(req.url)
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })

  let title = searchParams.get('title')
  const slug = searchParams.get('slug')

  if (!title) {
    const settings = (await client.fetch<Settings>(settingsQuery)) || {}
    title = settings?.ogImage?.title
  }

  try {
    if (!slug) {
      return await defaultOgImage(font, title)
    } else {
      const post = await getPostBySlug(client, slug)

      if (!post) return await defaultOgImage(font, title)

      return new ImageResponse(
        (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={urlForImage(post.coverImage)
              .width(width)
              .height(height)
              .fit('crop')
              .url()}
            alt={post.title}
            width={width}
            height={height}
          />
        ),
      )
    }
  } catch (error) {
    return await defaultOgImage(font, title)
  }
}
