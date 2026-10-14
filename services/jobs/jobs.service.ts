import {CreateJobInput, createJobSchema} from "./jobs.validation";
import {Job} from "@/types";
import { z} from "zod"

type ServiceResult<T> = {
  success: true,
  data?: T;
} | {
  success: false,
  errors?: Record<string, string[]>
}

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