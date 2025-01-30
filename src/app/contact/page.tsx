import { ContactGrid } from "@/components/contact/contact-grid"
import { cn } from "@/lib"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import Container from "@/components/global/container"

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white">
      <Container className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
        <p className="z-10 whitespace-pre-wrap text-center text-6xl font-extrabold tracking-tighter text-white">
          Contact Us
        </p>
        <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-[#C4EA00]"
      />
      </Container>
      <ContactGrid />
    </div>
  )
}

