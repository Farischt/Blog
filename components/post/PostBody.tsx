/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'
import { forwardRef, useCallback, useEffect, useState } from 'react'

import styles from './PostBody.module.css'
import ChevronUpIcon from 'assets/icons/chevron-up.svg'
import { SanityImage } from 'components'
import { scrollToRef } from 'utils'

type Props = {
  content: any
}

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export const PostBody = forwardRef<HTMLHeadingElement, Props>(
  ({ content }, ref: React.MutableRefObject<HTMLHeadingElement>) => {
    const [scrollToTopVisible, setScrollToTopVisible] = useState(false)

    const handleScroll = useCallback(() => {
      // When the user scrolls down, show the "Scroll to Top" button.
      if (window.scrollY > ref.current?.offsetTop + ref.current?.offsetHeight) {
        setScrollToTopVisible(true)
      } else {
        setScrollToTopVisible(false)
      }
    }, [ref])

    // Add an event listener to handle scrolling.
    useEffect(() => {
      window.addEventListener('scroll', handleScroll)

      // Remove the event listener when the component unmounts.
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [handleScroll])

    return (
      <div>
        <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
          <PortableText value={content} components={myPortableTextComponents} />
        </div>
        {scrollToTopVisible && (
          <div className="fixed bottom-6 right-6 mb-8 mr-8 flex animate-bounce items-center justify-center rounded-full border border-black bg-black p-2">
            <ChevronUpIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => scrollToRef<HTMLHeadingElement>(ref)}
              stroke={`#FFF`}
            />
          </div>
        )}
      </div>
    )
  },
)
