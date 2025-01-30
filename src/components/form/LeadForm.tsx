"use client"

import { useState } from "react"
import { BasicInfo } from "./BasicInfo"
import { ServiceInterest } from "./ServiceInterest"
import { AdditionalDetails } from "./AdditionalDetails"
import { Submission } from "./Submission"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export type FormData = {
  fullName: string
  email: string
  phoneNumber: string
  companyName: string
  website: string
  services: string[]
  existingWebsite: string
  primaryGoal: string
  budget: string
  timeline: string
  workedWithAgency: string
  decisionMaker: string
  hearAboutUs: string
  additionalComments: string
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  website: "",
  services: [],
  existingWebsite: "",
  primaryGoal: "",
  budget: "",
  timeline: "",
  workedWithAgency: "",
  decisionMaker: "",
  hearAboutUs: "",
  additionalComments: "",
}

export function LeadForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const steps = [
    <BasicInfo key="basic" formData={formData} updateFormData={updateFormData} />,
    <ServiceInterest key="service" formData={formData} updateFormData={updateFormData} />,
    <AdditionalDetails key="additional" formData={formData} updateFormData={updateFormData} />,
    <Submission key="submission" formData={formData} />,
  ]

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#C4EA00] p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {step === 0
            ? "Let's Get Started"
            : step === 1
              ? "Tell Us About Your Needs"
              : step === 2
                ? "A Few More Details"
                : "Thank You!"}
        </h2>

        <Progress value={(step / (steps.length - 1)) * 100} className="bg-white/30" 
        //@ts-ignore
        indicatorClassName="bg-white" />
      </div>
      <div className="p-6">
        {steps[step]}
        <div className="mt-6 flex justify-between">
          {step > 0 && step < steps.length - 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Previous
            </Button>
          )}
          {step < steps.length - 1 && (
            <Button onClick={nextStep} className="ml-auto bg-[#C4EA00] text-gray-700 hover:bg-primary/90">
              {step === steps.length - 2 ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

