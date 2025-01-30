import { MessageCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactSections() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <span>Product support.</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Get help from the community. If you're on a paid plan, submit a ticket to our support team.
          </p>
          <div className="flex items-center gap-4">
            <Button>Get Support</Button>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-sm text-muted-foreground">All systems normal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span>Talk to our Sales team.</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Discuss your requirements, learn about custom pricing, or request a demonstration.
          </p>
          <Button>Contact sales</Button>
        </CardContent>
      </Card>
    </div>
  )
}

