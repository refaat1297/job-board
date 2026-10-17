import {seedJobs} from "@/services/jobs/jobs.service";
import {NextResponse} from "next/server";
import {seedTestApplications} from "@/repositories/application.repository";

export async function GET() {
  const jobs = await seedJobs()
  if (!jobs.success) {
    return NextResponse.json(jobs, { status: 500 })
  }
  const applications = await seedTestApplications(jobs.data)
  return NextResponse.json({ jobs, applications })
}
