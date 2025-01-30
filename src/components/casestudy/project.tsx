import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PreviewCard } from "./preview-card"

export default function Project() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/casestudy" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
          ← Back to Portfolio
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-foreground" />
              <span className="text-muted-foreground">vercel/vercel</span>
            </div>

            <h1 className="text-4xl font-bold">Next.js Boilerplate</h1>
            <p className="text-xl text-muted-foreground">Get started with Next.js and React in seconds.</p>

            <div className="flex gap-4">
              <Button size="lg">Deploy</Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>

            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Framework</dt>
                <dd>Next.js</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Use Case</dt>
                <dd>Starter</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">CSS</dt>
                <dd>CSS Modules</dd>
              </div>
            </dl>
          </div>

          <div>
            <PreviewCard />
          </div>
        </div>
      </main>
    </div>
  )
}

