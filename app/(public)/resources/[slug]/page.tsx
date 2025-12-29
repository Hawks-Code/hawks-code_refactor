import { fileData, listMdFiles } from "@/app/lib/md_resources"
import NotFound from "@/app/(public)/not-found"
import ContentCard from "@/app/ui/ContentCard"
import ContentTile from "@/app/ui/ContentTile"
import ContentTitle from "@/app/ui/ContentTitle"
import { MDXRemote } from "next-mdx-remote-client/rsc"
import { Nunito } from "next/font/google"
// import "highlight.js/styles/github-dark.css"
// import rehypeHighlight from "rehype-highlight"
import mdxRemoteOptions from "@/app/lib/mdxOptions"
// import { resourceTableInstance } from "@/app/lib/db"
import fs from "fs/promises"
import path from "path"


const font = Nunito()

// export const revalidate = 60

export async function generateStaticParams() {
  // const posts =  resourceTableInstance.all()
  const posts = await listMdFiles()
  // Write cache file
  // const file = await fs.open(path.join(process.cwd(), "public", "resources_cache.json"), "w")
  // await file.write(JSON.stringify(Object.fromEntries(Object.entries(posts).filter(([key]) => key !== "content"))))
  return posts.map((x) => ({
    slug: x.slug
  }))
}

export default async function ResourcePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = {} as fileData
  if (!post) {
    return <NotFound />
  }
  return <ContentCard>
    <ContentTitle>{post.title}</ContentTitle>
    <ContentTitle as="h2">{post.author} - {new Date(post.createdAt).toLocaleDateString()}</ContentTitle>
    <ContentTile className={`prose prose-aero  dark:prose-aero-dark prose-headings:text-center max-w-none ${font.className} prose-img:rounded-xl prose-img:m-auto `}>
      <MDXRemote source={post.content} options={mdxRemoteOptions} />
    </ContentTile>
	 </ContentCard>
}
