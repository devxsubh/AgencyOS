import type { FormData } from "./LeadForm"
import { Button } from "@/components/ui/button"

type Props = {
  formData: FormData
}

export function Submission({ formData }: Props) {
  const calculateLeadScore = (data: FormData): number => {
    let score = 0
    if (data.fullName && data.email && data.phoneNumber) score += 30
    if (data.companyName) score += 10
    if (data.website) score += 10
    if (data.services.length > 0) score += 20
    if (data.budget === "10000+") score += 30
    if (data.decisionMaker === "yes") score += 20
    return score
  }

  const leadScore = calculateLeadScore(formData)
  const isHighQualityLead = leadScore >= 80

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#c4ea00]">Thank You!</h2>
      <p className="text-white">Your form has been submitted successfully.</p>
      <p className="text-white">
        Lead Score: <span className="font-semibold text-primary">{leadScore}</span>
      </p>
      {isHighQualityLead ? (
        <div>
          <p className="text-white">We'd love to discuss your project in more detail.</p>
          <Button className="mt-4 bg-[#c4ea00] text-black hover:bg-primary/90">Schedule a Call</Button>
        </div>
      ) : (
        <p className="text-white">Thank you for your interest. We'll be in touch with more information shortly.</p>
      )}
    </div>
  )
}

