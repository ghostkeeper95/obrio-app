'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import surveyData from '@/data/surveyData.json'
import { RootState } from '@/store'
import { resetAnswers } from '@/store/surveySlice'

const firstQuestionId = surveyData.screens[0]?.id

const SurveyResultsPage = () => {
  const survey = useSelector((state: RootState) => state.survey)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleReset = () => {
    dispatch(resetAnswers())
    router.push(`/survey/${firstQuestionId}`)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl text-black font-bold mb-6">Survey Results</h1>
      <div className="w-full max-w-md text-red-500 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
        <ul className="list-disc list-inside space-y-2">
          {Object.entries(survey.answers).map(([questionId, answer]) => (
            <li key={questionId} className="text-gray-800">
              <span className="font-semibold">{survey.questions[questionId]}:</span> {answer.label}
            </li>
          ))}
        </ul>
        <button
          onClick={handleReset}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Reset Answers
        </button>
      </div>
    </div>
  )
}

export default SurveyResultsPage
