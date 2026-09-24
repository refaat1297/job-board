type Props = {
  params: Promise<{ applicationId: string }>
}

async function ApplicationDetailsPage({ params }: Props) {
  const { applicationId } = await params
  return <div>Application Details { applicationId }</div>
}

export default ApplicationDetailsPage