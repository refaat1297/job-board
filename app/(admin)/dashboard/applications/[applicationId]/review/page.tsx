type Props = {
  params: Promise<{ applicationId: string }>
}

async function ApplicationReviewPage({ params }: Props) {
  const { applicationId } = await params
  return <div>Application Review { applicationId }</div>
}

export default ApplicationReviewPage