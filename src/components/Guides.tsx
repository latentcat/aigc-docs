import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/preface/info',
    name: '文档信息',
    description: '链接、更新记录',
  },
  {
    href: '/preface/contributors',
    name: '编写团队',
    description: '谁在后面',
  },
  {
    href: '/preface/contacts',
    name: '联系我们',
    description:
      '…如果评论区解决不了你的问题',
  },
  {
    href: '/resources/ioc-lab-app',
    name: 'IoC Lab App',
    description:
      '一个实用工具小集合',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        资源
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
