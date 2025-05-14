"use client"

import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import { useState } from "react"
import Loader from "@/components/marketing/loader";
import React from 'react';
import FloatingChatBot from "@/components/chatbot/FloatingChatBot";

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    const [hideLoader, setHideLoader] = useState(true)

    return (
        <>
            {hideLoader && <Loader setHideLoader={setHideLoader} />}
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
