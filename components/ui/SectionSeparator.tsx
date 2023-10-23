import { clsx } from 'clsx'

interface Props {
  size?: 'small' | 'medium' | 'large'
  color?: 'light' | 'medium' | 'dark'
}

export const SectionSeparator = ({
  size = 'large',
  color = 'light',
}: Props) => {
  const baseStyle = clsx({
    'mb-24 mt-28': size === 'large',
    'mb-16 mt-20': size === 'medium',
    'mb-8 mt-10': size === 'small',
  })

  const colorStyle = clsx({
    'border-accent-2': color === 'light',
    'border-accent-3': color === 'medium',
    'border-accent-7': color === 'dark',
  })

  return <hr className={`${baseStyle} ${colorStyle}`} />
}
