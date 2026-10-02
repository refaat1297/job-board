import {HeroSection} from "@/components/landing/HeroSection";
import {FeaturedJobs} from "@/components/landing/FeaturedJobs";
import {JobsData} from "@/data";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs jobs={JobsData} />
    </>
  );
}
