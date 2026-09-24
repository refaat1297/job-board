type Props = {
  params: Promise<{ id: string }>
}

async function JobDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>Job Details { id }</h1>
    </div>
  )
}

export default JobDetailsPage;