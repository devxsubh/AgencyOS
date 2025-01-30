import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface TemplateCardProps {
  title: string
  description: string
  image: string
  author: string
  categories: string[]
}

export function TemplateCard({ title, description, image, author }: TemplateCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-700 bg-background transition-colors">
      <div className="aspect-[2/1] relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">by</span>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4">
                {/* <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
                </svg> */}
                <Image
                src={'/icons/icon.avif'}
                alt={'wonder'}
                width={100}
                height={100}
                className="py-[2px]"
                />
              </div>
              <span className="text-sm font-medium">{author}</span>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      </div>
    </div>
  )
}