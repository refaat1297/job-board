import { dbConnect } from "@/lib/db";
import { JobModel } from "@/lib/models/job.model";
import { Job } from "@/types";
import { JobsData } from "@/data";
import {CreateJobInput} from "@/services/jobs/jobs.validation";

type JobLean = Omit<Job, "id"> & {
  _id: { toString(): string }
  __v?: number
}

function toJob(doc: JobLean): Job {
  const { _id, __v, ...rest } = doc
  return { id: _id.toString(), ...rest }
}

export async function saveNewJob(job: CreateJobInput): Promise<Job> {
  await dbConnect()
  const newJob = await JobModel.create(job)
  return toJob(newJob)
}

export async function findAllJobs(): Promise<Job[]> {
  await dbConnect()
  const jobs = await JobModel.find({}).lean<JobLean[]>()
  return jobs.map(toJob)
}

export async function findJobById(id: string): Promise<Job | null> {
  await dbConnect()
  const job = await JobModel.findById(id).lean<JobLean>()
  return job ? toJob(job) : null
}

export async function seedTestJobs(): Promise<Job[]> {
  await dbConnect()
  const jobs = await JobModel.insertMany(JobsData)
  return jobs.map((job: JobLean) => toJob(job))
}