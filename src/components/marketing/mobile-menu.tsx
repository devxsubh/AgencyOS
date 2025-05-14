"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MobileMenu = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="right" 
                className="w-full sm:w-[300px] pt-12 bg-black/95 backdrop-blur-lg"
                onInteractOutside={() => setIsOpen(false)}
            >
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-left text-white">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-6">
                    <AnimatePresence>
                        {NAV_LINKS.map((link, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-base font-medium transition-colors hover:text-[#C4EA00] ${
                                        pathname === link.href ? 'text-[#C4EA00]' : 'text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.div 
                        className="pt-6 mt-6 border-t border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/leadform" className="w-full" onClick={() => setIsOpen(false)}>
                            <Button 
                                className="w-full bg-[#C4EA00] hover:bg-[#C4EA00]/90 text-black font-medium transition-all duration-300"
                                variant="default"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </nav>
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white hover:text-[#C4EA00]"
                    onClick={() => setIsOpen(false)}
                >
                    <X className="h-6 w-6" />
                </Button> */}
            </SheetContent>
        </Sheet>
    )
};

export default MobileMenu
