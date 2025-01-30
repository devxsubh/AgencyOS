import { MessageCircle, Building2, Locate, MessageCircleMore, Mail} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Container from "../global/container"
import { useIsMobile } from "@/hooks/use-mobile"

export function ContactGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Top Grid */}
      <Container delay={0.1 + 1 * 0.1} className="grid md:grid-cols-2 gap-6">
        <Card className="bg-zinc-1000 border-zinc-800">
          <CardContent className="p-8">
            <MessageCircle className="h-8 w-8 mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Product support.</h2>
            <p className="text-zinc-400 mb-6">
              Get help from the community. If you're on a paid plan, submit a ticket to our support team.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="secondary" className="bg-[#c4ea00] text-black hover:bg-zinc-200">
                Get Support
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm text-zinc-400">All systems normal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-1000 border-zinc-800">
          <CardContent className="p-8">
            <Building2 className="h-8 w-8 mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Talk to our Sales team.</h2>
            <p className="text-zinc-400 mb-6">
              Discuss your requirements, learn about custom pricing, or request a demonstration.
            </p>
            <Button variant="secondary" className="bg-[#c4ea00] text-black hover:bg-zinc-200">
              Contact sales
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Bottom Grid */}
      <Container delay={0.1 + 2 * 0.1} className="grid md:grid-cols-3 gap-6">
        <Card className="bg-zinc-1000 border-zinc-800">
          <CardContent className="p-8">
            <Mail className="h-8 w-8 mb-6" />
            <h2 className="text-xl font-semibold mb-2">For any enquiry.</h2>
            <p className="text-zinc-400 mb-6">Email us support@wondercreativestudios.com Contact us +91 6362765811</p>
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800">
              Find an Expert
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-1000 border-zinc-800">
          <CardContent className="p-8">
            <Locate className="h-8 w-8 mb-6" />
            <h2 className="text-xl font-semibold mb-2">Company Location</h2>
            <p className="text-zinc-400 mb-6">South Bengaluru, Karnataka (560099)</p>
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800">
              Follow @wondercreative.studio
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-1000 border-zinc-800">
          <CardContent className="p-8">
            <MessageCircleMore className="h-8 w-8 mb-6" />
            <h2 className="text-xl font-semibold mb-2">Join our community.</h2>
            <p className="text-zinc-400 mb-6">For ideas related discussions, join our community forum.</p>
            {/* https://www.reddit.com/r/WonderInnovators/ */}
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800">
              View our Community forum
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Bottom CTA Section */}
      <Container delay={0.1 + 3 * 0.1} >
      <Card className="bg-zinc-1000 border-zinc-800 mt-12">
        <CardContent className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Ready to Grow?</h2>
            <p className="text-zinc-400">
              Start booking with a free consultancy. Speak to an expert for your <span className="text-blue-500">Pro</span>{" "}
              or <span className="text-purple-500">Enterprise</span> needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-[#c4ea00] text-black hover:bg-zinc-200">
              Start Now
            </Button>
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
      </Container>
    </div>
  )
}

