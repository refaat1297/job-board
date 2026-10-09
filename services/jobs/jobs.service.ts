import {Job} from "@/types";
import {CreateJobInput, createJobSchema} from "./jobs.validation";

export async function createJob(input: CreateJobInput) {
  const validated = createJobSchema.safeParse(input);

  console.log('validated', validated)
  if (!validated.success) {
    console.error("ERRORS", validated.error.message);
    return
  }

  console.log("CREATING JOB", validated)
  return
}