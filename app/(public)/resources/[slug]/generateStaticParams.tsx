import { listMdFiles } from "@/app/lib/md_resources";
import fs from "fs/promises";
import path from "path";


export async function generateStaticParams() {
  // const posts =  resourceTableInstance.all()
  const posts = await listMdFiles();
  // Write cache file
  const file = await fs.open(path.join(process.cwd(), "public", "resources_cache.json")); (await file).write(JSON.stringify(Object.fromEntries(Object.entries(posts).filter(([key]) => key !== "content"))));
  return posts.map((x) => ({
    slug: x.slug
  }));
}
