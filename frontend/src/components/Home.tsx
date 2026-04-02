'use client'

import "../styles/Home.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Quote, Shield, Award, Heart, Star } from "lucide-react";

const clouds_1 = "/HomePage/clouds_1.png";
const clouds_2 = "/HomePage/clouds_2.png";
const bg = "/HomePage/full.png";
const fg = "/HomePage/man2.png";
const ramayanBG = "/HomePage/ramayanBG.png";
const ramayanFG = "/HomePage/ramayanFG.png";
const arrowRotate = "/HomePage/arrowRotate.png";

const arrowBGNew = "/HomePage/RamHoverBG_Large.png";
const flybird = "/HomePage/flybird.gif";

import IndianNavbarFixed from "../components/IndianNavbarFixed";
import { Footer } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowLoading(false);
        document.body.style.overflow = 'auto';
      }
    });

    tl.to(".loading-text", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(".loading-char", {
      opacity: 0,
      y: 50,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out"
    })
    .to(".loading-line", {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.3")
    .to(".loading-content", {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in"
    }, "+=0.5");

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => Math.min(prev + Math.random() * 15, 95));
    }, 150);

    setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
    }, 2200);

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!showLoading) {
      const ctx = gsap.context(() => {
        gsap.to("#cloud2", {
          x: -750,
          scrollTrigger: {
            trigger: "#top-section",
            scrub: 0.5,
          },
        });

        gsap.to("#cloud1", {
          x: 500,
          scrollTrigger: {
            trigger: "#top-section",
            scrub: 0.5,
          },
        });

        gsap.to(".arrowBGNew", {
          scale: 1.15,
          scrollTrigger: {
            trigger: ".section2",
            scrub: 1,
          },
        });

        gsap.to(".section2 #arrowRotate", {
          rotate: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });

        gsap.fromTo(".stat-item", 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#brand-story",
              start: "top 75%",
            }
          }
        );

        gsap.fromTo(".category-card", 
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.12,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#categories",
              start: "top 70%",
            }
          }
        );

        gsap.fromTo(".testimonial-card", 
          { opacity: 0, x: -40 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#testimonials",
              start: "top 70%",
            }
          }
        );

        gsap.fromTo(".feature-item", 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1,
            duration: 0.6,
            scrollTrigger: {
              trigger: "#features",
              start: "top 75%",
            }
          }
        );
      });

      return () => ctx.revert();
    }
  }, [showLoading]);

  const trustItems = [
    { icon: Shield, text: "Verified Artisans" },
    { icon: Award, text: "100% Handcrafted" },
    { icon: Heart, text: "Lifetime Authenticity" },
    { icon: Star, text: "Secure Payments" }
  ];

  const categories = [
    { 
      name: "Handwoven Textiles", 
      count: "240+ Pieces", 
      subtitle: "Generations of weaving mastery",
      description: "From the looms of Varanasi and Kanchipuram come silks that carry centuries of technique in every thread.",
      image: "/IMAGES/L2G1.avif" 
    },
    { 
      name: "Artisan Jewelry", 
      count: "180+ Pieces", 
      subtitle: "Treasures from ancient traditions",
      description: "Kundan, Meenakari, and temple jewelry—each piece a conversation between past and present.",
      image: "/IMAGES/l1g4.jpg" 
    },
    { 
      name: "Ceremonial Pottery", 
      count: "120+ Pieces", 
      subtitle: "Earth, fire, and heritage",
      description: "Blue pottery from Jaipur and terracotta from Bengal—artforms that predate the Mughal empire.",
      image: "/IMAGES/L1G2.jpg" 
    },
    { 
      name: "Miniature Paintings", 
      count: "95+ Pieces", 
      subtitle: "Stories painted in gold",
      description: "Raja Ravi Varma's legacy lives on in these meticulous renderings of myth and royalty.",
      image: "/IMAGES/L1G3.avif" 
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      quote: "The Banarasi saree I ordered for my daughter's wedding has become our family heirloom. The craftsmanship is beyond compare.",
      artisan: "Monika Das",
      craft: "Banarasi Silk Weaving",
      rating: 5,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop"
    },
    {
      name: "Ananya Reddy",
      location: "Hyderabad, Telangana",
      quote: "I've collected art from across India, but Rangmanch's pieces have a soul. The Kundan set I purchased is always the centerpiece of compliments.",
      artisan: "Rahul Singh",
      craft: "Kundan Jewelry",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Meera Krishnan",
      location: "Chennai, Tamil Nadu",
      quote: "As someone who appreciates authentic craftsmanship, finding Rangmanch was like discovering a treasure trove. Every piece tells a story.",
      artisan: "Lakshmi Ammal",
      craft: "Kanjivaram Silk",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  const features = [
    {
      title: "Artisan Verification",
      description: "Every artisan on Rangmanch is personally verified through video documentation of their craft process."
    },
    {
      title: "Direct Sourcing",
      description: "We work directly with artisan cooperatives, eliminating middlemen to ensure fair wages reach the creators."
    },
    {
      title: "Cultural Preservation",
      description: "A portion of every sale supports the preservation of endangered craft traditions through our NGO partnerships."
    },
    {
      title: "Lifetime Guarantee",
      description: "Each piece comes with a certificate of authenticity and a lifetime warranty against manufacturing defects."
    }
  ];

  const stats = [
    { number: "500+", label: "Master Artisans", sublabel: "Across 18 States" },
    { number: "15,000+", label: "Happy Collectors", sublabel: "Worldwide Delivery" },
    { number: "₹8.4L+", label: "Artisan Earnings", sublabel: "This Month Alone" },
    { number: "400+", label: "Years of Heritage", sublabel: "Living Traditions" }
  ];

  return (
    <div>
      {/* Cinematic Loading Screen */}
      {showLoading && (
        <div ref={loadingRef} className="fixed inset-0 bg-[#3E2F26] z-[9999] flex items-center justify-center">
          <div className="loading-content text-center">
            <h1 
              ref={textRef}
              className="loading-text opacity-0 mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "900",
                fontSize: "clamp(3rem, 12vw, 7rem)",
                letterSpacing: "-0.03em",
                color: "#F5EFE6",
                lineHeight: "1"
              }}
            >
              {"Rangmanch".split("").map((char, i) => (
                <span key={i} className="loading-char inline-block" style={{ 
                  display: char === ' ' ? 'inline' : 'inline-block',
                  marginRight: char === ' ' ? '0.3em' : '0'
                }}>
                  {char}
                </span>
              ))}
            </h1>
            <div className="loading-line w-48 h-[2px] bg-[#C6A75E] mx-auto origin-left scale-x-0 mb-6" />
            <p className="loading-text opacity-0 text-[#C6A75E] text-sm tracking-[0.3em] uppercase font-ui">
              Heritage • Technology • Empowerment
            </p>
            <div className="mt-12 w-32 h-[2px] bg-[#6B1F2B] mx-auto origin-left scale-x-0 overflow-hidden">
              <div 
                className="h-full bg-[#C6A75E] transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ opacity: showLoading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <IndianNavbarFixed />

        {/* Trust Strip */}
        <div className="bg-[#6B1F2B] py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
              {trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[#F5EFE6]">
                  <item.icon size={16} className="text-[#C6A75E]" />
                  <span className="text-xs font-ui tracking-[0.15em] uppercase">{item.text}</span>
                  {index < trustItems.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-[#C6A75E] ml-4 opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="section" id="top-section">
          <img src={bg} id="bg" alt="bg" />
          
          <div style={{
            position: "absolute",
            top: "17%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            width: "100%",
            textAlign: "center",
            pointerEvents: "none"
          }}>
            <h1 
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "900",
                fontSize: "clamp(4rem, 15vw, 10rem)",
                letterSpacing: "-0.04em",
                color: "#F5EFE6",
                margin: "0",
                padding: "0 20px",
                textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                lineHeight: "0.9",
                textTransform: "none"
              }}
            >
              Rangmanch
            </h1>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 5vw, 2.2rem)",
              color: "#C6A75E",
              marginTop: "10px",
              letterSpacing: "0.05em",
              fontWeight: "400",
              textShadow: "0 4px 10px rgba(0,0,0,0.3)",
              fontStyle: "italic"
            }}>
              Heritage • Technology • Empowerment
            </p>
          </div>
          
          <img src={fg} alt="man2" id="man" />
          <img src={clouds_1} style={{ position: "absolute" }} alt="cloud1" id="cloud1" />
          <img src={clouds_2} style={{ position: "absolute" }} alt="cloud2" id="cloud2" />
        </section>

        {/* Parallax Ramayan Section */}
        <section className="section1 relative h-[100vh] overflow-hidden">
          <img src={ramayanBG} id="rmynBG" alt="Ramayan Scene" className="absolute inset-0 w-full h-full object-cover" />
          
          <img src={flybird} id="bird1" alt="bird" className="absolute w-[10vw] h-[20vh] top-[11%] right-[65%] z-[1] scale-x-[-1]" style={{ scale: '1.2' }} />
          <img src={flybird} id="bird2" alt="bird" className="absolute w-[10vw] h-[20vh] top-[16%] right-[27%] z-[2] scale-x-[-1]" style={{ scale: '1.3' }} />
          <img src={flybird} id="bird3" alt="bird" className="absolute w-[10vw] h-[20vh] top-[3%] right-[55%] z-[1]" />
          <img src={flybird} id="bird4" alt="bird" className="absolute w-[10vw] h-[20vh] top-[8%] right-[38%] z-[1]" />
          
          <div style={{
            position: "absolute",
            right: "3%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "35%",
            maxWidth: "400px",
            padding: "40px",
            background: "rgba(245, 239, 230, 0.15)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            zIndex: 10
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700",
              fontSize: "2.2rem",
              color: "#F5EFE6",
              marginBottom: "20px",
              lineHeight: "1.1",
              letterSpacing: "-0.02em"
            }}>
              Rangmanch<br />
              <span style={{ 
                color: "#C6A75E",
                fontWeight: "400",
                fontSize: "1.4rem",
                fontStyle: "italic"
              }}>
                Cultural Preservation
              </span>
            </h3>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "rgba(245, 239, 230, 0.9)",
              marginBottom: "25px"
            }}>
              Our mission is to empower over 7 million rural artisans by bridging the gap between traditional craft and the global digital economy.
            </p>
            <button 
              onClick={() => router.push("/trade")}
              className="group relative px-8 py-3 bg-[#C6A75E] text-[#3E2F26] overflow-hidden transition-all duration-500 hover:bg-[#F5EFE6]"
            >
              <span className="relative z-10 font-ui text-sm tracking-[0.15em] uppercase font-bold">
                Shop the Collection
              </span>
            </button>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-32 px-6 bg-[#F5EFE6]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-6">
              Our Mission
            </span>
            <h2 className="font-heading text-[#3E2F26] text-3xl md:text-5xl leading-tight mb-8">
              Empowering <span className="text-[#6B1F2B] italic">7 million</span> rural artisans by bridging the gap between traditional craft and the global digital economy.
            </h2>
            <div className="w-16 h-[2px] bg-[#C6A75E] mx-auto mb-8" />
            <p className="text-[#3E2F26]/70 font-body text-lg leading-relaxed max-w-2xl mx-auto">
              In a world of mass production, we stand apart. Rangmanch is a sanctuary for India's finest artisans—masters whose hands have learned their craft across generations, whose hearts carry the wisdom of ancient traditions. Each piece is not merely an object—it's a living testament to human artistry, patience, and devotion.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section id="brand-story" className="py-24 px-6 bg-[#6B1F2B]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <span 
                    className="block text-[#C6A75E] text-4xl md:text-6xl font-heading font-bold mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-[#F5EFE6] text-xs tracking-[0.2em] uppercase block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-[#F5EFE6]/50 text-[10px] tracking-wider">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-32 px-6 bg-[#F5EFE6]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/IMAGES/L1G1.webp"
                    alt="Heritage craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="absolute -bottom-8 -right-8 bg-[#3E2F26] text-[#F5EFE6] p-8 rounded-2xl max-w-[220px]"
                  style={{ boxShadow: '0 25px 50px -12px rgba(62, 47, 38, 0.35)' }}
                >
                  <p 
                    className="text-5xl font-heading font-bold text-[#C6A75E] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    400+
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#F5EFE6]/70">
                    Years of Living Heritage
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#F5EFE6]/20">
                    <p className="text-xs italic text-[#F5EFE6]/80 leading-relaxed">
                      "Every thread carries the wisdom of ancestors"
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                  Our Philosophy
                </span>
                <h2 
                  className="text-[#3E2F26] text-4xl md:text-5xl leading-[1.1] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Every Thread<br />
                  <span className="text-[#6B1F2B] italic">Tells a Story</span>
                </h2>
                <div className="w-16 h-[2px] bg-[#C6A75E] mb-8" />
                
                <p className="text-[#3E2F26]/80 text-lg leading-[1.9] mb-6 font-body">
                  In the villages of India, there exist masters of craft whose families have passed down techniques for centuries. These artisans are the keepers of living heritage—each piece they create carries forward a lineage of excellence.
                </p>
                <p className="text-[#3E2F26]/65 leading-[1.85] mb-10 font-body">
                  When you acquire from Rangmanch, you don't just buy a product—you become part of a continuum that stretches back centuries. Your purchase directly supports these artisan families, ensuring their traditions survive and thrive in the modern world.
                </p>

                <div className="flex gap-12">
                  <div>
                    <span 
                      className="block text-4xl text-[#6B1F2B] font-heading font-bold mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      500+
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#3E2F26]/50">
                      Artisan Partners
                    </span>
                  </div>
                  <div>
                    <span 
                      className="block text-4xl text-[#6B1F2B] font-heading font-bold mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      15,000+
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#3E2F26]/50">
                      Happy Collectors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-32 px-6 bg-[#3E2F26]/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                Curated Collections
              </span>
              <h2 
                className="text-[#3E2F26] text-4xl md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Explore By Craft
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="category-card group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F26]/95 via-[#3E2F26]/60 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 group-hover:justify-start group-hover:pt-12">
                    <span className="text-[#C6A75E] text-[10px] tracking-[0.25em] uppercase mb-2">
                      {category.count}
                    </span>
                    <h3 
                      className="text-[#F5EFE6] text-xl mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-[#F5EFE6]/70 text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.subtitle}
                    </p>
                    <p className="text-[#F5EFE6]/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#C6A75E] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="font-ui uppercase">View Collection</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Parallax Section */}
        <section className="relative h-[100vh] overflow-hidden">
          <img 
            src="/IMAGES/L1G3.avif" 
            alt="Indian Heritage" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3E2F26]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-16">
              <span className="text-[#C6A75E] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                Timeless Elegance
              </span>
              <h2 
                className="text-[#F5EFE6] text-4xl md:text-6xl leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Where Tradition<br />
                <span className="italic">Meets Modernity</span>
              </h2>
              <p className="text-[#F5EFE6]/80 text-lg leading-relaxed mb-8">
                Discover the finest handcrafted pieces that carry the legacy of generations of master artisans.
              </p>
              <button 
                onClick={() => router.push("/trade")}
                className="px-8 py-3 bg-[#C6A75E] text-[#3E2F26] font-ui text-sm tracking-[0.15em] uppercase font-bold rounded-full hover:bg-[#F5EFE6] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </section>

        {/* Arrow/Chakra Parallax Section */}
        <section className="section2 relative h-[100vh] overflow-hidden">
          <img src={arrowBGNew} id="arrowBG123" className="arrowBGNew absolute inset-0 w-full h-full object-cover" alt="Sky Background" />
          <img src={arrowRotate} id="arrowRotate" alt="Rotating Chakra" className="absolute w-[45%] top-[2.5vh] left-[27.5%] z-10" />
         
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 bg-[#F5EFE6]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                The Rangmanch Difference
              </span>
              <h2 
                className="text-[#3E2F26] text-4xl md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Why Choose Authentic
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="feature-item flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6B1F2B] flex items-center justify-center">
                    <span className="text-[#C6A75E] font-heading text-lg font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 
                      className="text-[#3E2F26] text-xl mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#3E2F26]/65 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 px-6 bg-[#6B1F2B] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C6A75E] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                Collector Stories
              </span>
              <h2 
                className="text-[#F5EFE6] text-4xl md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Voices of Appreciation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="testimonial-card bg-[#F5EFE6]/5 backdrop-blur-sm rounded-3xl p-8 border border-[#F5EFE6]/10"
                >
                  <Quote className="w-8 h-8 text-[#C6A75E] mb-6" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="text-[#C6A75E] fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-[#F5EFE6]/90 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-[#F5EFE6]/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[#F5EFE6] text-sm font-ui font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-[#F5EFE6]/50 text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[#F5EFE6]/10">
                    <p className="text-[#C6A75E] text-[10px] tracking-[0.15em] uppercase mb-1">
                      Artisan
                    </p>
                    <p className="text-[#F5EFE6]/80 text-sm">
                      {testimonial.artisan}
                    </p>
                    <p className="text-[#F5EFE6]/50 text-xs">
                      {testimonial.craft}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 bg-[#F5EFE6] relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("/IMAGES/seamless-traditional-indian-textile-floral-border-pattern-motif-vector-carpet-abstract-geometric-fa_715993-40.avif")`,
              backgroundSize: '200px'
            }}
          />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-6">
              Begin Your Journey
            </span>
            <h2 
              className="text-[#3E2F26] text-4xl md:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Own a Piece of<br />
              <span className="text-[#6B1F2B] italic">Living Heritage</span>
            </h2>
            <p className="text-[#3E2F26]/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Each Rangmanch creation carries the soul of its maker—the dedication of generations poured into a single, extraordinary piece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push("/trade")}
                className="group relative px-12 py-5 bg-[#6B1F2B] text-[#F5EFE6] overflow-hidden transition-all duration-500 hover:bg-[#3E2F26]"
              >
                <span className="relative z-10 font-ui text-sm tracking-[0.2em] uppercase">
                  Shop the Collection
                </span>
              </button>
              
              <button 
                onClick={() => router.push("/india")}
                className="px-12 py-5 bg-transparent border-2 border-[#3E2F26] text-[#3E2F26] font-ui text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#3E2F26] hover:text-[#F5EFE6] hover:border-[#3E2F26]"
              >
                Explore Cultural Map
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div id="my-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;