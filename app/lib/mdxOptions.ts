import { MDXRemoteOptions } from "next-mdx-remote-client/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkToc from "remark-toc"
import rehypeImageToolkit from "rehype-image-toolkit"
import 'katex/dist/katex.min.css'

const mdxRemoteOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      remarkToc,
      remarkMath
    ],
    rehypePlugins: [
      rehypeImageToolkit,
      rehypeSlug,
      rehypePrettyCode,
      rehypeKatex,
      rehypeAutolinkHeadings
    ]

  }
} satisfies MDXRemoteOptions

export default mdxRemoteOptions
