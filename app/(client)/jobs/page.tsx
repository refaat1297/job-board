import JobsListingWrapper from "@/components/jobs/JobsListingWrapper";
import {getJobs} from "@/services/jobs/jobs.service";

async function JobsPage() {
  const result = await getJobs()

  if (!result.success) {
    return <div>Error loading jobs</div>;
  }

  const { data: jobs = [] } = result;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <JobsListingWrapper jobs={jobs} />
    </div>
  )
}

export default JobsPage;