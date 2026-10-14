import { createContext, useContext } from "react";
import { Job } from "@/types/Job";

type JobsContextType = {
  search: string;
  setSearch: (search: string) => void;
  typeFilter: string;
  setTypeFilter: (typeFilter: string) => void;
  locationFilter: string;
  setLocationFilter: (locationFilter: string) => void;
  jobs: Job[];
}

const JobsContext = createContext<JobsContextType>({
  search: "",
  setSearch: () => {},
  typeFilter: "",
  setTypeFilter: () => {},
  locationFilter: "",
  setLocationFilter: () => {},
  jobs: []
})

export const useJobs = () => useContext(JobsContext);

export default JobsContext;