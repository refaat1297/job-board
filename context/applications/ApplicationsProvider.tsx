import { useState } from "react";
import ApplicationsContext from "./ApplicationsContext";
import { getCandidate } from "@/utils";
import { Application, Candidate, Job } from "@/types";

type Props = {
  jobs: Job[];
  applications: Application[];
  candidates: Candidate[];
  children: React.ReactNode;
};

const ApplicationsProvider = ({ jobs = [], applications = [], candidates = [], children }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [jobFilter, setJobFilter] = useState<string>("ALL");
  const [jobState] = useState<Job[]>(jobs);
  const [applicationsState] = useState<Application[]>(applications);
  const [candidatesState] = useState<Candidate[]>(candidates);
  const filteredApplications = applications.filter(app => {
    const candidate = getCandidate(app.candidateId, candidatesState);
    const matchesSearch = !search || (candidate && (
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase())
    ));
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesJob = jobFilter === 'ALL' || app.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });


  return (
    <ApplicationsContext.Provider
      value={{
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        jobFilter,
        setJobFilter,
        filteredApplications,
        jobs: jobState,
        applications: applicationsState,
        candidates: candidatesState,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsProvider;