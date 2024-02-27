import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import {ArrowUpRightIcon} from "@heroicons/react/20/solid";

function TopLevelNavItem({
  href,
  children,
  target,
}: {
  href: string
  children: React.ReactNode
  target?: string
}) {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center"
      >
        {children} <ArrowUpRightIcon className="w-4 h-4 ml-1"/>
      </Link>
    </li>
  )
}

export function HeaderLinks() {
  return <>
    <TopLevelNavItem href="https://midreal.ai/image" target="_blank">Image Gen</TopLevelNavItem>
    <TopLevelNavItem href="https://midreal.ai/qrcode" target="_blank">QR Code</TopLevelNavItem>
    <TopLevelNavItem href="https://latentcat.com" target="_blank">Latent Cat</TopLevelNavItem>
  </>
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  { className?: string }
>(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.7])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-black'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-black/[var(--bg-opacity-dark)]',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-8" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <HeaderLinks />
          </ul>
        </nav>
        {/*<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />*/}
        <MobileSearch />
        {/*<div className="hidden min-[416px]:contents">*/}
        {/*  <Button href="#">Sign in</Button>*/}
        {/*</div>*/}
      </div>
    </motion.div>
  )
})
