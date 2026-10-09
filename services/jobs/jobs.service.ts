import {Job} from "@/types";

export async function createJob(job: Job) {
  console.log('Creating job...', job);
  return job
}