import {seedJobs} from "@/services/jobs/jobs.service";
import {NextResponse} from "next/server";

export async function GET() {
  const result = await seedJobs()
  return NextResponse.json(result)
}