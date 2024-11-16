import { memo } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import ArrowLeft from './icons/ArrowLeft'
import Logo from './icons/Logo'
import surveyData from '@/data/surveyData.json'

interface HeaderProps {
  theme: 'light' | 'dark'
}
const Header = ({ theme }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const firstScreenId = surveyData.screens[0]?.id
  const isFirstPage = pathname === `/survey/${firstScreenId}`

  const handleBack = () => {
    router.back()
  }

  //TODO: proceed with theme management
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'

  return (
    <header className={`relative w-full px-4 py-6 ${textColor} bg-transparent z-10`}>
      {!isFirstPage && (
        <button
          onClick={handleBack}
          aria-label="Back"
          className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${textColor}`}
        >
          <ArrowLeft className={textColor} />
        </button>
      )}

      <div className="flex justify-center">
        <Logo className={textColor} fill={'white'} />
      </div>
    </header>
  )
}

export default memo(Header)
