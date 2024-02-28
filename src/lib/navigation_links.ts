
export interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
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
      { title: '图像数据集', href: '/resources/image-datasets' },
    ],
  },
];