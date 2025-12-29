"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"


export function Search({ placeholder, filterData }: { placeholder: string, filterData: Array<any> }): React.ReactNode {

  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log
  }, 300)

  return <div >
    <label htmlFor="search">
      Search
    </label>
    <input placeholder={placeholder}
      onChange={(e) => { handleSearch(e.target.value) }}
    >
    </input>
  </div>
}
