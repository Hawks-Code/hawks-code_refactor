import Image from "next/image";
import InstagramLogo from "@/public/instagram.png"
import DiscordLogo from "@/public/discord.png"
import { ElementType } from "react";
import ContentCard from "./ui/ContentCard";
import ContentTitle from "./ui/ContentTitle";
import ContentTile from "./ui/ContentTile";
import Grids from "./style/grid.module.css";




export default function Home() {
  return <section className={`grid ${Grids['main-page-grid']} gap-6`}>
    <ContentCard gridArea="welcome">
      <ContentTitle as="h1">Welcome!</ContentTitle>
      <ContentTile>
        <p>
          Welcome to the Computer Science Club at Harper College! Here you can view all materials, resources, information, and projects in relation to the Computer Science Club.
          We are the club for those who want to explore game development, software engineering, web development, and artifical intelligence.
          We welcome everyone, regardless of the experience, major, or skill. We only require interest!
        </p>
      </ContentTile>
    </ContentCard>
    <ContentCard gridArea="meeting-time">
      <ContentTitle as="h2">Meeting times</ContentTitle>
      <ContentTile>
        <p>
          We meet every Wednesday at 4:30PM CST in room D156.
        </p>
      </ContentTile>
    </ContentCard>
    <ContentCard gridArea="socials">
      <ContentTitle as="h2">Our Socials</ContentTitle>
      <ContentTile className="flex flex-row justify-around text-center">
        <a href="https://discord.gg/MXRDZyhgaS" className="hover:aero-bg-white-hover p-3"><img src={DiscordLogo.src} className="w-[64px] h-[64px]"></img>Discord</a>
        <a href="https://discord.gg/MXRDZyhgaS" className="hover:aero-bg-white-hover p-3"><img src={InstagramLogo.src} className="w-[64px] h-[64px]"></img>Instagram</a>
      </ContentTile>
    </ContentCard>
    <ContentCard gridArea="info">
      <ContentTitle as="h2" className="flex flex-row gap-3 justify-center items-center">
        <img src={InstagramLogo.src} className="max-w-[32px] max-h-[32px]" />
        Feed
      </ContentTitle>
    </ContentCard>
    <ContentCard gridArea="img" className="rounded-3xl!">
    </ContentCard>
  </section>
}
