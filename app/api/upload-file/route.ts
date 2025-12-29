import matter from "gray-matter"
import fs from "fs/promises"
import path from "path"
import { supabase } from "@/app/lib/supabase";

const imgRegex = /!\[([^\]]*)\]\(\s*(?!https?:\/\/|\/\/|data:)(?:<([^>]+)>|([^)\s]+))(?:\s+["']([^"']*)["'])?\s*\)/g;

/*
1 — alt text (may be empty)

2 — src when written as <...> (allows spaces)

3 — src when written without angle brackets (no spaces)

4 — optional title (without surrounding quotes)
*/

export async function POST(_request: Request, params: { filePath?: string }) {
  if (!params.filePath) {
    return new Response("filePath not given", { status: 400 })
  }
  const file = await fs.readFile(params.filePath, { encoding: "utf8" })
  const parsedFile = matter(file)
  for (const match of imgRegex.exec(parsedFile.content) ?? []) {
    const { data, error } = await supabase.storage.from("media").upload(`/${path.basename(match[3])}`, await fs.readFile(match[3], { encoding: "binary" }))
    if (error) {
      return new Response(`${error.cause}:${error.message}`, { status: 503 })
    }
  }
  return new Response("", { status: 200 })
}
