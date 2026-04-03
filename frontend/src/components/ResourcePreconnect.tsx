'use client'

import { usePreconnect } from '@/hooks/usePreconnect'

/**
 * Component that adds preconnect for 3D model viewer resources
 * Only renders preconnects when actually needed
 */
export const ModelViewerPreconnect = () => {
  usePreconnect(['https://modelviewer.dev'])
  
  // This component doesn't render anything visible
  // It only adds the preconnect when used
  return null
}

/**
 * Component that adds preconnect for any external CDN
 * Use this in components that load external resources
 */
export const CDNPreconnect = ({ cdn }: { cdn: string[] }) => {
  usePreconnect(cdn)
  return null
}
