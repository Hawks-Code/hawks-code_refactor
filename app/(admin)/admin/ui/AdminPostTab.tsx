"use client"

import { Database, Tables } from "@/app/lib/db.types"
import { createClient } from "@/app/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"
import { Suspense, useEffect, useMemo, useState } from "react"
import { createContext } from "react"

type ResourcePost = Database["public"]["Tables"]["resources"]["Row"]

interface PostsContextState {
  // supabase: SupabaseClient<Database>,
  resourcePosts: ResourcePost[],
  loading: boolean
}

const PostsContext = createContext<PostsContextState | undefined>(undefined)

function PostsContextProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const [resourcePosts, setResourcePosts] = useState<ResourcePost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from("resources").select("*")
      setResourcePosts(data || [])
      setLoading(false)
    }

    fetchPosts()

    // const channel = await supabase.channel("resources_changes")
  })
  return <PostsContext.Provider value={{ resourcePosts, loading }}>
    {children}
  </PostsContext.Provider>
}


export default function AdminPostTab(): React.ReactNode {
  const supabase = createClient()
  return <div>
    <h1 className="text-xl">Posts</h1>
    <Suspense >
    </Suspense>
  </div>
}
