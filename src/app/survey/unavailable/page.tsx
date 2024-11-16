'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const UnavailablePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleGoBack = useCallback(() => {
    const previousPageId = searchParams.get('previousPageId')
    router.push(`/survey/${previousPageId}`)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center">
      <h2 className="text-2xl text-black font-semibold mb-4">
        Hey there! This question is not available yet.
      </h2>
      <p className="text-lg text-black mb-6">
        Please answer the previous question to unlock this one.
      </p>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={handleGoBack}
      >
        Go back and answer the previous question
      </button>
    </div>
  )
}

export default UnavailablePage
