'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'error' | 'success' | 'warning'
  duration?: number
  onClose: () => void
}

export const ToastNotification: React.FC<ToastProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500', 
    warning: 'bg-yellow-500'
  }[type]

  const iconColor = {
    error: 'text-white',
    success: 'text-white',
    warning: 'text-white'
  }[type]

  return (
    <div className="fixed top-4 right-4 z-[2000] animate-in fade-in slide-in-from-right-2">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
        <div className="flex-1">
          <p className="font-ui text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close notification"
        >
          <X size={16} className={iconColor} />
        </button>
      </div>
    </div>
  )
}
