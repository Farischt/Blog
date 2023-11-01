import { toPlainText } from '@portabletext/react'
import Head from 'next/head'

import { BlogMeta } from 'components'
import { Settings } from 'lib/sanity.queries'

export interface IndexPageHeadProps {
  settings: Settings
}

export function IndexPageHead({ settings }: IndexPageHeadProps) {
  const { title, description, ogImage = {} } = settings
  const ogImageTitle = ogImage?.title || 'Missing title'

  const ogImageContent = `${
    process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
  }/api/og?${new URLSearchParams({ title: ogImageTitle })}`
  const ogUrl = `https://www.chtatou.org`
  const ogTitle = title
  const ogDescription = toPlainText(description)

  return (
    <Head>
      <title>{title}</title>
      <meta
        key="description"
        name="description"
        content={toPlainText(description)}
      />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={ogImageContent}
      />
      <BlogMeta />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="chtatou.org" />
      <meta property="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImageContent} />
    </Head>
  )
}
