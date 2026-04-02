'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const IndianNavbarFixed: React.FC = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const navItems: NavItem[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "map", label: "Cultural Map", path: "/india" },
    { id: "marketplace", label: "Marketplace", path: "/trade" },
    { id: "artisans", label: "Artisans", path: "/artisans" },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith("/#")) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      router.push(path);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-[3000] 
          transition-all duration-500 ease-in-out
          flex items-center
          px-6 py-3 md:px-10 md:py-4
          rounded-full border border-white/20
          backdrop-blur-md
          ${isScrolled 
            ? 'bg-white/90 w-[92%] max-w-[1100px] shadow-premium' 
            : 'bg-white/40 w-[95%] max-w-[1300px]'
          }
        `}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="
            w-10 h-10 md:w-11 md:h-11
            rounded-full bg-maroon
            flex items-center justify-center
            text-ivory font-heading
            text-xl md:text-2xl
            shadow-premium transition-all duration-300
            group-hover:shadow-premium-hover group-hover:-rotate-12
          ">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg md:text-xl leading-none text-walnut">
              Rangmanch
            </span>
            <span className="font-devanagari text-[10px] tracking-widest text-maroon font-bold">
              रंगमंच
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div className="flex items-center gap-10 ml-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="
                  font-ui text-[13px] uppercase tracking-[0.1em] font-bold 
                  text-walnut/70 bg-transparent border-0 cursor-pointer 
                  relative py-2 transition-all duration-300 
                  hover:text-maroon group
                "
              >
                {item.label}
                <span className="
                  absolute bottom-0 left-0 w-0 h-[1.5px] 
                  bg-maroon transition-all duration-300 
                  group-hover:w-full
                " />
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto pl-6 border-l border-walnut/10">
          <button 
            onClick={() => router.push("/trade")}
            className="relative p-2 text-walnut/80 hover:text-maroon transition-colors"
            aria-label={`Shopping cart with ${cartItems.length} items`}
          >
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-maroon text-ivory text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" aria-label={`${cartItems.length} items in cart`}>
                {cartItems.length}
              </span>
            )}
          </button>
          
          {!isMobile ? (
            <div className="flex items-center gap-4">
              {currentUser ? (
                <button 
                  onClick={handleLogout}
                  className="font-ui text-[13px] uppercase tracking-wider font-bold text-walnut/60 hover:text-maroon transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => router.push("/login")}
                  className="font-ui text-[13px] uppercase tracking-wider font-bold text-walnut/60 hover:text-maroon transition-colors"
                >
                  Sign In
                </button>
              )}
              <button 
                onClick={() => router.push("/signup")}
                className="
                  bg-maroon text-ivory font-ui text-[13px] uppercase tracking-widest font-bold
                  px-8 py-3 rounded-full border-0 cursor-pointer
                  shadow-premium transition-all duration-300
                  hover:bg-walnut hover:-translate-y-0.5 hover:shadow-premium-hover
                "
              >
                Explore
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-walnut/80 hover:text-maroon transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-[2500] bg-ivory/95 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="font-heading text-4xl text-walnut hover:text-maroon transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="h-px w-20 bg-maroon/20 my-4" />
            <button 
              onClick={() => handleNavigation("/login")}
              className="font-ui text-lg uppercase tracking-widest font-bold text-walnut/60"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleNavigation("/signup")}
              className="bg-maroon text-ivory font-ui text-lg uppercase tracking-widest font-bold px-12 py-4 rounded-full shadow-premium"
            >
              Explore
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IndianNavbarFixed;
