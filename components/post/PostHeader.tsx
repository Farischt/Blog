import { PostDate, PostTitle, AuthorAvatar, CoverImage } from 'components'
import type { Post } from 'lib/sanity.queries'

export function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <AuthorAvatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && (
            <AuthorAvatar name={author.name} picture={author.picture} />
          )}
        </div>
        <div className="mb-6 text-lg">
          <PostDate dateString={date} />
        </div>
      </div>
    </>
  )
}
