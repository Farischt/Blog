import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'

import { height, OpenGraphImage, width } from 'components/utils/OpenGraphImage'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { Settings, settingsQuery } from 'lib/sanity.queries'

export const config: PageConfig = { runtime: 'edge' }

export default async function og(req: NextRequest) {
  const font = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )
  const { searchParams } = new URL(req.url)

  let title = searchParams.get('title')
  if (!title) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
    const settings = (await client.fetch<Settings>(settingsQuery)) || {}
    title = settings?.ogImage?.title
  }

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
