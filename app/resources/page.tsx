import { fileData, getMdFile, listMdFiles, } from "../lib/md_resources";
import path from "path"
import { MDXRemote } from "next-mdx-remote-client/rsc";
import ContentCard from "../ui/ContentCard";
import ContentTitle from "../ui/ContentTitle";
import ContentTile from "../ui/ContentTile";
import { Suspense } from "react";
import matter from "gray-matter";


export const revalidate = 300 // 5mins

export default async function ResourcesIndex(): Promise<React.ReactNode> {
  const files: fileData[] = await listMdFiles()
  return (
    <ContentCard>
      <ContentTitle>Resources</ContentTitle>
      <ContentTile className="prose prose-purple prose-headings:text-center max-w-none  ">
        <ol>
          {
            files.map((x) =>
              <li key={x.path} className="text-purple-400 dark:text-purple-500">
                <a href={`/resources/${x.slug}`}>{x.title}</a>
                </li>
            )
          }
        </ol>
      </ContentTile>
    </ContentCard>
  )
}

async function MdFile({ filePath }: { filePath: string }): Promise<React.ReactNode> {
  const mdData = matter(await getMdFile(filePath))
  return <MDXRemote source={mdData?.content ?? ""} />
  // return <p>{await getMdFile(fileContents)}</p>
}
