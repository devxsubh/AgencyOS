import type { FormData } from "./LeadForm"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
}

export function AdditionalDetails({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white mb-2 block">Have you worked with an agency before?</Label>
        <RadioGroup
          value={formData.workedWithAgency}
          onValueChange={(value) => updateFormData({ workedWithAgency: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="agency-yes"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="agency-yes" className="text-white">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="agency-no"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="agency-no" className="text-white">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label className="text-white mb-2 block">Are you the decision-maker?</Label>
        <RadioGroup
          value={formData.decisionMaker}
          onValueChange={(value) => updateFormData({ decisionMaker: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="decision-yes"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="decision-yes" className="text-white">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="decision-no"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="decision-no" className="text-white">
              No
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="need-approval"
              id="decision-approval"
              className="border-gray-300 text-primary focus:border-primary focus:ring-primary"
            />
            <Label htmlFor="decision-approval" className="text-white">
              Need approval from others
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="hearAboutUs" className="text-white mb-2 block">
          How did you hear about us?
        </Label>
        <Select onValueChange={(value) => updateFormData({ hearAboutUs: value })}>
          <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="social-media">Social Media</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="additionalComments" className="text-white mb-2 block">
          Any additional comments or requirements?
        </Label>
        <Textarea
          id="additionalComments"
          value={formData.additionalComments}
          onChange={(e) => updateFormData({ additionalComments: e.target.value })}
          rows={4}
          className="border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>
    </div>
  )
}

