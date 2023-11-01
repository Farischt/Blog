import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { PostPreview } from 'components'
import type { Post } from 'lib/sanity.queries'

type Props = {
  title?: string
  posts: Post[]
  showScrollIcon?: boolean
}

export function MoreStories({
  title = 'More Stories',
  posts,
  showScrollIcon,
}: Props) {
  const [scrollText, setScrollText] = useState('Scroll right →')
  const [isScrollEnd, setIsScrollEnd] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setScrollText('You have reached the end')
          setIsScrollEnd(true)
        } else {
          setScrollText('Scroll right to see more')
          setIsScrollEnd(false)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-390px',
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTextClass = clsx(
    'mb-8 flex items-center justify-center text-lg',
    {
      'animate-pulse': !isScrollEnd,
    },
  )

  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        {title} <span className="italic">From the Blog.</span>
      </h2>
      {showScrollIcon && <div className={scrollTextClass}>{scrollText}</div>}
      <div className="hideScrollbar mb-32 overflow-hidden overflow-x-scroll ">
        <div className="flex w-fit justify-center gap-[30px]">
          {posts.map((post, index) => (
            <PostPreview
              key={post._id}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              ref={
                showScrollIcon && index === posts.length - 1 ? ref : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
