import { PathLike } from "fs";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify"
export const MARKDOWN_RESOURCE_PATH =
  process.env.MARKDOWN_RESOURCE_PATH ?? path.join(process.cwd(), "public", "md")


export async function listMdFiles(
  mdPath: PathLike = MARKDOWN_RESOURCE_PATH,
): Promise<fileData[]> {
  try {
    const files = await fs.readdir(mdPath, { recursive: true });
    return Promise.all(files
      .filter((x) => {
        const ext = path.extname(x);
        return ext === ".md" || ext === ".mdx";
      })
      .map((x) => path.join(mdPath.toString(), x))
      .map(async (x) => await getMdFile(x)))
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      switch (error.code as string) {
        case "ENOENT":
          throw new Error(`Path ${mdPath} does not exist`);
        case "EACCES":
          throw new Error(`Permission denied to open ${mdPath}`);
      }
    }
    throw new Error(`Unable to open directory: ${mdPath}`);
  }
}

export async function getMdFile(filePath: PathLike): Promise<fileData> {
  try {
    const file = await fs.readFile(filePath, { encoding: "utf8" });
    const mdData = matter(file)
    const stat = await fs.stat(filePath)
    const title = mdData.data.title ?? path.basename(filePath.toString(), path.extname(filePath.toString()))
    return {
      slug: slugify(title, { lower: true, strict: true }),
      content: mdData.content,
      metadata: mdData.data,
      title,
      author: mdData.data.author ?? "CS Club",
      technologies: mdData.data.technologies ?? [],
      concepts: mdData.data.concepts ?? [],
      languages: mdData.data.languages ?? [],
      course: mdData.data.course,
      tags: mdData.data.tags ?? [],
      lastModified: stat.mtimeMs,
      createdAt: stat.ctimeMs,
      published: mdData.data.published,
      path: filePath.toString()
    }
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      switch (error.code as string) {
        case "ENOENT":
          throw new Error(`File ${filePath} does not exist`);
        case "EACCES":
          throw new Error(`Permission denied to open ${filePath}`);
      }
    }
    throw new Error(`Unable to open file: ${filePath}`);
  }
}


export interface fileData {
  slug: string;
  content: string;
  metadata: Record<string, any>;
  tags: string[];
  languages: string[];
  technologies: string[];
  concepts: string[];
  course: string | undefined;
  title: string;
  author: string;
  lastModified: number;
  createdAt: number;
  published: boolean;
  path: string;
}

// export class MarkdownCache {
//   private _cache: Map<string, cacheData> = new Map();
//   constructor(filePath: PathLike) {
//     this.generateCache(filePath);
//   }
//   private async _generateCache(filePath: PathLike) {
//     const i = filePath.toString();
//     const extName: string = path.extname(i);
//     if (extName !== (".mdx" as string) && extName !== (".md" as string)) {
//       console.log(path.extname(i));
//       return;
//     }
//     const mdMatter = matter(await getMdFile(i));
//     const content = (
//       await gzipPromise(Buffer.from(mdMatter.content, "utf8"))
//     ).toString("base64");
//     const metadata = mdMatter.data;
//     const lastModified = (await fs.stat(i)).mtimeMs;
//     const hash = crypto
//       .createHash("md5")
//       .update(mdMatter.content)
//       .digest("hex");
//     const cache: cacheData = {
//       hash,
//       content,
//       metadata,
//       lastModified,
//       path: i,
//     };
//     console.debug(cache, "l");
//     this._cache.set(path.basename(i, path.extname(i)), cache);
//   }
//   public async generateCache(filePath: PathLike) {
//     const dir = await fs.readdir(filePath, { recursive: true });
//     for (const i of dir) {
//       await this._generateCache(path.join(filePath.toString(), i));
//     }
//   }
//   public async get(
//     slug: string,
//   ): Promise<{ metadata: Record<string, any>; content: string } | undefined> {
//     const file = this._cache.get(slug);
//     if (!file) {
//       return undefined;
//     }
//     if ((await fs.stat(file.path)).mtimeMs != file.lastModified) {
//       console.error(`Cache is invalid, regenerating`);
//       await this._generateCache(file.path);
//       return this.get(slug);
//     }
//     return {
//       metadata: file.metadata,
//       content: (
//         await gunzipPromise(Buffer.from(file.content, "base64"))
//       ).toString("utf8"),
//     };
//   }
//   public async saveCache(path: PathLike) { }
//   public async loadCache(path: PathLike) { }
//   get empty(): boolean {
//     return this._cache.size <= 0
//   }
// }

// export const mdCacheInstance = new MarkdownCache("/home/troyd/projects/hawks-code_refactor/public/md");
