import Link from "next/link";
import ContentCard from "./ui/ContentCard";
import ContentTile from "./ui/ContentTile";
import ContentTitle from "./ui/ContentTitle";
import VistaWarning from "@/public/icons/vista_warning.ico"
import NotFound404 from "@/public/icons/404.png"
import Image from "next/image"

export default function NotFound(): React.ReactNode {
  return <section className="flex flex-col gap-3 h-full">
    <ContentCard>
      <ContentTitle className="flex flex-row justify-center items-center gap-3 aero-bg-red text-white">
        <Image alt="Warning symbol" width={64} height={64} src={VistaWarning.src} /> HTTP Error 404
      </ContentTitle>
      <ContentTile className="flex flex-col items-center  ">
        {//<Image alt="404 image" src={NotFound404.src} width={500} height={500}/>
        }
        Unfortunately the page was not found. Maybe the content was moved?
        <Link href="/" className="text-xl"><strong>Return Home</strong></Link>
      </ContentTile>
    </ContentCard>
  </section>

}
