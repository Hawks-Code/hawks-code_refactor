import Logo from "@/public/logo.webp"

export default function Banner(): React.ReactNode {
  return <section className="flex flex-row justify-center aero-bg-white"><img src={Logo.src} className="w-[128px] h-[128px]"></img>
    </section>
}
