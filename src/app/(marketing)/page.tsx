import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
// import ServicesSection from "@/components/marketing/services-section";
import { FAQ } from "@/components/marketing/FaqsSection";
import AboutUs from "@/components/marketing/aboutus";
import ServiceProcess from "@/components/marketing/service-process";
import Reviews from "@/components/marketing/review";
import ServicesSection from "@/components/marketing/offering";

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
            {/* <Integration /> */}
            <Reviews/>
            <LanguageSupport />
            <CTA />
            <FAQ />
        </Wrapper>
    )
};

export default HomePage
