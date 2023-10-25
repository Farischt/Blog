import { toPlainText } from '@portabletext/react'
import Head from 'next/head'

import { BlogMeta } from 'components'
import { urlForImage } from 'lib/sanity.image'
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
        content={urlForImage(post.coverImage)
          .width(1200)
          .height(627)
          .fit('crop')
          .url()}
      />
    </Head>
  )
}
