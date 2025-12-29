import Banner from "../ui/Banner";
import FooterBar from "../ui/FooterBar";
import HeaderBar from "../ui/HeaderBar";
import { NunitoSans } from "./layout";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.className}`}>
      <body
        className="antialiased text-foreground dark:text-foregroundDark m-0 min-h-screen">
        <header>
          <Banner />
          <HeaderBar>
            <HeaderNavLink href="/">Home</HeaderNavLink>
            <HeaderNavLink href="/about">About Us</HeaderNavLink>
            <HeaderNavLink href="/resources">Resources</HeaderNavLink>
            <HeaderNavLink href="/projects">Projects</HeaderNavLink>
          </HeaderBar>
        </header>
        <main className="aero-bg-gray min-h-screen!  min-w-full  justify-center items-center ">
          <div className="mx-[5px] sm:mx-[25vw] py-[50px]">
            {children}
          </div>
        </main>
        <footer>
          <FooterBar />
        </footer>
      </body>
    </html>
  );
}
