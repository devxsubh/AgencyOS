import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import LanguageSupport from "@/components/marketing/lang-support";
import { FAQ } from "@/components/marketing/FaqsSection";
import AboutUs from "@/components/marketing/aboutus";
import ServiceProcess from "@/components/marketing/service-process";
import Reviews from "@/components/marketing/review";
import ServicesSection from "@/components/marketing/offering";
import { Connect } from "@/components/marketing/Industry";
import { BentoGridGalleryDemo } from "@/components/marketing/gallery";
import { LogosSlider } from "@/components/marketing/demo";
import FloatingChatBot from "@/components/chatbot/FloatingChatBot";

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            <Companies />
            {/* <LogosSlider/> */}
            {/* <GraphAnimation/> */}
            <AboutUs />
            <ServicesSection />
            {/* <BentoGridGalleryDemo/> */}
            <Features />
            <Analysis />
            <ServiceProcess/>
            <Reviews/>
            <LanguageSupport />
            <Connect/>
            <FAQ />
        </Wrapper>
    )
};

export default HomePage
