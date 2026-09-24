type Props = {
  params: Promise<{ jobId: string }>
}

async function JobEditPage({ params }: Props) {
  const { jobId } = await params
  return <div>Job Edit { jobId }</div>
}

export default JobEditPage