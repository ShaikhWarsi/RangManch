import { NGODashboard } from '@/components/NGODashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function NGODashboardRoute() {
  return (
    <ProtectedRoute>
      <NGODashboard />
    </ProtectedRoute>
  )
}
