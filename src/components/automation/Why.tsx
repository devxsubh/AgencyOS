import { FeatureSteps } from "../ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'AI-Powered Automation',
    content: 'Leverage advanced AI algorithms to automate your marketing and sales processes.', 
    image: 'https://cdn.dribbble.com/userupload/37348302/file/original-3506d00603171dd080969e8030ffd178.png?resize=1504x1128&vertical=center' 
  },
  { 
    step: 'Step 2',
    title: 'Data-Driven Insights',
    content: 'Make informed decisions with real-time analytics and performance metrics.',
    image: 'https://cdn.dribbble.com/userupload/18007234/file/original-7208953abd04035281928853d8bdfacb.jpg?resize=1504x1128&vertical=center'
  },
  { 
    step: 'Step 3',
    title: 'Lead Management',
    content: 'Efficiently track and nurture leads through your sales pipeline.',
    image: 'https://cdn.dribbble.com/userupload/41552487/file/original-e4cf1ee3b466eda8a673fa10545aa879.png?resize=2048x1536&vertical=center'
  },
  { 
    step: 'Step 4',
    title: 'Smart Communication',
    content: 'Automated messaging and follow-ups to keep your leads engaged.',
    image: 'https://r2.spurnow.com/ig-automation-hero.webp'
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps 
        features={features}
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
  )
}