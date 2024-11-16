import { memo } from 'react'

interface InfoPageProps {
  question: string
  description?: string
  buttonText: string
  onNext: () => void
}

const InfoPage = ({ question, description, buttonText, onNext }: InfoPageProps) => {
  return (
    <div
      className="flex flex-col items-center pt-24 pb-7 min-h-screen text-white px-6"
      style={{
        background:
          'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
      }}
    >
      <div className="max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4">{question}</h2>
        {description && <p className="text-sm mb-8">{description}</p>}
        <button
          onClick={onNext}
          className="bg-white text-[#4a00e0] w-full px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default memo(InfoPage)
