import {dbConnect} from "@/lib/db";
import {ApplicationModel} from "@/lib/models/applications.model";
import {Application} from "@/types/Application";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {ApplicationsData, JobsData} from "@/data";
import {Job} from "@/types/Job";

type ApplicationLean = Omit<Application, "id" | "appliedDate"> & {
  _id: { toString(): string };
  __v?: number;
  appliedDate: Date;
};

// Mapper function to convert the ApplicationLean type to the Application type (excluding the _id and __v fields)
function toApplication(doc: ApplicationLean): Application {
  const { _id, __v, candidateId, jobId, appliedDate, ...rest } = doc;
  return {
    id: _id.toString(),
    candidateId: candidateId.toString(),
    jobId: jobId.toString(),
    appliedDate:
      appliedDate instanceof Date
        ? appliedDate.toISOString().split("T")[0]
        : String(appliedDate),
    ...rest,
  };
}

export async function saveNewApplication(application: Omit<Application, "id" | "appliedDate">): Promise<Application> {
  await dbConnect();
  return await ApplicationModel.create({
    ...application,
    candidateId: new ObjectId(application.candidateId),
  });
}

export async function findAllApplications(): Promise<Application[]> {
  await dbConnect();
  const applications = await ApplicationModel.find({}).lean<
    ApplicationLean[]
  >();
  return applications.map(toApplication);
}

export async function findApplicationById(id: string): Promise<Application | null> {
  await dbConnect();
  const application =
    await ApplicationModel.findById(id).lean<ApplicationLean>();
  return application ? toApplication(application) : null;
}

export async function findApplicationsByCandidateId(candidateId: string): Promise<Application[]> {
  await dbConnect();
  const applications = await ApplicationModel.find({ candidateId }).lean<
    ApplicationLean[]
  >();
  return applications.map(toApplication);
}

export async function findApplicationsByJobId(jobId: string): Promise<Application[]> {
  await dbConnect();
  const applications = await ApplicationModel.find({ jobId }).lean<
    ApplicationLean[]
  >();
  return applications.map(toApplication);
}

export async function findApplicationsByStatus(status: string): Promise<Application[]> {
  await dbConnect();
  const applications = await ApplicationModel.find({ status }).lean<
    ApplicationLean[]
  >();
  return applications.map(toApplication);
}

export async function seedTestApplications(seededJobs: Job[]): Promise<Application[]> {
  await dbConnect()

  // Mock data uses placeholder ids ("1", "u1"); the schema needs real ObjectIds.
  // insertMany preserves order, so JobsData[i] corresponds to seededJobs[i].
  const jobIdMap = new Map(JobsData.map((job, i) => [job.id, seededJobs[i].id]))
  // TODO: candidates are still mock-based, so generate one stable ObjectId per mock candidate
  const candidateIdMap = new Map<string, string>()

  const docs = ApplicationsData.map(({ id: _id, ...application }) => {
    if (!candidateIdMap.has(application.candidateId)) {
      candidateIdMap.set(application.candidateId, new mongoose.Types.ObjectId().toString())
    }
    return {
      ...application,
      jobId: jobIdMap.get(application.jobId),
      candidateId: candidateIdMap.get(application.candidateId),
    }
  })

  const applications = await ApplicationModel.insertMany(docs)
  return applications.map((application: ApplicationLean) => toApplication(application))
}