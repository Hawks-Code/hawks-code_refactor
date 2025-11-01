import Logo from "@/public/logo.webp"
import Image from "next/image"

export default function Banner(): React.ReactNode {
  return <section className="flex flex-row justify-center aero-bg-white"><Image alt="Harper CS Club Logo" src={Logo.src} width={128} height={128} className="w-[128px] h-[128px] dark:invert-25"></Image>
    </section>
}
