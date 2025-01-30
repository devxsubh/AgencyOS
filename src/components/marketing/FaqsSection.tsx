import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Container from "../global/container";

const faqData = [
  {
    question: "What services does Wonder Creative Studio offer?",
    answer:
      "We specialize in website development, app development, digital marketing, branding, automation, and customer support. We also provide business development consultations and white-labeled solutions like GoHighLevel.",
  },
  {
    question: "What industries do you cater to?",
    answer:
      "We work with diverse industries, including real estate, healthcare, e-commerce, IT, education, and hospitality, offering tailored solutions for each sector.",
  },
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline depends on the complexity of the project. A basic website may take 2-4 weeks, while custom or e-commerce websites could take 6-8 weeks.",
  },
  {
    question: "What types of apps do you develop?",
    answer:
      "We develop native and cross-platform apps using frameworks like Flutter. Whether it's an e-commerce app, booking system, or social networking app, we can handle it.",
  },
  {
    question: "What digital marketing services do you offer?",
    answer:
      "We provide performance marketing (Google and Meta ads), SEO, social media management, email campaigns, content marketing, and more.",
  },
  {
    question: "Can you help with branding and design?",
    answer:
      "Absolutely! We specialize in creating unique brand identities, including logo design, UI/UX, and marketing collateral to establish a strong presence.",
  },
  {
    question: "What is your GoHighLevel white-labeled solution?",
    answer:
      "Our GoHighLevel white-labeled CRM offers automation for lead nurturing, email/WhatsApp campaigns, and client management to streamline your business processes.",
  },
  {
    question: "Do you offer custom-coded websites or CMS-based solutions?",
    answer:
      "Yes, we provide both custom-coded websites for unique needs and CMS-based solutions like WordPress, depending on your requirements and budget.",
  },
  {
    question: "Do you offer maintenance and updates for the apps you develop?",
    answer:
      "Yes, we provide ongoing support, updates, and maintenance to ensure your app runs smoothly.",
  }
];

export const FAQ = () => (
  <div className="w-full py-20 lg:py-20">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-10">
       <Container>
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge className="text-gray-900 bg-[#c4ea00]">FAQ</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-medium">
                Frequently Asked Questions
              </h4>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Have any questions about our services? Browse through our FAQs or reach out to us for more details.
              </p>
            </div>
            <div>
              <Button className="gap-4 bg-[#c4ea00] text-gray-900" variant="outline">
                Any questions? Reach out <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        </Container>
        <Container delay={0.4}>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Container>
      </div>
    </div>
  </div>
);
