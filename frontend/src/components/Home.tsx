import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//images - using public folder paths
const clouds_1 = "/HomePage/clouds_1.png";
const clouds_2 = "/HomePage/clouds_2.png";
const bg = "/HomePage/full.png";
const fg = "/HomePage/man2.png";
const ramayanBG = "/HomePage/ramayanBG.png";
const ramayanFG = "/HomePage/ramayanFG.png";
const arrowFG = "/HomePage/arrowFG.png";
const arrowBGNew = "/HomePage/RamHoverBG_Large.png";
const arrowRotate = "/HomePage/arrowRotate.png";
const rathBG = "/HomePage/rathBG.png";
const rathFG = "/HomePage/rathFG.png";
const flybird = "/HomePage/flybird.gif";

import IndianNavbarFixed from "../components/IndianNavbarFixed";
import { Footer } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const [arrowBGNew1, setRathBgSrc] = useState<any>(arrowBGNew);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const router = useRouter();

  const imageUrls: string[] = [
    clouds_1,
    clouds_2,
    bg,
    fg,
    ramayanBG,
    ramayanFG,
    arrowFG,
    arrowBGNew,
    arrowRotate,
    rathBG,
    rathFG,
    flybird
  ];

  // Preload images with timeout fallback
  useEffect(() => {
    const RathBGImg = new Image();
    RathBGImg.src = arrowBGNew;
    RathBGImg.onload = () => {
      setRathBgSrc(RathBGImg.src);
    };

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });

    // Fallback timeout to ensure loading completes
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
      setShowLoading(false);
      setLoadingComplete(true);
    }, 3000); // 3 seconds fallback

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // GSAP animations - simplified for better performance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#bg", {
        scrollTrigger: {
          scrub: 0.5,
        },
      });
      gsap.to("#cloud2", {
        x: -750,
        scrollTrigger: {
          scrub: 0.5,
        },
      });

      gsap.to("#heading-h2", {
        x: "100%",
        scrollTrigger: {
          trigger: "#heading",
          scrub: 1,
        },
      });

      gsap.to(".arrowBGNew", {
        scale: 1.2,
        scrollTrigger: {
          trigger: ".section2",
          scrub: 1,
        },
      });

      gsap.to(".section2 #arrowRotate", {
        scale: 1,
        rotate: 360,
        duration: 2.5,
        scrollTrigger: {
          trigger: ".section2",
          scrub: true,
        },
      });

      gsap.fromTo(
        "#rathFG",
        { x: 200 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: ".section3",
            scrub: 2,
          },
        }
      );

      gsap.to(".arrow", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".arrow",
          start: "top center",
          end: "50% center",
          scrub: true,
        },
      });

      gsap.to("#bird5", {
        x: -1400,
        duration: 10,
        repeat: -1,
        repeatDelay: 0.5,
        scrollTrigger: {
          trigger: ".section2",
          start: "top -35%",
          end: "bottom 100%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setLoadingComplete(true);
  };

  return (
    <div>
      {/* Loading Screen */}
      {showLoading && (
        <div className="fixed inset-0 bg-ivory/90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon border-t-transparent"></div>
            <p className="mt-4 text-walnut font-ui">Loading RangManch...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ 
        opacity: showLoading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        visibility: showLoading ? 'hidden' : 'visible'
      }}>
        <IndianNavbarFixed />
        
        {/* Section 1: Top Section */}
        <section className="section" id="top-section">
          <img src={bg} id="bg" alt="bg" />
          
          {/* Rangmanch Hero Text */}
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

        {/* Section 2: Ramayan Section */}
        <section className="section1">
          <img src={ramayanBG} id="rmynBG" alt="rmynBG" />
          
          {/* Bird images */}
          <img src={flybird} id="bird1" alt="bird" />
          <img src={flybird} id="bird2" alt="bird" />
          <img src={flybird} id="bird3" alt="bird" />
          <img src={flybird} id="bird4" alt="bird" />
          
          {/* Project Description */}
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
              style={{
                padding: "12px 30px",
                background: "#C6A75E",
                color: "#3E2F26",
                border: "none",
                borderRadius: "50px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "Inter, sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Shop the Collection
            </button>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #F5EFE6 0%, #D8CFC4 100%)",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#3E2F26",
              marginBottom: "60px",
              fontFamily: "Cormorant Garamond, serif"
            }}>
              Discover India's Living Heritage
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              marginBottom: "60px"
            }}>
              <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(62, 47, 38, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "20px"
                }}>
                  🛍️
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#3E2F26",
                  marginBottom: "15px",
                  fontFamily: "Cormorant Garamond, serif"
                }}>
                  Shop Authentic Indian Crafts
                </h3>
                <p style={{
                  color: "#6B1F2B",
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  Browse 15,000+ handcrafted products directly from master artisans. Every purchase preserves traditional techniques and supports sustainable livelihoods.
                </p>
              </div>

              <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(62, 47, 38, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "20px"
                }}>
                  👨‍🎨
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#3E2F26",
                  marginBottom: "15px",
                  fontFamily: "Cormorant Garamond, serif"
                }}>
                  Connect with Master Artisans
                </h3>
                <p style={{
                  color: "#6B1F2B",
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  Discover the stories behind each craft. Learn from generations of master craftsmen and women through virtual workshops and live demonstrations.
                </p>
              </div>

              <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(62, 47, 38, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "20px"
                }}>
                  🏛️
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#3E2F26",
                  marginBottom: "15px",
                  fontFamily: "Cormorant Garamond, serif"
                }}>
                  Preserve Heritage, Empower Communities
                </h3>
                <p style={{
                  color: "#6B1F2B",
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  Join our mission to preserve India's cultural heritage. Every artisan partnership creates sustainable economic opportunities in rural communities.
                </p>
              </div>
            </div>

            <div style={{
              textAlign: "center",
              padding: "30px",
              background: "rgba(198, 167, 94, 0.1)",
              borderRadius: "15px",
              border: "2px solid #C6A75E"
            }}>
              <p style={{
                fontSize: "1.2rem",
                color: "#3E2F26",
                fontWeight: "600",
                marginBottom: "20px"
              }}>
                Ready to be part of the heritage revolution?
              </p>
              <button 
                onClick={() => router.push("/trade")}
                style={{
                  padding: "15px 40px",
                  background: "#C6A75E",
                  color: "#3E2F26",
                  border: "none",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginRight: "15px"
                }}
              >
                Start Shopping
              </button>
              <button 
                onClick={() => router.push("/artisans")}
                style={{
                  padding: "15px 40px",
                  background: "transparent",
                  color: "#3E2F26",
                  border: "2px solid #C6A75E",
                  borderRadius: "50px",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                Meet Artisans
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Arrow Section */}
        <section className="section2">
          <img src={arrowBGNew1} id="arrowBG123" className="arrowBGNew" alt="Arrow BG Sky" />
          <img src={arrowRotate} id="arrowRotate" alt="arrowRotate" />
          <img src={arrowFG} id="arrowFG" alt="arrowFG" />
        </section>

        {/* Section 4: Rath Section */}
        <section className="section3">
          <img src={rathBG} id="rathBG" alt="rathBG" />
          <img src={rathFG} id="rathFG" alt="rathFG" />
        </section>

        {/* RANGMANCH PLATFORM FEATURES SECTIONS */}
        <div className="sec" style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          padding: "80px 40px",
          margin: "0",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)",
            borderRadius: "50%"
          }}></div>
          
          <div id="my-footer">
          <Footer />
        </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <div className="feature-card" style={{
              background: "rgba(30, 41, 59, 0.7)",
              padding: "40px 30px",
              borderRadius: "20px",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.3s ease"
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px"
              }}>
                <span style={{ fontSize: "30px" }}>🗺️</span>
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                marginBottom: "15px",
                color: "#f8fafc"
              }}>
                Interactive Dance Maps
              </h3>
              <p style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#cbd5e1",
                marginBottom: "20px"
              }}>
                Explore India's cultural geography through clickable Leaflet.js maps. 
                Each region reveals multimedia dossiers of traditional costumes, 
                music archives, and live artisan demonstrations.
              </p>
              <div style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "20px",
                fontSize: "0.9rem",
                color: "#38bdf8"
              }}>
                Powered by Leaflet.js API
              </div>
            </div>

            <div className="feature-card" style={{
              background: "rgba(30, 41, 59, 0.7)",
              padding: "40px 30px",
              borderRadius: "20px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.3s ease"
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px"
              }}>
                <span style={{ fontSize: "30px" }}>🤖</span>
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                marginBottom: "15px",
                color: "#f8fafc"
              }}>
                Veda AI Curator
              </h3>
              <p style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#cbd5e1",
                marginBottom: "20px"
              }}>
                Conversational AI that transforms static history into interactive 
                learning. Ask about Bharatanatyam mudras or Rajasthani folk 
                instruments and receive contextual, branch-based responses.
              </p>
              <div style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "20px",
                fontSize: "0.9rem",
                color: "#8b5cf6"
              }}>
                AI-Powered Dialogue System
              </div>
            </div>

            <div className="feature-card" style={{
              background: "rgba(30, 41, 59, 0.7)",
              padding: "40px 30px",
              borderRadius: "20px",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.3s ease"
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px"
              }}>
                <span style={{ fontSize: "30px" }}>📦</span>
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                marginBottom: "15px",
                color: "#f8fafc"
              }}>
                Story of the Product
              </h3>
              <p style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#cbd5e1",
                marginBottom: "20px"
              }}>
                Every artifact includes immutable provenance tracking. Scan QR 
                codes to view artisan profiles, raw material origins, and the 
                complete journey from rural workshop to your home.
              </p>
              <div style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "20px",
                fontSize: "0.9rem",
                color: "#10b981"
              }}>
                Blockchain-Verified Provenance
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Artisan Empowerment */}
        <div className="sec" style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          padding: "80px 40px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
            borderRadius: "50%"
          }}></div>
          
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap"
          }}>
            <div style={{ flex: "1", minWidth: "300px" }}>
              <h2 style={{
                fontSize: "3rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: "800",
                color: "#78350f",
                marginBottom: "30px"
              }}>
                Empowering 7M+ Rural Artisans
              </h2>
              <p style={{
                fontSize: "1.2rem",
                lineHeight: "1.7",
                color: "#92400e",
                marginBottom: "30px"
              }}>
                We eliminate predatory intermediaries by providing direct 
                digital storefronts to rural creators. Our NGO-managed 
                architecture bridges the digital literacy gap, ensuring 
                even non-tech-savvy artisans can access global markets.
              </p>
              
              <div style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap"
              }}>
                <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  flex: "1",
                  minWidth: "200px"
                }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#d97706", marginBottom: "10px" }}>30-40%</div>
                  <div style={{ color: "#78350f", fontSize: "0.9rem" }}>Increased Income</div>
                </div>
                <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  flex: "1",
                  minWidth: "200px"
                }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#d97706", marginBottom: "10px" }}>7M+</div>
                  <div style={{ color: "#78350f", fontSize: "0.9rem" }}>Artisans Reached</div>
                </div>
                <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  flex: "1",
                  minWidth: "200px"
                }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#d97706", marginBottom: "10px" }}>0%</div>
                  <div style={{ color: "#78350f", fontSize: "0.9rem" }}>Middleman Commissions</div>
                </div>
              </div>
            </div>
            
            <div style={{
              flex: "1",
              minWidth: "300px",
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(120, 53, 15, 0.1)"
            }}>
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Artisan at work"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <div style={{ padding: "30px" }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  color: "#78350f",
                  marginBottom: "15px"
                }}>
                  NGO-Facilitated Digital Onboarding
                </h3>
                <p style={{ color: "#92400e", lineHeight: "1.6" }}>
                  Local organizations act as digital ambassadors, managing 
                  inventory, quality checks, and logistics for remote artisans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Youth Engagement */}
        <div className="sec" style={{
          background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
          padding: "80px 40px",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <h2 style={{
              textAlign: "center",
              fontSize: "3rem",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: "800",
              color: "#065f46",
              marginBottom: "60px"
            }}>
              Culture Reimagined for Gen-Z
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
              marginBottom: "60px"
            }}>
              <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(6, 95, 70, 0.1)"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎮</div>
                <h3 style={{ fontSize: "1.5rem", color: "#065f46", marginBottom: "15px" }}>Gamified Learning</h3>
                <p style={{ color: "#047857" }}>Earn badges by completing cultural challenges and mastering traditional skills</p>
              </div>
              <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(6, 95, 70, 0.1)"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎬</div>
                <h3 style={{ fontSize: "1.5rem", color: "#065f46", marginBottom: "15px" }}>Community Clips</h3>
                <p style={{ color: "#047857" }}>Short-form video platform for artisans to share making-of content</p>
              </div>
              <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(6, 95, 70, 0.1)"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎓</div>
                <h3 style={{ fontSize: "1.5rem", color: "#065f46", marginBottom: "15px" }}>Virtual Apprenticeships</h3>
                <p style={{ color: "#047857" }}>Live sessions with master artisans through interactive video streams</p>
              </div>
            </div>
            
            <div style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: "20px",
              padding: "50px",
              color: "white",
              textAlign: "center"
            }}>
              <h3 style={{
                fontSize: "2rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                marginBottom: "20px"
              }}>
                Stemming the Brain Drain
              </h3>
              <p style={{
                fontSize: "1.2rem",
                lineHeight: "1.7",
                maxWidth: "800px",
                margin: "0 auto"
              }}>
                By providing modern digital livelihoods and global visibility, 
                we're creating economic incentives for youth to preserve ancestral 
                skills rather than migrate to urban centers.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Tech Stack & Future Vision */}
        <div className="sec" style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          color: "white",
          padding: "80px 40px",
          position: "relative"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "60px",
              flexWrap: "wrap",
              marginBottom: "60px"
            }}>
              <div style={{ flex: "1", minWidth: "300px" }}>
                <h2 style={{
                  fontSize: "3rem",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontWeight: "800",
                  marginBottom: "30px",
                  background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  Sovereign Tech Stack
                </h2>
                <p style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.7",
                  color: "#c7d2fe",
                  marginBottom: "30px"
                }}>
                  Built entirely on indigenous technology, Rangmanch represents 
                  India's commitment to digital sovereignty and self-reliance in 
                  preserving cultural heritage.
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                  {["React.js", "Express.js", "PostgreSQL", "Supabase", "Leaflet.js", "H5P"].map(tech => (
                    <div key={tech} style={{
                      padding: "10px 20px",
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      borderRadius: "10px",
                      fontSize: "0.9rem"
                    }}>{tech}</div>
                  ))}
                </div>
              </div>
              
              <div style={{
                flex: "1",
                minWidth: "300px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "40px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#e0e7ff" }}>Future Roadmap</h3>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {[
                    { q: "Q1", text: "Pan-India expansion to all 28 states & 8 UTs" },
                    { q: "Q2", text: "DigiLocker integration for digital artisan certificates" },
                    { q: "Q3", text: "B2B licensing to museums, schools & tourism boards" }
                  ].map((item, idx) => (
                    <li key={idx} style={{
                      padding: "15px 0",
                      borderBottom: idx < 2 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px"
                    }}>
                      <div style={{
                        width: "30px",
                        height: "30px",
                        background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        color: "white"
                      }}>{item.q}</div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={{
              textAlign: "center",
              marginTop: "60px",
              padding: "60px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h3 style={{
                fontSize: "2.5rem",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: "800",
                marginBottom: "20px",
                background: "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Join the Digital Heritage Revolution
              </h3>
              <p style={{
                fontSize: "1.2rem",
                color: "#c7d2fe",
                maxWidth: "800px",
                margin: "0 auto 40px",
                lineHeight: "1.7"
              }}>
                Whether you're an artisan seeking global reach, a cultural 
                enthusiast wanting to learn, or an organization looking to 
                collaborate—there's a place for you in the Rangmanch ecosystem.
              </p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <button 
                  onClick={() => router.push('/login')}
                  style={{
                    padding: "15px 40px",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                    border: "none",
                    borderRadius: "50px",
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
                  }}
                >
                  Explore Marketplace
                </button>
                <button style={{
                  padding: "15px 40px",
                  background: "transparent",
                  border: "2px solid #8b5cf6",
                  borderRadius: "50px",
                  color: "#8b5cf6",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}>
                  View Cultural Archive
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="my-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
