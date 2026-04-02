'use client'

import StatePage from '../../components/StatePage'

interface StatePageProps {
  params: {
    stateName: string
  }
}

export default function StatePageRoute({ params }: StatePageProps) {
  return <StatePage />
}
