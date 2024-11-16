import { use } from 'react'
import { notFound } from 'next/navigation'

import ScreenRenderer from '@/components/ScreenRenderer'
import surveyDataJson from '@/data/surveyData.json'
import { SurveyData } from '@/types/survey'

const surveyData = surveyDataJson as SurveyData

export async function generateStaticParams() {
  return surveyData.screens.map(screen => ({
    id: screen.id,
  }))
}

export default function SurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const screen = surveyData.screens.find(s => s.id === id)

  if (!screen) {
    notFound()
  }

  return <ScreenRenderer screen={screen} />
}
