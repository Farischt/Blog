import {
  BlogContainer,
  BlogHeader,
  BlogLayout,
  IndexPageHead,
  HeroPost,
  MoreStories,
} from 'components'
import type { Post, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title, description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <BlogLayout preview={preview} loading={loading} settings={settings}>
        <BlogContainer>
          <BlogHeader title={title} description={description} level={1} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </BlogContainer>
      </BlogLayout>
    </>
  )
}
