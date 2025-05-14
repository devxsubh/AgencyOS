import { Card } from "@/components/ui/card"
import Image from "next/image"
import Container from "../global/container"
import { NumberTicker } from "../ui/number-ticker"
import { BorderBeam } from "../magicui/border-beam"


export default function AboutUs() {
  return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <Container>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Your Partner in <span className="taxt-[#c4ea00]">Growth</span> and Innovation
            </h1>
            <p className="text-muted-foreground">
              11x is an website and Automation company that builds autonomous digital workers
            </p>
            <div className="space-y-4 text-muted-foreground">
              <p>
              At Wonder Creative Studio, we believe in creating more than just designs and websites; we build relationships 
              and drive results. Our team of experts combines creativity, technology, and strategy to deliver solutions that 
              resonate with your audience and fuel your business growth
              </p>
              <p>
              Founded on the principles of innovation and excellence, Wonder Creative Studio has successfully partnered with over 
              250+ clients across industries, delivering impactful results every time
              </p>
            </div>
          </div>
          </Container>

          {/* Right Column */}
          <Container delay={0.5}>
          <div>
            <Card className="overflow-hidden">
              <div className="relative min-h-[300px] p-8">
                <div className="relative z-10 space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold sm:text-4xl drop-shadow-2xl">OutStanding results around the clock</h2>
                  </div>

                  <div className="space-y-8">
                    <div>
                      
                      <div className="text-2xl font-bold sm:text-3xl drop-shadow-2xl">
                        <NumberTicker value={5} className="text-2xl font-bold sm:text-3xl text-white drop-shadow-2xl"/>+ Year's
                        </div>
                      <p className="mt-2 text-gray-300 drop-shadow-2xl">
                        Freed from repetitive tasks, enabling people to focus building human connections.
                      </p>
                    </div>

                    <div>
                      <div className="text-2xl font-bold sm:text-3xl drop-shadow-2xl">
                      <NumberTicker value={250} className="text-2xl font-bold sm:text-3xl text-white drop-shadow-2xl"/>+ Client's
                      </div>
                      <p className="mt-2 text-gray-300 drop-shadow-2xl">Digital AI workers deployed globally</p>
                    </div>

                    <div>
                      <div className="text-2xl font-bold sm:text-3xl drop-shadow-2xl">
                        <NumberTicker value={1000} className="text-2xl font-bold sm:text-3xl text-white drop-shadow-2xl"/>+ Task's
                      </div>
                      <p className="mt-2 text-gray-300 drop-shadow-4xl">In funding raised by Benchmark, Andreessen Horowitz and more</p>
                    </div>
                  </div>
                </div>

                {/* Background Overlay */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: "url('https://miro.medium.com/v2/resize:fit:1000/1*djOWBfUNhFUPeDHchV9cEQ.jpeg')",
                    opacity: 0.3,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-[#c4ea00] to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-[#c4ea00] to-transparent"
              />
              </div>
            </Card>
          </div>
          </Container>
        </div>
      </div>
    )
}

