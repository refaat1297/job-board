"use server"

import {createJob} from "@/services/jobs/jobs.service";
import {CreateJobInput} from "@/services/jobs/jobs.validation";

export async function jobsAction(formData: FormData) {
  const raw = Object.fromEntries(formData)

  const data = {
    ...raw as unknown as CreateJobInput,
    tags: (raw.tags as string).split(","),
    requirements: (raw.requirements as string).split("\n"),
  }

  return await createJob(data)
}