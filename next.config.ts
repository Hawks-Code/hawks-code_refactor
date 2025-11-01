import type { NextConfig } from "next";
import rehypeImages from "rehype-image-toolkit"
import createMDX from "@next/mdx"

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
})


export default withMDX(nextConfig);
