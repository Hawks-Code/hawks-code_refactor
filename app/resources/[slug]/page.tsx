import { listMdFiles } from "@/app/lib/md_resources"
import NotFound from "@/app/not-found"
import ContentCard from "@/app/ui/ContentCard"
import ContentTile from "@/app/ui/ContentTile"
import ContentTitle from "@/app/ui/ContentTitle"
import { MDXRemote } from "next-mdx-remote-client/rsc"
import { DotGothic16 } from "next/font/google"


const font = DotGothic16({weight: "400"})

export const revalidate=60

export async function generateStaticParams() {
  const posts = await listMdFiles()
  return posts.map((x) => ({
    slug: x.slug
  }))
}

export default async function ResourcePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = (await listMdFiles()).find(x => x.slug === slug)
  if (!post) {
    return <NotFound />
  }
  return <ContentCard>
    <ContentTitle>{post.title}</ContentTitle>
    <ContentTitle as="h2">{post.author} - {new Date(post.createdAt).toLocaleDateString()}</ContentTitle>
    <ContentTile className={`prose prose-aero prose-lg dark:prose-aero-dark prose-headings:text-center max-w-none ${font.className} `}>
      <MDXRemote source={post.content} />
    </ContentTile>
  </ContentCard>
}
