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

        gsap.to("#bg", {
          y: 200,
          scrollTrigger: {
            trigger: "#top-section",
            scrub: 1,
          },
        });

        gsap.to("#man", {
          y: 100,
          scrollTrigger: {
            trigger: "#top-section",
            scrub: 1,
          },
        });

        gsap.to("#hero-particles", {
          y: 150,
          scrollTrigger: {
            trigger: "#top-section",
            scrub: 1.5,
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

        gsap.to(".chakra-text", {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".section2",
            start: "top 70%",
          },
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

        gsap.fromTo(".craft-card", 
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#craft-process",
              start: "top 80%",
            }
          }
        );

        gsap.fromTo(".artisan-voice-card", 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#artisan-voices",
              start: "top 75%",
            }
          }
        );

        gsap.fromTo(".journey-step", 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#journey",
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

  const artisanVoices = [
    {
      name: "Maqbool Ahmed",
      location: "Varanasi, Uttar Pradesh",
      craft: "Banarasi Silk Weaving",
      craftDetail: "Zari & Brocade Work",
      quote: "My fingers know the loom better than my own hands. My father taught me, his father taught him—for seven generations, this is all we know. Each saree takes 15 to 45 days, depending on the complexity of the jaal.",
      yearsOfCraft: "40+ Years",
      image: "/IMAGES/artisan-weaver.jpg"
    },
    {
      name: "Lakshmi Devi",
      location: "Kanchipuram, Tamil Nadu",
      craft: "Kanchipuram Silk Weaving",
      craftDetail: "Temple Border Design",
      quote: "The silk must be handled with respect. We source the finest mulberry silk from Bangalore, and each thread is tested for strength before weaving. A true Kanchipuram saree can last fifty years—many of our designs are passed from mothers to daughters.",
      yearsOfCraft: "35+ Years",
      image: "/IMAGES/artisan-weaver.jpg"
    },
    {
      name: "Ramesh Kumar",
      location: "Jaipur, Rajasthan",
      craft: "Blue Pottery",
      craftDetail: "Traditional Azhari Technique",
      quote: "Blue pottery comes from Persian traditions, but in Jaipur it became something new. We use quartz stone powder instead of clay—it gives that distinctive turquoise color. Each piece is hand-painted with natural pigments and fired in traditional kilns.",
      yearsOfCraft: "28+ Years",
      image: "/IMAGES/artisan-weaver.jpg"
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
    { number: "18", label: "States Represented", sublabel: "Kashmir to Kanyakumari" },
    { number: "50+", label: "Artisan Co-operatives", sublabel: "Direct Partnerships" },
    { number: "200+", label: "Unique Craft Forms", sublabel: "Living Traditions" },
    { number: "100%", label: "Handcrafted", sublabel: "No Mass Production" }
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
          
          <div id="hero-particles" className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#C6A75E]/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
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
                      18
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#3E2F26]/50">
                      States Represented
                    </span>
                  </div>
                  <div>
                    <span 
                      className="block text-4xl text-[#6B1F2B] font-heading font-bold mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      50+
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#3E2F26]/50">
                      Artisan Co-operatives
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Journey Section */}
        <section id="journey" className="py-24 px-6 bg-[#6B1F2B] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C6A75E] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                From Hands to Home
              </span>
              <h2 
                className="text-[#F5EFE6] text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Journey
              </h2>
              <p className="text-[#F5EFE6]/60 max-w-xl mx-auto">
                Every piece travels through careful hands, carrying generations of knowledge into your life.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent -translate-y-1/2" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <div className="journey-step text-center relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#F5EFE6]/10 border-2 border-[#C6A75E]/40 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <span className="text-[#C6A75E] text-xs tracking-[0.2em] uppercase block mb-3">
                    Step One
                  </span>
                  <h3 className="text-[#F5EFE6] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Raw Materials
                  </h3>
                  <p className="text-[#F5EFE6]/60 text-sm leading-relaxed">
                    Natural fibers, metals, and pigments sourced from their regions of origin. Quality begins at the source.
                  </p>
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
                </div>

                <div className="journey-step text-center relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#F5EFE6]/10 border-2 border-[#C6A75E]/40 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-3xl">🤲</span>
                  </div>
                  <span className="text-[#C6A75E] text-xs tracking-[0.2em] uppercase block mb-3">
                    Step Two
                  </span>
                  <h3 className="text-[#F5EFE6] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Artisan Hands
                  </h3>
                  <p className="text-[#F5EFE6]/60 text-sm leading-relaxed">
                    Master craftspeople transform raw materials using techniques passed down through generations of practice.
                  </p>
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#C6A75E]/40 to-transparent" />
                </div>

                <div className="journey-step text-center relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#F5EFE6]/10 border-2 border-[#C6A75E]/40 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-3xl">🏠</span>
                  </div>
                  <span className="text-[#C6A75E] text-xs tracking-[0.2em] uppercase block mb-3">
                    Step Three
                  </span>
                  <h3 className="text-[#F5EFE6] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Your Home
                  </h3>
                  <p className="text-[#F5EFE6]/60 text-sm leading-relaxed">
                    Each piece arrives with a certificate of authenticity and the story of the artisan who created it.
                  </p>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C6A75E]/0 via-[#C6A75E]/0 to-[#C6A75E]/0 group-hover:from-[#C6A75E]/10 group-hover:via-[#C6A75E]/5 group-hover:to-[#C6A75E]/20 transition-all duration-700 z-10 pointer-events-none" />
                  <div className="absolute inset-0 shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(198, 167, 94, 0.3)' }} />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F26]/95 via-[#3E2F26]/60 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 group-hover:justify-start group-hover:pt-12 z-30">
                    <span className="text-[#C6A75E] text-[10px] tracking-[0.25em] uppercase mb-2 transform transition-transform duration-500 group-hover:translate-y-0 -translate-y-2">
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
                      <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It's Made - Craft Process Section */}
        <section id="craft-process" className="py-24 px-6 bg-[#F5EFE6] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                The Art of Making
              </span>
              <h2 
                className="text-[#3E2F26] text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                How It's Made
              </h2>
              <p className="text-[#3E2F26]/60 max-w-xl mx-auto">
                Each piece passes through skilled hands, carrying forward techniques perfected over generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="craft-card group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C6A75E]/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#6B1F2B]/10 flex items-center justify-center mb-6">
                    <span className="text-3xl">🧵</span>
                  </div>
                  <h3 className="text-[#3E2F26] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Banarasi Silk Weaving
                  </h3>
                  <p className="text-[#3E2F26]/60 text-sm mb-6 leading-relaxed">
                    Using a drawloom, artisans create intricate patterns where each warp thread is individually controlled. The zari work uses real silver thread coated with gold.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">1</div>
                      <span className="text-[#3E2F26]/70 text-sm">Silk thread preparation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">2</div>
                      <span className="text-[#3E2F26]/70 text-sm">Natural dye extraction</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">3</div>
                      <span className="text-[#3E2F26]/70 text-sm">Jacquard loom weaving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">4</div>
                      <span className="text-[#3E2F26]/70 text-sm">Zari & finishing work</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#3E2F26]/10">
                    <span className="text-[#C6A75E] text-xs tracking-[0.15em] uppercase">
                      15-45 Days
                    </span>
                    <span className="text-[#3E2F26]/40 text-xs ml-2">per piece</span>
                  </div>
                </div>
              </div>

              <div className="craft-card group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C6A75E]/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#6B1F2B]/10 flex items-center justify-center mb-6">
                    <span className="text-3xl">🏺</span>
                  </div>
                  <h3 className="text-[#3E2F26] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Blue Pottery
                  </h3>
                  <p className="text-[#3E2F26]/60 text-sm mb-6 leading-relaxed">
                    Made from quartz stone powder, not clay. The distinctive turquoise color comes from copper oxide. Each piece is hand-painted with natural pigments and fired at low temperature.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">1</div>
                      <span className="text-[#3E2F26]/70 text-sm">Quartz dough preparation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">2</div>
                      <span className="text-[#3E2F26]/70 text-sm">Molding & shaping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">3</div>
                      <span className="text-[#3E2F26]/70 text-sm">Hand-painting motifs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">4</div>
                      <span className="text-[#3E2F26]/70 text-sm">Kiln firing & glazing</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#3E2F26]/10">
                    <span className="text-[#C6A75E] text-xs tracking-[0.15em] uppercase">
                      3-7 Days
                    </span>
                    <span className="text-[#3E2F26]/40 text-xs ml-2">per piece</span>
                  </div>
                </div>
              </div>

              <div className="craft-card group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C6A75E]/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-150" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#6B1F2B]/10 flex items-center justify-center mb-6">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h3 className="text-[#3E2F26] text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Kundan Jewelry
                  </h3>
                  <p className="text-[#3E2F26]/60 text-sm mb-6 leading-relaxed">
                    Set in 24k gold-plated silver, each stone is hand-cut and placed using the ancient "paintee" technique. The process requires exceptional precision and patience.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">1</div>
                      <span className="text-[#3E2F26]/70 text-sm">Gold-plated silver setting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">2</div>
                      <span className="text-[#3E2F26]/70 text-sm">Stone selection & cutting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">3</div>
                      <span className="text-[#3E2F26]/70 text-sm">Meenakari enamel work</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E] text-xs font-bold">4</div>
                      <span className="text-[#3E2F26]/70 text-sm">Final polish & setting</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#3E2F26]/10">
                    <span className="text-[#C6A75E] text-xs tracking-[0.15em] uppercase">
                      10-20 Days
                    </span>
                    <span className="text-[#3E2F26]/40 text-xs ml-2">per piece</span>
                  </div>
                </div>
              </div>
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
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="chakra-text text-center opacity-0">
              <span className="text-[#C6A75E] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                Ancient Wisdom
              </span>
              <h2 
                className="text-[#F5EFE6] text-4xl md:text-6xl leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Wheel of<br />
                <span className="italic">Craftsmanship</span>
              </h2>
              <p className="text-[#F5EFE6]/70 text-lg mt-6 max-w-md mx-auto">
                Like the chakra that has guided civilizations, each artisan's skill turns possibility into timeless art.
              </p>
            </div>
          </div>
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

        {/* Artisan Voices Section */}
        <section id="artisan-voices" className="py-32 px-6 bg-[#3E2F26] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C6A75E] text-xs tracking-[0.4em] uppercase font-ui block mb-4">
                The Makers
              </span>
              <h2 
                className="text-[#F5EFE6] text-4xl md:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Voices of the Artisan
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {artisanVoices.map((artisan, index) => (
                <div 
                  key={index}
                  className="artisan-voice-card group relative bg-gradient-to-b from-[#F5EFE6]/10 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-[#F5EFE6]/10 hover:border-[#C6A75E]/30 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F5EFE6]/10">
                    <div className="w-16 h-16 rounded-full bg-[#6B1F2B]/50 flex items-center justify-center">
                      <span className="text-[#C6A75E] text-xl font-heading" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {artisan.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#F5EFE6] text-sm font-ui font-semibold">
                        {artisan.name}
                      </p>
                      <p className="text-[#F5EFE6]/50 text-xs">
                        {artisan.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-[#C6A75E] text-[10px] tracking-[0.15em] uppercase mb-1">
                      {artisan.craft}
                    </p>
                    <p className="text-[#F5EFE6]/40 text-xs italic">
                      {artisan.craftDetail}
                    </p>
                  </div>
                  
                  <Quote className="w-6 h-6 text-[#C6A75E]/30 mb-4" />
                  
                  <p className="text-[#F5EFE6]/80 text-sm leading-relaxed italic">
                    "{artisan.quote}"
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-[#F5EFE6]/10 flex items-center justify-between">
                    <span className="text-[#C6A75E] text-xs">
                      {artisan.yearsOfCraft}
                    </span>
                    <span className="text-[#F5EFE6]/30 text-xs">
                      of mastery
                    </span>
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