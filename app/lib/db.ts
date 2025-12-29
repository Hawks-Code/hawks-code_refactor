// import Database from "better-sqlite3"
// import { fileData } from "./md_resources";
// import path from "path";
// import fsSync from "fs"

// export const dbPath = path.join(process.cwd(), "app/lib/db.sql")

// let db: Database.Database | undefined =  globalThis.dbGlobal ?? undefined;

// export const getDb = () => {
//   if (!db) {
//     db = new Database(dbPath, { verbose: console.debug })
//     db.pragma("journal_mode = WAL")
//     db.pragma("foreign_keys = ON")

//     // Read from schema
//     executeSchema(db, path.join(process.cwd(), "app/lib/schema.sql"))
//   }
//   return db
// }

// function executeSchema(db: Database.Database, schema: string) {
//   db.exec(fsSync.readFileSync(schema, "utf-8"))
// }


// interface CRUDInsertOptions {
//   upsert: boolean
// }
// // interface CRUDReadOptions {
// // }
// // interface CRUDDeleteOptions {
// // }

// /* Time to do crud operations */

// interface CRUDTable<TableData> {
//   create(data: TableData, params: CRUDInsertOptions): number;
//   read(id: string): TableData | null;
//   update(data: TableData): number;
//   delete(id: string): void;
//   all(): TableData[];
// }

// interface JunctionTable {
//   idName: string,
//   name: string
// }

// class ResourceTable implements CRUDTable<fileData> {
//   readonly resourceTables: JunctionTable[] = [
//     {
//       idName: "tag",
//       name: "tags"
//     },
//     {
//       idName: "concept",
//       name: "concepts"
//     },
//     {
//       idName: "language",
//       name: "languages"
//     },
//     {
//       idName: "technology",
//       name: "technologies"
//     },
//   ]
//   private _db: Database.Database = getDb();
//   public create(data: fileData, params?: CRUDInsertOptions): number {
//     const transaction = this._db.transaction((data: fileData) => {
//       const result = this._db.prepare(`INSERT INTO resources(
//       slug, path, content, title, author, course, published, last_modified, created_at, indexed_at, metadata
//       ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
//       ${params?.upsert ? `
//       ON CONFLICT(slug) DO UPDATE SET
//         path = excluded.path,
//         content = excluded.content,
//         title = excluded.title,
//         author = excluded.author,
//         course = excluded.course,
//         published = excluded.published,
//         last_modified = excluded.last_modified,
//         indexed_at = excluded.indexed_at,
//         metadata = excluded.metadata
//         `: ''}
//       RETURNING id
//         `
//       ).get(
//         [
//           data.slug,
//           data.path,
//           data.content,
//           data.title,
//           data.author ?? "CS Club",
//           data.course || null,
//           data.published ? 1 : 0,
//           data.lastModified,
//           data.createdAt,
//           Date.now(),
//           JSON.stringify(data.metadata)
//         ]
//       ) as { id: number }
//       const upsertJunctionTable = (items: string[], junctionTable: JunctionTable) => {
//         this._db.prepare(`DELETE FROM resources_${junctionTable.name} WHERE resource_id = ?`).run(result.id)
//         const itemInsertStmt = this._db.prepare(`
//           INSERT INTO ${junctionTable.name}(name) VALUES(?)
//           ON CONFLICT(name) DO UPDATE SET name = excluded.name
//           RETURNING id
//         `)

//         const updateJunctionStmt = this._db.prepare(`
//           INSERT INTO resources_${junctionTable.name}(resource_id, ${junctionTable.idName}_id)
//           VALUES (?,?)
//         `)
//         for (const item of items) {
//           const itemResult = itemInsertStmt.get(item) as { id: number }
//           console.debug(result.id, itemResult.id)
//           updateJunctionStmt.run(result.id, itemResult.id)
//         }
//       }
//       upsertJunctionTable(data.tags, this.resourceTables[0])
//       upsertJunctionTable(data.concepts, this.resourceTables[1])
//       upsertJunctionTable(data.languages, this.resourceTables[2])
//       upsertJunctionTable(data.technologies, this.resourceTables[3])
//       return Number(result.id)
//     })
//     return transaction(data)
//   }
//   public read(slug: string): fileData | null {
//     const file: any = this._db.prepare(`SELECT * FROM resources r WHERE slug = ?`).get(slug)
//     if (!file) { return null }
//     const getRelations = (junctionTable: JunctionTable): string[] => {
//       return this._db.prepare(`
//     SELECT t.name FROM ${junctionTable.name} t
//     JOIN resources_${junctionTable.name} jt ON t.id = jt.${junctionTable.idName}_id
//     WHERE jt.resource_id = ?
//   `).all(file.id).map((r: any) => r.name);
//     }
//     const tags = getRelations(this.resourceTables[0])
//     const concepts = getRelations(this.resourceTables[1])
//     const languages = getRelations(this.resourceTables[2])
//     const technologies = getRelations(this.resourceTables[3])
//     return {
//       slug: file.slug,
//       content: file.content,
//       metadata: JSON.parse(file.metadata || "{}"),
//       tags,
//       languages,
//       technologies,
//       concepts,
//       course: file.course,
//       title: file.title,
//       author: file.author,
//       lastModified: file.last_modified,
//       createdAt: file.created_at,
//       published: file.published === 1,
//       path: file.path
//     }
//   }
//   public update(data: fileData): number {
//     return this.create(data, { upsert: true })
//   }
//   public delete(slug: string): void {
//     this._db.prepare("DELETE FROM resources WHERE slug = ?").run(slug)
//   }

//   public all(): fileData[] {
//     return this._db.prepare("SELECT * FROM resources").all() as fileData[]
//   }

//   // Our own implementation
// }

// declare const globalThis: {
//   dbGlobal: ReturnType<typeof getDb>;
//   resourceTableInstance: ResourceTable;
// } & typeof global


// export const resourceTableInstance = globalThis.resourceTableInstance ?? new ResourceTable();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.resourceTableInstance = resourceTableInstance
//   globalThis.dbGlobal = db
// }

