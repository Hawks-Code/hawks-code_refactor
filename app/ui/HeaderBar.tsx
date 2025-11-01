import { Button } from "@ariakit/react";
import DiscordLogo from "@/public/icons/discord.png"
import Link from "next/link";


function HeaderNavLink({ ...props }: React.ComponentPropsWithRef<typeof Link>): React.ReactNode {
  return <Link
    className={`bg-transparent hover:aero-bg-hover hover:inset-shadow-sm border-black h-full! transition-all transition-duration-200 ease-in-out px-3 cursor-pointer m-0 ${props.className}`} {...props}></Link>
    ;
}

export default function HeaderBar(): React.ReactNode {
  return <nav className="flex-col items-center sm:flex-row aero-bg h-fit! w-full! text-alt-foreground  px-3 flex justify-center gap-3">
    <HeaderNavLink href="/">Home</HeaderNavLink>
    <HeaderNavLink href="/about">About Us</HeaderNavLink>
    <HeaderNavLink href="/resources">Resources</HeaderNavLink>
    <HeaderNavLink href="/projects">Projects</HeaderNavLink>
  </nav>
}
