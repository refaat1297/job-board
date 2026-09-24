type Props = {
  params: Promise<{ jobId: string }>
}

async function JobDetailsPage({ params }: Props) {
  const { jobId } = await params

  return <div>Job Details { jobId }</div>
}

export default JobDetailsPage