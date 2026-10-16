import {CreateJobInput, createJobSchema} from "./jobs.validation";
import {Job} from "@/types";
import { z } from "zod"
import {JobsData} from "@/data";
import { ServiceResult } from "@/types";

export async function createJob(input: CreateJobInput): Promise<ServiceResult<Job>> {
  const validated = createJobSchema.safeParse(input);

  if (!validated.success) {
    console.error("ERRORS", z.flattenError(validated.error).fieldErrors);
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors
    }
  }

  console.log("CREATING JOB", validated.data)
  return  {
    success: true,
    data: validated.data as Job
  }
}

export async function getJobs(): Promise<ServiceResult<Job[]>> {
  // TODO: Database will solve this
  return { success: true, data: JobsData };
}

export async function getJob(id: string): Promise<ServiceResult<Job>> {
  // TODO: Database will solve this
  const job = JobsData.find((job) => job.id === id);
  if (!job) {
    return { success: false, errors: { id: ["Job not found"] } };
  }
  return { success: true, data: job };
}