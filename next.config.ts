import type { NextConfig } from "next";
import rehypeImages from "rehype-image-toolkit"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "tsx", "ts", "md", "mdx"],
  allowedDevOrigins: ["10.55.53.61"],
  experimental: {
    // mdxRs: true
  }
};


const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-toc"
    ],
    rehypePlugins: [
      "rehype-image-toolkit",
      "rehype-highlight",
      "rehype-slug",
      // "rehype-pretty-code"
    ]
  }
})


export default withMDX(nextConfig);
