import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";
import ServicesSection from "@/components/marketing/services-section";
import Automate from "@/components/marketing/automate";
import { TextReveal } from "@/components/ui/text-reveal";
import Testimonials from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/FaqsSection";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import AboutUs from "@/components/marketing/aboutus";
import ServiceProcess from "@/components/marketing/service-process";

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            <Companies />
            <AboutUs />
            <ServicesSection />
            <Features />
            <Analysis />
            <ServiceProcess/>
            <Integration />
            {/* <Pricing /> */}
            
            <Testimonials />
            <LanguageSupport />
            <CTA />
            <FAQ />
        </Wrapper>
    )
};

export default HomePage
