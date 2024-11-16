import { memo, useCallback } from 'react'

import { ChoiceOption } from '@/types/survey'

interface ChoiceButtonProps {
  option: ChoiceOption
  isSelected: boolean
  onClick: (val: ChoiceOption) => void
}

const ChoiceButton = ({ option, isSelected, onClick }: ChoiceButtonProps) => {
  const handleClick = useCallback(() => {
    onClick(option)
  }, [option])

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 rounded-lg text-lg shadow-md transition-all duration-500 ease-in-out ${
        isSelected
          ? 'bg-gradient-to-b from-blue-900 to-purple-800 text-white'
          : 'bg-[#EAEEF7] text-gray-800 hover:bg-gradient-to-b hover:from-blue-900 hover:to-purple-800 hover:text-white'
      }`}
      style={{
        boxShadow: '2px 2px 6px rgba(84, 60, 151, 0.25)',
        transition: 'background 0.5s ease, color 0.5s ease',
      }}
    >
      {option.label}
    </button>
  )
}

export default memo(ChoiceButton)
