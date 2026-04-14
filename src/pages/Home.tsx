import { CTASection } from "@/components/home/CTASection";
import { FeaturedToursSection } from "@/components/home/FeaturedToursSection";
import HeroSection from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <StatsSection/>
    <HowItWorksSection/>
    <FeaturedToursSection/>
    <CTASection/>
    </>
  )
}