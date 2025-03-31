export interface BlogPost {
  readingTime: string;
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Embracing AI: Transforming Marketing Strategies in 2025",
    description:
      "The marketing landscape is undergoing a significant transformation, with artificial intelligence (AI) at the forefront. As we progress through 2025, AI is not just an optional tool but a fundamental component driving marketing success.",
    content: `
        <h2>The Evolution of AI in Marketing</h2>
        <p>As we progress through 2025, artificial intelligence has become an indispensable tool in the marketing arsenal. From predictive analytics to personalized customer experiences, AI is revolutionizing how businesses connect with their audiences.</p>
        
        <h2>Key AI Applications in Marketing</h2>
        <ul>
          <li>Predictive Analytics and Customer Behavior</li>
          <li>Automated Content Generation</li>
          <li>Personalized Customer Experiences</li>
          <li>Real-time Campaign Optimization</li>
        </ul>
        
        <h2>The Future of AI-Driven Marketing</h2>
        <p>Looking ahead, we can expect AI to become even more sophisticated, offering marketers unprecedented capabilities in understanding and engaging their target audience.</p>
      `,
    author: "Wonder",
    category: "News",
    imageUrl:
      "https://cdn.dribbble.com/userupload/17646001/file/original-cbb0562f3ae251fb3559c92a1334eb32.jpg?resize=2048x1536&vertical=center",
    publishedAt: "2025-01-15",
    readingTime: "",
  },
  {
    id: "2",
    title: "The Power of Marketing Automation: Streamlining Success",
    description:
      "In today's fast-paced digital environment, marketing automation has become a vital tool for businesses aiming to enhance efficiency and effectiveness. By automating repetitive tasks, companies can focus on strategic initiatives that drive growth.",
    content: `
        <h2>Understanding Marketing Automation</h2>
        <p>Marketing automation has revolutionized how businesses handle their marketing operations, providing unprecedented efficiency and scalability.</p>
        
        <h2>Key Benefits of Automation</h2>
        <ul>
          <li>Increased Efficiency</li>
          <li>Better Lead Management</li>
          <li>Improved ROI Tracking</li>
          <li>Enhanced Customer Experience</li>
        </ul>
        
        <h2>Implementing Automation Successfully</h2>
        <p>The key to successful marketing automation lies in choosing the right tools and strategies that align with your business goals.</p>
      `,
    author: "Wonder",
    category: "News",
    imageUrl:
      "https://cdn.dribbble.com/userupload/12301725/file/original-0246a335f12148c6db978065cb39e6ec.png?crop=0x0-3201x2401&format=webp&resize=640x480&vertical=center",
    publishedAt: "2025-01-10",
    readingTime: "",
  },
  {
    id: "3",
    title: "Navigating the Future: Top Marketing Technology Trends for 2025",
    description:
      "The marketing technology (MarTech) landscape is rapidly evolving, with new trends emerging that are set to reshape how businesses engage with their audiences. Staying informed about these developments is crucial for maintaining a competitive edge.",
    content: `
        <h2>The MarTech Revolution</h2>
        <p>The marketing technology landscape continues to evolve at a rapid pace, bringing new opportunities and challenges for businesses.</p>
        
        <h2>Key Trends to Watch</h2>
        <ul>
          <li>AI-Powered Analytics</li>
          <li>Voice Search Optimization</li>
          <li>Augmented Reality Marketing</li>
          <li>Privacy-First Marketing</li>
        </ul>
        
        <h2>Preparing for the Future</h2>
        <p>Success in the evolving MarTech landscape requires a strategic approach to adopting and implementing new technologies.</p>
      `,
    author: "Wonder",
    category: "News",
    imageUrl:
      "https://cdn.dribbble.com/userupload/18931515/file/original-7588320b8d11847384c59c2aadb6ba20.png?format=webp&resize=800x600&vertical=center",
    publishedAt: "2025-01-05",
    readingTime: "",
  },
];
