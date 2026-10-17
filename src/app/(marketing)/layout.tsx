import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import React from 'react';
import FloatingChatBot from "@/components/chatbot/FloatingChatBot";

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
               <FloatingChatBot />

                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout
