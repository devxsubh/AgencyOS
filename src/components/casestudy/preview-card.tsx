import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

//PreviewCardProp
type PreviewCardProps = {
  imgage: string
  name: string
  description: string
  frameworks: string[]
  useCase: string
  link: string
}

export function PreviewCard() {
  return (
    <Card className="overflow-hidden">
      <div className="p-8">
        <div className="aspect-[2/1] relative">
          <Image
            src={'/images/dashboard.png'}
            alt="Next.js Logo"
            fill 
            className="object-cover"
          />
        </div>
        <div className="space-y-4 font-mono text-sm">
          <p>
            1. Get started by editing <code>app/page.tsx</code>
          </p>
          <p>2. Save and see your changes instantly.</p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button>Deploy now</Button>
          <Button variant="outline">Read our docs</Button>
        </div>
        <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
          <span>◆ Learn</span>
          <span>◇ Examples</span>
          <span>⤴ Go to nextjs.org</span>
        </div>
      </div>
    </Card>
  )
}

