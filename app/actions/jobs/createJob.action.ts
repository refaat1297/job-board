"use server"

import {Job} from "@/types";
import {createJob} from "@/services/jobs/jobs.service";

export async function createJobAction(formData: FormData) {
  const raw = Object.fromEntries(formData) as unknown as Job;
  const result = await createJob(raw)
}