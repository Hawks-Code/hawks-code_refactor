import Image from "next/image";
import InstagramLogo from "@/public/instagram.png"
import DiscordLogo from "@/public/discord.png"

export default function Home() {
  return (
    <main className="aero-bg-gray  h-full! w-full!  justify-center items-center " >
      <div className="mx-[5px] sm:mx-[25vw] my-[50px] grid main-page-grid gap-6">
        <div className="[grid-area:welcome] aero-bg-white border-1 rounded-t-3xl shadow">
          <h1 className="text-center text-5xl aero-bg-white border-b-1 rounded-t-3xl">Welcome!</h1>
          <div className="aero-bg-white p-3">
          <p >
            Welcome to the Computer Science Club @ Harper College! Here you can view all materials, resources, information, and projects in relation to the Computer Science Club
          </p>
            <strong>Our Socials:</strong>
          <div className="flex flex-row justify-around text-center">
            <a href="https://discord.gg/MXRDZyhgaS" className="hover:aero-bg-white-hover p-3"><img src={DiscordLogo.src} className="w-[64px] h-[64px]"></img>Discord</a>
            <a href="https://discord.gg/MXRDZyhgaS" className="hover:aero-bg-white-hover p-3"><img src={InstagramLogo.src} className="w-[64px] h-[64px]"></img>Instagram</a>
          </div>
        </div>
        </div>
        <div className="[grid-area:info]  border-1 rounded-tl-xl shadow">
          <h2 className="text-center text-3xl aero-bg-white aero-bg-translucent! rounded-tl-xl border-b-1 flex flex-row gap-3 justify-center items-center"><img src={InstagramLogo.src} className="max-w-[32px] max-h-[32px]" />Instagram</h2>
          <p className="aero-bg-white p-3">lolkfpwwopewoprp</p>
        </div>
        <div className="[grid-area:img] aero-bg-white border-1 rounded-t-3xl shadow"><h1 className="text-center text-5xl">Welcome!</h1></div>
      </div>
    </main>
  )
}
