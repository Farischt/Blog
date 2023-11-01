import Link from 'next/link'
import { forwardRef } from 'react'

import { PostDate, AuthorAvatar, CoverImage } from 'components'
import type { Post } from 'lib/sanity.queries'

export const PostPreview = forwardRef<HTMLDivElement, Omit<Post, '_id'>>(
  ({ title, coverImage, date, excerpt, author, slug }, ref) => {
    return (
      <div ref={ref} className="w-[500px]">
        <div className="mb-5">
          <CoverImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={false}
          />
        </div>
        <h3 className="mb-3 text-3xl leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="mb-4 text-lg">
          <PostDate dateString={date} />
        </div>
        {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
        {author && <AuthorAvatar name={author.name} picture={author.picture} />}
      </div>
    )
  },
)
