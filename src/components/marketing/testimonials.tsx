import { cn } from "@/lib";
import { Marquee } from "../ui/marquee";
import Container from "../global/container";

const reviews = [
  {
    name: "Amit Khanna",
    username: "CEO, UrbanNest Interiors",
    body: "Exceptional service! Wonder Creative Studio transformed our online presence with a stunning website and powerful marketing strategy",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Neha Sharma",
    username: "Founder, FreshCart Organics",
    body: "Their automation solutions saved us hours of manual work. The team is highly professional and result-driven!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Rahul Mehta",
    username: "Director, BuildRight Constructions",
    body: "From branding to lead generation, Wonder Creative Studio has been our one-stop solution for digital success",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Priya Iyer",
    username: "Marketing Head, StyleAura Fashion",
    body: "We saw a 3X increase in engagement after they revamped our website and social media campaigns!",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Vikram Singh",
    username: "Co-Founder, TechNova Solutions",
    body: "The best decision we made was partnering with Wonder Creative Studio. Their automation tools are game-changers!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Sneha Patel",
    username: "Founder, Blissful Living",
    body: "Their expertise in performance marketing helped us scale our e-commerce brand faster than we imagined",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <Container>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      </Container>
      <Container>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      </Container>
    </div>
  );
}
