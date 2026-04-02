import StatePage from '@/components/StatePage'

interface StatePageProps {
  params: {
    stateName: string
  }
}

// Generate static params for common Indian states
export async function generateStaticParams() {
  return [
    { stateName: 'uttarpradesh' },
    { stateName: 'rajasthan' },
    { stateName: 'gujarat' },
    { stateName: 'maharashtra' },
    { stateName: 'tamilnadu' },
    { stateName: 'kerala' },
    { stateName: 'punjab' },
    { stateName: 'westbengal' },
  ];
}

export default function StatePageRoute({ params }: StatePageProps) {
  return <StatePage />
}
