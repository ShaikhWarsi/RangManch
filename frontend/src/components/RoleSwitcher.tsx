'use client'

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Settings, LogOut } from 'lucide-react';

const RoleSwitcher: React.FC = () => {
  const { currentUser, userRole, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleSwitch = async (role: 'buyer' | 'artisan' | 'ngo') => {
    try {
      // Demo credentials for different roles
      const demoCredentials = {
        buyer: { email: 'buyer@demo.com', password: 'demo123' },
        artisan: { email: 'artisan@demo.com', password: 'demo123' },
        ngo: { email: 'ngo@demo.com', password: 'demo123' }
      };

      await logout();
      await login(demoCredentials[role].email, demoCredentials[role].password);
      setIsOpen(false);
    } catch (error) {
      console.error('Role switch failed:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-maroon text-ivory p-3 rounded-full shadow-lg hover:bg-walnut transition-all duration-300 group"
          title="Demo Role Switcher"
        >
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Role Switcher Panel */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-premium border border-sand p-4 w-64">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-sand">
              <User size={16} className="text-walnut" />
              <span className="text-sm font-ui font-semibold text-walnut">
                Demo Role Switcher
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-walnut/60 mb-2">
                Current Role: <span className="font-bold text-maroon">{userRole}</span>
              </p>
              
              <div className="space-y-1">
                <button
                  onClick={() => handleRoleSwitch('buyer')}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-ui transition-colors ${
                    userRole === 'buyer' 
                      ? 'bg-maroon text-ivory' 
                      : 'hover:bg-sand text-walnut'
                  }`}
                >
                  👤 Buyer
                </button>
                <button
                  onClick={() => handleRoleSwitch('artisan')}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-ui transition-colors ${
                    userRole === 'artisan' 
                      ? 'bg-maroon text-ivory' 
                      : 'hover:bg-sand text-walnut'
                  }`}
                >
                  🎨 Artisan
                </button>
                <button
                  onClick={() => handleRoleSwitch('ngo')}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-ui transition-colors ${
                    userRole === 'ngo' 
                      ? 'bg-maroon text-ivory' 
                      : 'hover:bg-sand text-walnut'
                  }`}
                >
                  🏢 NGO Partner
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-sand">
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded text-sm font-ui text-walnut hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>

              <p className="text-xs text-walnut/40 mt-2 text-center">
                For demo purposes only
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSwitcher;
