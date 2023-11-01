import { Transition } from '@headlessui/react'
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
        <header className="mb-10 mt-8 flex flex-col items-end md:mb-12">
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
                {title}
              </h1>
              <Transition
                show={!open}
                enter="transition-all duration-700 ease"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-700 ease"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <MenuIcon
                  fill={'#000000'}
                  className="h-8 w-8 cursor-pointer"
                  onClick={changeState}
                />
              </Transition>
            </div>

            <h4 className={`mt-5 text-lg md:text-left ${styles.portableText}`}>
              <PortableText value={description} />
            </h4>
          </div>
        </header>
      )

    case 2:
      return (
        <>
          <header className="mb-20 mt-8 flex items-center justify-between">
            <h2 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
              <Link href="/" className="hover:underline">
                {title}
              </Link>
            </h2>
            <Transition
              show={!open}
              enter="transition-all duration-700 ease"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all duration-700 ease"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <MenuIcon
                fill={'#000000'}
                className="h-8 w-8 cursor-pointer"
                onClick={changeState}
              />
            </Transition>
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
