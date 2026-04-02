'use client'

import StatePage from '@/pages/StatePage'

interface StatePageProps {
  params: {
    stateName: string
  }
}

export default function StatePageRoute({ params }: StatePageProps) {
  return <StatePage />
}
