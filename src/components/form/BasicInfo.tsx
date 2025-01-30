import type { FormData } from "./LeadForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
}

export function BasicInfo({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-white">
          Full Name *
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          required
          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-white">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber" className="text-white">
          Phone Number *
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          required
          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="companyName" className="text-white">
          Company Name
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateFormData({ companyName: e.target.value })}
          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="website" className="text-white">
          Website
        </Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => updateFormData({ website: e.target.value })}
          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
    </div>
  )
}


