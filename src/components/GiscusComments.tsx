"use client"


import Giscus from "@giscus/react";


export default function GiscusComments() {

  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <div className="mt-16" id="giscus_ctn">
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
        theme={siteUrl + "/giscus-theme.css"}
        lang="zh-CN"
      />
    </div>
  )
}