import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Container from "../global/container";
import Image from "next/image";

export const Blog = () => (
  <div className="w-full px-4">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
          Latest articles
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer md:col-span-2">
          <div className="bg-muted rounded-md aspect-video"
            style={{
              backgroundImage:
              "url('https://cdn.dribbble.com/userupload/17646001/file/original-cbb0562f3ae251fb3559c92a1334eb32.jpg?resize=2048x1536&vertical=center')",
            }}
          ></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-4 w-6">
                <AvatarImage src="/icons/icon.avif" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Wonder</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="max-w-3xl text-4xl tracking-tight">
             Embracing AI: Transforming Marketing Strategies in 2025
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
            The marketing landscape is undergoing a significant transformation, 
            with artificial intelligence (AI) at the forefront. As we progress through 2025, 
            AI is not just an optional tool but a fundamental component driving marketing success.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer">
          <div className="bg-muted rounded-md aspect-video"
            style={{
                backgroundImage:
                "url('https://cdn.dribbble.com/userupload/12301725/file/original-0246a335f12148c6db978065cb39e6ec.png?crop=0x0-3201x2401&format=webp&resize=640x480&vertical=center')",
              }}
          ></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-4 w-6">
                <AvatarImage src="/icons/icon.avif" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Wonder</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="max-w-3xl text-2xl tracking-tight">
              The Power of Marketing Automation: Streamlining Success
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
              In today's fast-paced digital environment, marketing automation has become a 
              vital tool for businesses aiming to enhance efficiency and effectiveness. By automating 
              repetitive tasks, companies can focus on strategic initiatives that drive growth.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 hover:opacity-75 cursor-pointer">
          <div className="bg-muted rounded-md aspect-video"
            style={{
              backgroundImage:
              "url('https://cdn.dribbble.com/userupload/18931515/file/original-7588320b8d11847384c59c2aadb6ba20.png?format=webp&resize=800x600&vertical=center')",
            }}
           ></div>
          <div className="flex flex-row gap-4 items-center">
            <Badge>News</Badge>
            <p className="flex flex-row gap-2 text-sm items-center">
              <span className="text-muted-foreground">By</span>{" "}
              <Avatar className="h-4 w-6">
                <AvatarImage src="/icons/icon.avif" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Wonder</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="max-w-3xl text-2xl tracking-tight">
              Navigating the Future: Top Marketing Technology Trends for 2025
            </h3>
            <p className="max-w-3xl text-muted-foreground text-base">
            The marketing technology (MarTech) landscape is rapidly evolving, 
            with new trends emerging that are set to reshape how businesses engage with their 
            audiences. Staying informed about these developments is crucial for maintaining a competitive edge.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);