import { FeatureSteps } from "../ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Custom-Tailored Solutions',
    content: 'Designed to fit your business needs.', 
    image: 'https://cdn.dribbble.com/userupload/8473027/file/original-22d3bd7a200f7598ded02452d7d7c132.png?resize=752x&vertical=center' 
  },
  { 
    step: 'Step 2',
    title: 'AI-Powered Optimization',
    content: 'Smarter apps for higher engagement.',
    image: 'https://4006992.fs1.hubspotusercontent-na1.net/hub/4006992/hubfs/custom-video-thumbnails/One%20AI%20Animation%203-opt-thumb.jpeg?length=1920'
  },
  { 
    step: 'Step 3',
    title: 'Scalable Architecture',
    content: 'Built for long-term business growth.',
    image: 'https://cdn.dribbble.com/userupload/14483514/file/original-746557f72806e52e000a79e774e12406.png?resize=1504x1128&vertical=center'
  },
  { 
    step: 'Step 4',
    title: 'Full-Cycle Support',
    content: 'From ideation to launch & maintenance.',
    image: 'https://cdn.dribbble.com/userupload/10362686/file/original-fa9babb40349ff671e57d6ccc0a66481.png?resize=1504x1128&vertical=center'
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps 
        features={features}
        autoPlayInterval={2000}
        imageHeight="h-[500px]"
      />
  )
}