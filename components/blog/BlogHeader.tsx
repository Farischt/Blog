import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import styles from './BlogHeader.module.css'
import MenuIcon from 'assets/icons/menu.svg'
import { SectionSeparator } from 'components/ui'
import { useMenu } from 'context'

interface Props {
  title: string
  description?: any[]
  level: 1 | 2
}

export const BlogHeader = ({ title, description, level }: Props) => {
  const { open, changeState } = useMenu()

  switch (level) {
    case 1:
      return (
        <header
          className={`mb-10 ${
            !open ? 'mt-16' : 'mt-4'
          }  flex flex-col items-end md:mb-12`}
        >
          {!open && (
            <MenuIcon
              fill={'#000000'}
              className="h-8 w-8 cursor-pointer"
              onClick={changeState}
            />
          )}
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
              {title}
            </h1>
            <h4
              className={`mt-5 text-lg md:pl-8 md:text-left ${styles.portableText}`}
            >
              <PortableText value={description} />
            </h4>
          </div>
        </header>
      )

    case 2:
      return (
        <>
          <header
            className={`mb-20 ${
              !open ? 'mt-16' : 'mt-4'
            } flex items-center justify-between`}
          >
            <h2 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
              <Link href="/" className="hover:underline">
                {title}
              </Link>
            </h2>
            {!open && (
              <MenuIcon
                fill={'#000000'}
                className="h-8 w-8 cursor-pointer"
                onClick={changeState}
              />
            )}
          </header>
          <SectionSeparator size="small" />
        </>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
