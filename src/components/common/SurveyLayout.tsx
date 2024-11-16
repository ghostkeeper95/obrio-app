import { memo, ReactNode } from 'react'

import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const SurveyLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative text-black overflow-y-auto">
      <Header theme="light" />
      <div className="-mt-24">{children}</div>
    </div>
  )
}

export default memo(SurveyLayout)
