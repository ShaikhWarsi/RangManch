import { ArtisanDashboard } from '@/components/ArtisanDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ArtisanDashboardRoute() {
  return (
    <ProtectedRoute>
      <ArtisanDashboard />
    </ProtectedRoute>
  )
}
