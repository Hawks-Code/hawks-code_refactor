import Link from "next/link";
import ContentCard from "@/app/ui/ContentCard";
import ContentTile from "@/app/ui/ContentTile";
import ContentTitle from "@/app/ui/ContentTitle";
import VistaWarning from "@/public/icons/vista_warning.ico"
import NotFound404 from "@/public/icons/404.png"
import Image from "next/image"
import NotFoundReal from "@/app/(public)/not-found";
import RootLayout from "@/app/(public)/layout";



export default function NotFound(): React.ReactNode {
  return <RootLayout><NotFoundReal /></RootLayout>
}
