import type { FormData } from "./LeadForm"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
}

const services = [
  "Website Development",
  "Mobile App Development",
  "Branding & Design",
  "Performance Marketing",
  "SEO Optimization",
  "Automated Business Solutions",
  "AI-Driven Sales Processes",
  "Other",
]

export function ServiceInterest({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white mb-2 block">Which service(s) are you interested in?</Label>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services.includes(service)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData({ services: [...formData.services, service] })
                  } else {
                    updateFormData({ services: formData.services.filter((s) => s !== service) })
                  }
                }}
                className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
              />
              <Label htmlFor={service} className="text-white">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-white mb-2 block">Do you have an existing website/app that needs improvement?</Label>
        <RadioGroup
          value={formData.existingWebsite}
          onValueChange={(value) => updateFormData({ existingWebsite: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="existing-yes"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="existing-yes" className="text-white">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="existing-no"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="existing-no" className="text-white">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="primaryGoal" className="text-white mb-2 block">
          What is your primary goal with this service?
        </Label>
        <Select onValueChange={(value) => updateFormData({ primaryGoal: value })}>
          <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand-awareness">Increase brand awareness</SelectItem>
            <SelectItem value="generate-leads">Generate more leads</SelectItem>
            <SelectItem value="improve-presence">Improve online presence</SelectItem>
            <SelectItem value="automate-processes">Automate business processes</SelectItem>
            <SelectItem value="increase-sales">Increase sales</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-white mb-2 block">What is your estimated budget?</Label>
        <RadioGroup
          value={formData.budget}
          onValueChange={(value) => updateFormData({ budget: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="under-1000"
              id="budget-1"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="budget-1" className="text-white">
              Under $1,000
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="1000-5000"
              id="budget-2"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="budget-2" className="text-white">
              $1,000 – $5,000
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="5000-10000"
              id="budget-3"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="budget-3" className="text-white">
              $5,000 – $10,000
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="10000+"
              id="budget-4"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="budget-4" className="text-white">
              $10,000+
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="timeline" className="text-white mb-2 block">
          What is your project timeline?
        </Label>
        <Select onValueChange={(value) => updateFormData({ timeline: value })}>
          <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
            <SelectValue placeholder="Select a timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">ASAP</SelectItem>
            <SelectItem value="1-3-months">1-3 months</SelectItem>
            <SelectItem value="3-6-months">3-6 months</SelectItem>
            <SelectItem value="6+-months">6+ months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

