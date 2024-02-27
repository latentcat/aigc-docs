'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import {HeaderLinks} from "@/components/Header";

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}


function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/10"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation: Array<NavGroup> = [

  {
    title: '开始之前',
    links: [
      // { title: '首页', href: '/' },
      { title: '文档缘起', href: '/preface/intro' },
      { title: '文档信息', href: '/preface/info' },
      { title: '联系我们', href: '/preface/contacts' },
      { title: '编写团队', href: '/preface/contributors' },
    ],
  },
  {
    title: 'Stable Diffusion 图像生成',
    links: [
      { title: 'Stable Diffusion 介绍', href: '/sd-inference/intro' },
      { title: 'SD Web UI 安装流程', href: '/sd-inference/webui-install' },
      { title: 'SD Web UI 加速选项与常用配置', href: '/sd-inference/webui-config' },
      { title: 'SD Web UI 基础用法与常用插件', href: '/sd-inference/webui-usage' },
      { title: 'AI 动画及动态视频制作方式', href: '/sd-inference/webui-ani' },
      { title: 'ControlNet 安装与使用', href: '/sd-inference/controlnet' },
      { title: 'LoRA 使用方法', href: '/sd-inference/lora' },
    ],
  },
  {
    title: 'Stable Diffusion 模型训练',
    links: [
      { title: 'SD 模型训练概览', href: '/sd-training/intro' },
      { title: '数据标注', href: '/sd-training/data-labeling' },
      { title: 'Dreambooth 模型训练方法', href: '/sd-training/dreambooth' },
      { title: 'LoRA 模型训练方法', href: '/sd-training/lora' },
      { title: 'LoCon 等模型训练方法', href: '/sd-training/locon' },
      { title: '模型融合与分层调试', href: '/sd-training/model-mix' },
    ],
  },
  {
    title: 'Stable Diffusion 工作流程展示',
    links: [
      { title: 'SCMix - Checkpoint', href: '/sd-showcase/scmix' },
      { title: '浮世绘 - LoRA', href: '/sd-showcase/fuyue' },
      { title: '中国传统纹样 - LoRA', href: '/sd-showcase/chinese-ornament' },
      { title: '原神风格图标 - LoRA', href: '/sd-showcase/genshin' },
      { title: 'Brightness ControlNet', href: '/sd-showcase/brightness-controlnet' },
      { title: 'Light Composition Controlnet', href: '/sd-showcase/light_controlnet' },
      { title: 'SD 图像生成工作流程', href: '/sd-showcase/inference-workflow' },
    ],
  },
  {
    title: 'Midjourney 图像生成',
    links: [
      { title: 'Midjourney Prompt 指南', href: '/midjourney/mj-parameter' },
    ],
  },
  {
    title: 'NeRF',
    links: [
      { title: 'NeRF 介绍', href: '/nerf/intro' },
      { title: 'Instant NGP 介绍', href: '/nerf/instant-ngp' },
    ],
  },
  {
    title: 'LLM 文字生成',
    links: [
      { title: 'IoC Lab 工具', href: '/llm-inference/lab-tool' },
      { title: 'LangChain 使用方法', href: '/llm-inference/langchain' },
      { title: 'LangChain 语义搜索', href: '/llm-inference/embedding' },
      { title: 'Python 自动化脚本', href: '/llm-inference/python-tool' },
    ],
  },
  {
    title: 'AIGC Pipeline 工具',
    links: [
      { title: '图像压缩', href: '/pipeline/image-compression' },
    ],
  },
  {
    title: '工具和资源',
    links: [
      { title: 'IoC Lab App', href: '/resources/ioc-lab-app' },
      { title: 'GraphPU App', href: '/resources/graphpu-app' },
      { title: 'Awesome AIGC', href: '/resources/awesome-aigc' },
    ],
  },
];


export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul role="list">
        <div className="md:hidden flex flex-col gap-2">
          <HeaderLinks />
        </div>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  )
}
