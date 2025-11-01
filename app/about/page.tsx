import ContentCard from "../ui/ContentCard";
import ContentTile from "../ui/ContentTile";
import ContentTitle from "../ui/ContentTitle";
import Leadership from "../data/leadership.json"
import DefaultProfile from "@/public/icons/frutiger_aero_avatar.webp"
import Image from "next/image"

/* Here we can put sections as separate components */

export default function AboutMe(): React.ReactNode {
  return <section className="flex flex-col gap-3 h-full">
    <ContentCard >
      <ContentTitle className="text-center">About Us</ContentTitle>
      <ContentTile >
        <p>
          The Computer Science Club at Harper College is a student-led organization dedicated to exploring technology, coding, and innovation.
          We provide a collaborative space for students interested in programming, cybersecurity, data science, game development, and emerging tech fields.
          Our mission is to build technical skills, foster teamwork, and connect members with industry professionals and campus resources.
          We host projects, guest talks, and peer-to-peer tutoring to help members apply what they learn in class to real-world challenges.
          Whether you're a beginner learning your first language or an experienced developer looking to share knowledge, the CS Club welcomes you. Join us to code, collaborate, and create together.
        </p>
        <p className="pt-3">
          We use Discord as our main communication hub.
          Members discuss coding topics, share resources, and collaborate on ongoing projects.
          It’s also where we plan events, organize meetings, and handle club operations such as voting and decision-making.
        </p>
        <p className="pt-3">
          <strong>
            For further inquiries or questions, please ping or direct-message any of our officers or advisors on Discord.
          </strong>
        </p>
      </ContentTile>
    </ContentCard>
    <ContentCard>
      <ContentTitle className="text-center">
        Central Committee
      </ContentTitle>
      <ContentTile className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-8 ">
        {
          // TODO: This is temporary
          Object.entries(Leadership).map(([role, person]) => <div key={role} className="flex flex-col items-center gap-3">
            <Image alt={`Avatar of ${role}`} src={(person.picture != null && person.picture.length > 0) ? person.picture : DefaultProfile.src} width={128} height={128} className="max-w-[128px] max-h-[128px] object-cover"></Image>
            <p className="text-center">{`${person.name}, ${role.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()).trim()}`}</p>
          </div>)
        }
      </ContentTile>
    </ContentCard>
  </section>
}
