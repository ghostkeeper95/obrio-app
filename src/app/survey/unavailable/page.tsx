import { Suspense } from 'react'

import UnavailableContent from './UnavailableContent'

export default function UnavailablePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnavailableContent />
    </Suspense>
  )
}
