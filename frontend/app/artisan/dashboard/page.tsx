import { ArtisanDashboard } from '@/legacy-pages/ArtisanDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ArtisanDashboardRoute() {
  return (
    <ProtectedRoute>
      <ArtisanDashboard />
    </ProtectedRoute>
  )
}
