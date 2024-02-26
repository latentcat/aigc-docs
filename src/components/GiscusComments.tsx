"use client"


import Giscus from "@giscus/react";


export default function GiscusComments() {
  return (
    <div className="mt-16">
      <Giscus
        id="comments"
        repo="ciaochaos/aigc-doc-discussions"
        repoId="R_kgDOJScxkQ"
        category="Announcements"
        categoryId="DIC_kwDOJScxkc4CVhAz"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark_protanopia"
        lang="zh-CN"
      />
    </div>
  )
}