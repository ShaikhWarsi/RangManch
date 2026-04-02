import { NGODashboard } from '@/legacy-pages/NGODashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function NGODashboardRoute() {
  return (
    <ProtectedRoute>
      <NGODashboard />
    </ProtectedRoute>
  )
}
