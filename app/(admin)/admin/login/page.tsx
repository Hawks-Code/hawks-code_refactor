"use client"
import { createClient } from "@/app/utils/supabase/client"
import { useState } from "react"
import z from "zod"

const loginStruct = z.object({
  email: z.string(),
  password: z.string()
})

function logOut() { }



export default function AdminLoginPage(): React.ReactNode {
  const [loginError, setloginError] = useState<string>("")
  async function login(form: FormData) {
    const supabase = createClient()
    console.debug("login called", form)
    const formUser = await loginStruct.parseAsync({ email: form.get("email"), password: form.get("password") })
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formUser.email,
      password: formUser.password
    })
    if (error) {
      setloginError(error.message)
    }
  }
  return <section className="md:mx-[15vw] sm:mx-0 window active text-foreground">
    <div className="title-bar">
      <div className="title-bar-text">Login</div>
      <div className="title-bar-controls">
        <button aria-label="Close" disabled onClick={logOut}></button>
      </div>
    </div>
    <div className="window-body has-space">
      <p>Please login to your crededentials.</p>
      <p><em>Users must be active contributers to the CS Club, contact a club officer for access.</em></p>
      <form className="grid grid-cols-2 gap-x-[6px] p-3">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="password" />
        <section className="flex justify-end gap-[6px]">
          <button className="button" formAction={login}>
            Login
          </button>
          <button className="button" onClick={() => { alert("Nyaaaa :3") }}>
            Nyaaaa :3
          </button>
        </section>
      </form>
    {loginError.length >0 ? 
    <p className="text-red-500">Login crededentials incorrect!</p>
      : <></>}
    </div>
  </section>
}
