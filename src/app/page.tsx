import { redirect } from 'next/navigation'

import surveyData from '@/data/surveyData.json'

const firstQuestionId = surveyData.screens[0]?.id

export default function HomePage() {
  if (firstQuestionId) {
    redirect(`/survey/${firstQuestionId}`)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-red-100 text-gray-800 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-lg mb-8">
        We couldn&apos;t find the first question for the survey. Please contact support or try again
        later.
      </p>
    </main>
  )
}
