import {HeroSection} from "@/components/landing/HeroSection";
import {FeaturedJobs} from "@/components/landing/FeaturedJobs";
import { getJobs } from "@/services/jobs/jobs.service";

export default async function Home() {
  const result = await getJobs();
  if (!result.success) {
    return <div>Error loading jobs</div>;
  }
  const { data: jobs = [] } = result;

  return (
    <>
      <HeroSection />
      <FeaturedJobs jobs={jobs} />
    </>
  );
}
