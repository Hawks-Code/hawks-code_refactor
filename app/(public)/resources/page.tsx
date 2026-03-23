import ContentCard from "@/app/ui/ContentCard";
import ContentTitle from "@/app/ui/ContentTitle";
import ContentTile from "@/app/ui/ContentTile";
import { Search } from "@/app/ui/Search";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/app/utils/supabase/server";
import NotFound from "@/app/(public)/not-found";



// export const revalidate = 300 // 5mins

export default async function ResourcesIndex(): Promise<React.ReactNode> {
  const supabase = await createClient()
  const { data } = await supabase.from('resources').select().eq("slug", "i-love-markdown")
  if (!data) {
    return <NotFound />
  }
  return (
    <ContentCard>
      <ContentTitle>Resources</ContentTitle>
      <ContentTile className="prose prose-purple prose-headings:text-center max-w-none  ">
        <Suspense>
          <Search placeholder="Lol" filterData={data}></Search>
        </Suspense>
        <ol>
          {
            data.map((x) => <li key={x.slug}><Link href={`/resources/${x.slug}`}>{x.title}</Link></li>)
          }
        </ol>
      </ContentTile>
    </ContentCard>
  )
}

