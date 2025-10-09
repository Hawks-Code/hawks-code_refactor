import { Button } from "@ariakit/react";
import DiscordLogo from "@/public/discord.png"


function HeaderNavLink({ ...props }: React.ComponentPropsWithRef<'a'>): React.ReactNode {
  return <a
    className={`bg-transparent hover:aero-bg-hover border-black h-full! transition-[background-color] transition-duration-200 ease-in-out px-3 cursor-pointer m-0 ${props.className}`} {...props}></a>
    ;
}

export default function HeaderBar(): React.ReactNode {
  return <nav className="flex-col items-center sm:flex-row aero-bg h-fit! w-full! text-background px-3 flex justify-center gap-3">
    <HeaderNavLink href="#">Home</HeaderNavLink>
    <HeaderNavLink href="#">About Us</HeaderNavLink>
    <HeaderNavLink href="#">Resources</HeaderNavLink>
  </nav>
}
