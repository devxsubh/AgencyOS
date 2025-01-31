import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-7xl mx-auto lg:pt-32">
            <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
                <Container>
                    <div className="flex flex-col items-start justify-start md:max-w-[250px]">
                        <div className="flex items-center gap-2">
                            {/* <Icons.icon className="w-auto h-5" /> */}
                            <Image
                            src="/icons/icon.avif"
                            alt="Vetra logo"
                            width={24}
                            height={24}
                            className="w-8"
                            />
                            <span className="text-base md:text-lg font-medium text-foreground">
                                Wonder
                            </span>
                        </div>
                        <p className="text-muted-foreground mt-4 text-sm text-start">
                           Empowering brands with cutting-edge technology, innovative strategies, and a personalized approach
                        </p>
                    </div>
                </Container>

                <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <Container delay={0.1} className="h-auto">
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="text-base font-medium text-foreground">
                                    Solutions
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                                    <li>
                                        <Link href="/leadform" className="link hover:text-foreground transition-all duration-300">
                                            Marketing
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/leadform" className="link hover:text-foreground transition-all duration-300">
                                            Website & App
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/leadform" className="link hover:text-foreground transition-all duration-300">
                                            Branding & Design
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/leadform" className="link hover:text-foreground transition-all duration-300">
                                            Automated Business
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Container>
                        <Container delay={0.3} className="h-auto">
                            <h3 className="text-base font-medium text-foreground">
                                Social Media
                            </h3>
                            <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                            <li className="mt-2">
                                    <Link href="https://x.com/wonderstudio8" className="link hover:text-foreground transition-all duration-300">
                                        X
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="https://www.instagram.com/wondercreative.studio/" className="link hover:text-foreground transition-all duration-300">
                                        Instagram
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="https://www.linkedin.com/company/wonder-creative-studio9/" className="link hover:text-foreground transition-all duration-300">
                                        Linkedin
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="https://www.facebook.com/profile.php?id=100094373044877" className="link hover:text-foreground transition-all duration-300">
                                        Facebook
                                    </Link>
                                </li>
                            </ul>
                        </Container>
                        
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                    <Container delay={0.2} className="h-auto">
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="text-base font-medium text-foreground">
                                    Company
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                                    <li className="mt-2">
                                        <Link href="/privacy-policy" className="link hover:text-foreground transition-all duration-300">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/terms-condition" className="link hover:text-foreground transition-all duration-300">
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/shipping-and-delivery" className="link hover:text-foreground transition-all duration-300">
                                            Shipping & Delivery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cancellation-and-refund" className="link hover:text-foreground transition-all duration-300">
                                            Cancellation & Refund
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Container>
                        <Container delay={0.4} className="h-auto">
                            <h3 className="text-base font-medium text-foreground">
                                Contact Details
                            </h3>
                            <ul className="mt-4 text-sm text-muted-foreground space-y-4">
                                <li>
                                    <Link href="/contact" className="link hover:text-foreground transition-all duration-300">
                                        More info...
                                    </Link>
                                </li>
                            </ul>
                        </Container>
                    </div>
                </div>
            </div>

            <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
                <div className="mt-8 md:flex md:items-center justify-center footer w-full">
                    <p className="text-sm text-muted-foreground mt-8 md:mt-0">
                        &copy; {new Date().getFullYear()} by Wonder Creative Studio.
                    </p>
                </div>
            </Container>
        </footer>
    )
};

export default Footer
