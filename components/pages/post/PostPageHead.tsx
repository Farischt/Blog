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
  const metaDescription =
    toPlainText(post.content).length > 160
      ? toPlainText(post.content).slice(0, 160) + '…'
      : toPlainText(post.content)

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta key="description" name="description" content={metaDescription} />
      <BlogMeta />

      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ slug: post.slug })}`}
      />
    </Head>
  )
}
