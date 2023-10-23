import Link from 'next/link'
import React from 'react'

export enum ButtonType {
  DEFAULT = 'default',
  LINK = 'link',
}

type Props = {
  text: string
  type?: ButtonType
  href?: string
  className?: string
  action?: () => void
}

export const Button = ({
  text,
  type = ButtonType.DEFAULT,
  href,
  className,
  action,
}: Props) => {
  if (type === ButtonType.LINK && !href) {
    throw new Error('Button type is link but href is not defined')
  } else if (type === ButtonType.DEFAULT && !action) {
    throw new Error('Button type is default but action is not defined')
  } else if (type === ButtonType.DEFAULT && href) {
    throw new Error('Button type is default but href is defined')
  } else if (type === ButtonType.LINK && action) {
    throw new Error('Button type is link but action is defined')
  }

  const style =
    'px-8 font-light py-2 border border-black leading-tight tracking-tighter'

  switch (type) {
    case ButtonType.DEFAULT:
      return (
        <button className={`${style} ${className}`} onClick={action}>
          {text}
        </button>
      )

    case ButtonType.LINK:
      return (
        <Link href={href} className={`${style} ${className}`}>
          {text}
        </Link>
      )

    default:
      throw new Error(
        `Invalid button type: ${type}, valid types are: ${Object.values(
          ButtonType,
        ).join(', ')}`,
      )
  }
}
