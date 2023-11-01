import { toPlainText } from '@portabletext/react'
import Head from 'next/head'

import { BlogMeta } from 'components'
import { Post, Settings } from 'lib/sanity.queries'

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? 'Missing title'

  const metaTitle = `${post.title} | ${title}`

  const ogImageContent = `${
    process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
  }/api/og?${new URLSearchParams({ slug: post.slug })}`
  const ogUrl = `https://www.chtatou.org/posts/${post.slug}`
  const ogTitle = `${post.title}`
  const ogDescription =
    toPlainText(post.content).length > 300
      ? toPlainText(post.content).slice(0, 300) + '…'
      : toPlainText(post.content)

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta key="description" name="description" content={ogDescription} />
      <meta property="og:image" content={ogImageContent} />
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
