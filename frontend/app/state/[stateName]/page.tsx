'use client'

import StatePage from '@/legacy-pages/StatePage'

interface StatePageProps {
  params: {
    stateName: string
  }
}

export default function StatePageRoute({ params }: StatePageProps) {
  return <StatePage />
}
