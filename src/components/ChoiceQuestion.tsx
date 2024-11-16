import { memo, useState } from 'react'

import ChoiceButton from './common/ChoiceButton'
import { ChoiceOption } from '@/types/survey'

interface ChoiceQuestionProps {
  question: string
  description?: string
  options: ChoiceOption[]
  onAnswer: (option: ChoiceOption) => void
}

const ChoiceQuestion = ({ question, description, options, onAnswer }: ChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleClick = (option: ChoiceOption) => {
    setSelectedOption(option.label)
    onAnswer(option)
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 pb-7 h-full bg-pink-100 text-black px-4 sm:px-6">
      <div className="w-full max-w-lg sm:min-w-[20rem]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">{question}</h2>
        {description && (
          <p className="text-sm sm:text-base text-center mb-6 sm:mb-8">{description}</p>
        )}
        <div className="flex flex-col gap-3 sm:gap-4 pb-6">
          {options.map(option => (
            <ChoiceButton
              key={String(option.value)}
              option={option}
              isSelected={selectedOption === option.value}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ChoiceQuestion)
