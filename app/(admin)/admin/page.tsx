"use client"
import AdminPanel from "@/app/ui/AdminPanel";
import ContentCard from "@/app/ui/ContentCard";
import ContentTile from "@/app/ui/ContentTile";
import ContentTitle from "@/app/ui/ContentTitle";
import { useState } from "react";
import AdminPostTab from "./ui/AdminPostTab";


const adminTabs = [
  {
    name: "Posts",
    disabled: false,
    content: <AdminPostTab/>
  },
  {
    name: "Content",
    disabled: false,
    content: <p>Lol</p>
  },
  {
    name: "User",
    disabled: false,
    content: <p>Lol</p>
  }
]

const logOut = () => {
  alert("logout")
}

export default function AdminPage(): React.ReactNode {
  const [activeTab, setActiveTab] = useState(adminTabs[0].name)
  return <section className="window active text-foreground ">
    <div className="title-bar">
      <div className="title-bar-text">Admin Panel</div>
      <div className="title-bar-controls">
        <button aria-label="Close" onClick={logOut}></button>
      </div>
    </div>
    <div className="window-body has-space">
      <section className="tabs">
        <menu role="tablist" aria-label="Admin Tabs">
          {adminTabs.map((x) => <button key={x.name} role="tab" aria-controls={x.name} disabled={x.disabled} onClick={() => setActiveTab(x.name)} aria-selected={activeTab === x.name}>{x.name}</button>)}
        </menu>
      {adminTabs.map(x => <article key={x.name} role="tabpanel" id={x.name} hidden={activeTab !== x.name}>{x.content}</article>)}
      </section>
    </div>
  </section>
}
