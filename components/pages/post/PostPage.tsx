import { notFound } from 'next/navigation'
import { useRef } from 'react'

import {
  BlogContainer,
  BlogHeader,
  BlogLayout,
  PostPageHead,
  PostBody,
  PostHeader,
  PostTitle,
  MoreStories,
  SectionSeparator,
} from 'components'
import type { Post, Settings } from 'lib/sanity.queries'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = []

export function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props
  const { title } = settings || {}

  const titleRef = useRef<HTMLHeadingElement>(null)

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <BlogLayout preview={preview} loading={loading} settings={settings}>
        <BlogContainer>
          <BlogHeader title={title} level={2} />
          {preview && !post ? (
            <PostTitle ref={titleRef}>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  ref={titleRef}
                />
                <PostBody content={post.content} ref={titleRef} />
              </article>
              <SectionSeparator />
              {morePosts?.length > 0 && (
                <MoreStories title="Related Posts" posts={morePosts} />
              )}
            </>
          )}
        </BlogContainer>
      </BlogLayout>
    </>
  )
}
