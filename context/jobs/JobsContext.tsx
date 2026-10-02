import { createContext, useContext } from "react";

type JobsContextType = {
  search: string;
  setSearch: (search: string) => void;
  typeFilter: string;
  setTypeFilter: (typeFilter: string) => void;
  locationFilter: string;
  setLocationFilter: (locationFilter: string) => void;
}

const JobsContext = createContext<JobsContextType>({
  search: "",
  setSearch: () => {},
  typeFilter: "",
  setTypeFilter: () => {},
  locationFilter: "",
  setLocationFilter: () => {},
})

export const useJobs = () => useContext(JobsContext);

export default JobsContext;