import { useState } from "react";
import ApplicationsContext from "./ApplicationsContext";
import { ApplicationsData } from "@/data/ApplicationsData";
import { CandidateData } from "@/data/CandidateData";
import { getCandidate } from "@/utils";
import { Application, Job } from "@/types";

const ApplicationsProvider = ({ jobs = [], children }: {  jobs: Job[], children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [jobFilter, setJobFilter] = useState<string>("ALL");
  const [jobState] = useState<Job[]>(jobs);
  const [applications, setApplications] = useState<Application[]>(ApplicationsData);

  const filteredApplications = applications.filter(app => {
    const candidate = getCandidate(app.candidateId, CandidateData);
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
        applications,
        setApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsProvider;