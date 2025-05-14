import { Blog } from "@/components/blog/blog";
import Wrapper from "@/components/global/wrapper";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Wonder Creative Studios',
  description: 'Explore our collection of articles about technology, design, and innovation.',
  openGraph: {
    title: 'Blog | Wonder Creative Studios',
    description: 'Explore our collection of articles about technology, design, and innovation.',
    type: 'website',
    url: 'https://wondercreativestudios.com/blog',
    siteName: 'Wonder Creative Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Wonder Creative Studios',
    description: 'Explore our collection of articles about technology, design, and innovation.',
  },
  alternates: {
    canonical: 'https://wondercreativestudios.com/blog'
  }
};

export default function BlogPage() {
  return (
        <Wrapper className="py-20 relative">
            <Blog />
        </Wrapper>
  );
}
