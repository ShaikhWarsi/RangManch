'use client'

import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import data from "../IndianData/UpdateIndiaGeo.json";
import "../styles/IndiaMap.css";
import { Building, Home, MapPin, Trees, Anchor, Target, X } from "lucide-react";

// Dynamic imports for leaflet components with proper types
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod: any) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod: any) => mod.TileLayer),
  { ssr: false }
);

const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);

// Dynamic import for L (leaflet) to avoid SSR issues
let L: any = null;

// Helper function to get L
const getL = async () => {
  if (!L) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
  }
  return L;
};

// Dynamic component wrapper
const IndiaMapWrapper = React.memo(() => {
  const [isClient, setIsClient] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getL().then(() => {
      setLeafletLoaded(true);
    });
    
    return () => {
      setIsClient(false);
      setLeafletLoaded(false);
    };
  }, []);

  if (!isClient || !leafletLoaded) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div>Loading Map...</div>
      </div>
    );
  }

  return <IndiaMap />;
});

// --- TypeScript Interfaces ---

interface HeritageInfo {
  crafts: string[];
  colors: string[];
  icon: React.ReactNode;
  description: string;
}

interface StateHeritageMap {
  [key: string]: HeritageInfo;
}

interface ResponsiveMetrics {
  isMobile: boolean;
  isTablet: boolean;
  windowWidth: number;
}

// Custom hook for responsive design
const useResponsive = (): ResponsiveMetrics => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isTablet, setIsTablet] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, windowWidth };
};

const MapContainerAny = MapContainer as any;
const TileLayerAny = TileLayer as any;
const GeoJSONAny = GeoJSON as any;
const ZoomControlAny = ZoomControl as any;

const IndiaMap: React.FC = () => {
  const { isMobile, isTablet, windowWidth } = useResponsive();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const mapRef = useRef<any>(null);
  const [mapKey, setMapKey] = useState(0);
  
  // Force map re-initialization when mobile state changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [isMobile]);
  
  // Cultural heritage info for each state
  const stateHeritageInfo: StateHeritageMap = {
    "Rajasthan": {
      crafts: ["Blue Pottery", "Miniature Paintings", "Block Printing"],
      colors: ["#FF6B6B", "#4ECDC4"],
      icon: <Building size={24} />,
      description: "Land of forts and vibrant handicrafts"
    },
    "Tamil Nadu": {
      crafts: ["Kanjivaram Silk", "Tanjore Paintings", "Bronze Sculptures"],
      colors: ["#45B7D1", "#96CEB4"],
      icon: <Home size={24} />,
      description: "Home to ancient temples and silk weaving"
    },
    "Uttar Pradesh": {
      crafts: ["Banarasi Silk", "Chikankari", "Marble Inlay"],
      colors: ["#FFEAA7", "#DDA0DD"],
      icon: <MapPin size={24} />,
      description: "Epicenter of textile arts and Mughal crafts"
    },
    "Gujarat": {
      crafts: ["Bandhani", "Patola Silk", "Wood Carving"],
      colors: ["#A8E6CF", "#DCEDC1"],
      icon: <Trees size={24} />,
      description: "Colorful textiles and folk traditions"
    },
    "Kerala": {
      crafts: ["Coir Products", "Wooden Toys", "Murals"],
      colors: ["#FFAAA5", "#FF8B94"],
      icon: <Anchor size={24} />,
      description: "Backwater artisans and natural crafts"
    }
  };

  const currentStates = Object.keys(stateHeritageInfo);

  const getStateStyle = (feature: any) => {
    const stateName = feature.properties.ST_NM;
    const isActive = currentStates.includes(stateName);
    const isHovered = hoveredState === stateName;
    
    if (isHovered) {
      return {
        fillColor: stateHeritageInfo[stateName]?.colors[0] || "#FFD700",
        color: "#FFFFFF",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
        dashArray: "0"
      };
    }
    
    if (isActive) {
      return {
        fillColor: stateHeritageInfo[stateName]?.colors[0] || "#FF6B6B",
        color: "#FFFFFF",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
        dashArray: "0"
      };
    }
    
    return {
      fillColor: "#2D3748",
      color: "#4A5568",
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.4,
      dashArray: "3"
    };
  };

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    
    const stateNameFormatted = stateName.split(" ").join("").toLowerCase();
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = `/state/${stateNameFormatted}`;
      }
    }, 1500);
  };

  // Mobile toggle button
  const MobileToggleButton = () => (
    <button
      onClick={() => setShowMobilePanel(!showMobilePanel)}
      style={{
        position: "absolute",
        bottom: isMobile ? "90px" : "30px",
        right: "20px",
        zIndex: 1000,
        width: isMobile ? "56px" : "48px",
        height: isMobile ? "56px" : "48px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FF6B6B 0%, #C44569 100%)",
        border: "none",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
    >
      {showMobilePanel ? <X size={24} /> : <Target size={24} />}
    </button>
  );

  return (
    <div style={{
      position: "relative",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
    }}>
      {/* Responsive Header Overlay */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        zIndex: 1000,
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%)",
        padding: isMobile ? "15px 20px" : "30px 40px",
        pointerEvents: "none"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "10px" : "0",
          pointerEvents: "auto"
        }}>
          <div>
            <h1 style={{
              margin: "0",
              fontSize: isMobile ? "1.5rem" : isTablet ? "2rem" : "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(90deg, #FFD700, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Noto Serif Devanagari', serif",
              lineHeight: "1.2"
            }}>
              {isMobile ? "Rangmanch" : "Rangmanch Cultural Map"}
            </h1>
            {!isMobile && (
              <p style={{
                margin: "5px 0 0 0",
                color: "#CBD5E1",
                fontSize: "1.1rem",
                fontWeight: "300"
              }}>
                Explore India's heritage through interactive geography
              </p>
            )}
          </div>
          
          <div style={{
            display: "flex",
            gap: isMobile ? "8px" : "15px",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-end"
          }}>
            <button style={{
              padding: isMobile ? "8px 12px" : "12px 25px",
              background: "rgba(255, 215, 0, 0.15)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              borderRadius: isMobile ? "20px" : "25px",
              color: "#FFD700",
              fontWeight: "600",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              whiteSpace: "nowrap",
              flex: isMobile ? "1" : "none"
            }}>
              {isMobile ? "🗺️ States" : "🗺️ Explore All States"}
            </button>
            <button style={{
              padding: isMobile ? "8px 12px" : "12px 25px",
              background: "linear-gradient(135deg, #FF6B6B 0%, #C44569 100%)",
              border: "none",
              borderRadius: isMobile ? "20px" : "25px",
              color: "white",
              fontWeight: "600",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flex: isMobile ? "1" : "none"
            }}>
              {isMobile ? "🎭 Trails" : "🎭 View Heritage Trails"}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div key={`map-wrapper-${isMobile ? 'mobile' : 'desktop'}`}>
        <MapContainerAny
          key={mapKey}
          center={[22.5, 80]}
          zoom={isMobile ? 4 : 4.5}
          style={{ 
            height: "100vh", 
            width: "100vw",
            filter: "brightness(0.95) contrast(1.1)"
          }}
          zoomControl={false}
          scrollWheelZoom={true}
          attributionControl={false}
        >
        <TileLayerAny
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <ZoomControlAny position="bottomright" />

        <GeoJSONAny
          key={isMobile ? 'mobile' : 'desktop'}
          data={data as any}
            onEachFeature={(feature: any, layer: L.Layer) => {
              const stateName = feature.properties.ST_NM;
              const heritageInfo = stateHeritageInfo[stateName];
              
              (layer as L.Path).setStyle(getStateStyle(feature));

              layer.on("click", () => {
                const stateFeature = (data as any).features.find((f: any) => f.properties.ST_NM === stateName);
                if (stateFeature) {
                  const bounds = L.geoJSON(stateFeature).getBounds();
                  handleStateClick(stateName);
                  if (isMobile) setShowMobilePanel(false);
                }
              });

              // Simplified tooltip for mobile
              layer.bindTooltip(`
                <div style="
                  padding: ${isMobile ? '10px' : '15px'};
                  background: rgba(15, 23, 42, 0.95);
                  border-radius: ${isMobile ? '8px' : '12px'};
                  border: 2px solid ${heritageInfo?.colors?.[0] || "#FFD700"};
                  backdrop-filter: blur(10px);
                  color: white;
                  min-width: ${isMobile ? '150px' : '200px'};
                  max-width: ${isMobile ? '200px' : '300px'};
                  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: ${isMobile ? '5px' : '10px'};
                    margin-bottom: ${isMobile ? '5px' : '10px'};
                  ">
                    <span style="font-size: ${isMobile ? '1.2rem' : '1.5rem'}">${heritageInfo?.icon || "📍"}</span>
                    <h3 style="margin: 0; color: ${heritageInfo?.colors?.[0] || "#FFD700"}; font-size: ${isMobile ? '1rem' : '1.2rem'}">
                      ${stateName}
                    </h3>
                  </div>
                  ${heritageInfo && !isMobile ? `
                  <p style="margin: 0 0 10px 0; color: #CBD5E1; font-size: 0.9rem">
                    ${heritageInfo.description}
                  </p>
                  <div style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-top: 10px;
                  ">
                    ${heritageInfo.crafts.slice(0, isMobile ? 2 : 3).map(craft => `
                      <span style="
                        padding: ${isMobile ? '2px 6px' : '4px 10px'};
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: ${isMobile ? '8px' : '12px'};
                        font-size: ${isMobile ? '0.7rem' : '0.8rem'};
                        color: ${heritageInfo.colors[1] || "#4ECDC4"};
                      ">
                        ${craft}
                      </span>
                    `).join('')}
                  </div>
                  ` : ''}
                  ${currentStates.includes(stateName) ? `
                  <div style="
                    margin-top: ${isMobile ? '5px' : '10px'};
                    padding: ${isMobile ? '4px' : '8px'};
                    background: rgba(255, 215, 0, 0.1);
                    border-radius: ${isMobile ? '4px' : '8px'};
                    text-align: center;
                    font-size: ${isMobile ? '0.7rem' : '0.85rem'};
                    color: #FFD700;
                    font-weight: 600;
                  ">
                    🚀 Active Hub
                  </div>
                  ` : ''}
                </div>
              `, {
                sticky: true,
                direction: "top",
                offset: [0, -10],
                className: "custom-tooltip",
                opacity: 1
              });

              layer.on("mouseover", () => {
                setHoveredState(stateName);
                (layer as L.Path).setStyle(getStateStyle(feature));
                if (!isMobile) layer.openTooltip();
              });

              layer.on("mouseout", () => {
                setHoveredState(null);
                (layer as L.Path).setStyle(getStateStyle(feature));
                if (!isMobile) layer.closeTooltip();
              });
            }}
          />
        </MapContainerAny>
      </div>

      {/* Mobile Toggle Button */}
      <MobileToggleButton />

      {/* Responsive Side Panel */}
      {(!isMobile || showMobilePanel) && (
        <div style={{
          position: "absolute",
          width: isMobile ? "calc(100% - 40px)" : "300px",
          maxHeight: isMobile ? "70vh" : "fit-content",
          top: isMobile ? "auto" : "140px",
          bottom: isMobile ? "20px" : "auto",
          left: isMobile ? "20px" : "auto",
          right: isMobile ? "20px" : "30px",
          background: "rgba(15, 23, 42, 0.95)",
          padding: isMobile ? "20px" : "25px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          zIndex: 500,
          overflowY: isMobile ? "auto" : "visible",
          transition: "all 0.3s ease"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{
              width: isMobile ? "40px" : "50px",
              height: isMobile ? "40px" : "50px",
              background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
              borderRadius: isMobile ? "8px" : "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              flexShrink: 0
            }}>
              <Target size={isMobile ? 20 : 24} />
            </div>
            <div>
              <h3 style={{
                margin: "0",
                color: "white",
                fontSize: isMobile ? "1.1rem" : "1.3rem"
              }}>
                Active Heritage Hubs
              </h3>
              <p style={{
                margin: "5px 0 0 0",
                color: "#94A3B8",
                fontSize: isMobile ? "0.8rem" : "0.9rem"
              }}>
                Click to explore cultural treasures
              </p>
            </div>
          </div>

          {currentStates.map((state) => {
            const info = stateHeritageInfo[state];
            return (
              <div 
                key={state}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "15px",
                  padding: isMobile ? "12px" : "15px",
                  marginBottom: "15px",
                  border: selectedState === state ? "2px solid rgba(255, 215, 0, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  touchAction: "manipulation"
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateX(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = selectedState === state ? "translateX(-5px)" : "none";
                  }
                }}
                onClick={() => {
                  const stateFeature = (data as any).features.find((f: any) => f.properties.ST_NM === state);
                  if (stateFeature) {
                    const bounds = L.geoJSON(stateFeature).getBounds();
                    handleStateClick(stateFeature, bounds);
                    if (isMobile) setShowMobilePanel(false);
                  }
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px"
                }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: isMobile ? "8px" : "10px" 
                  }}>
                    <span style={{ fontSize: isMobile ? "1.2rem" : "1.3rem" }}>{info?.icon || "📍"}</span>
                    <span style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: isMobile ? "1rem" : "1.1rem"
                    }}>{state}</span>
                  </div>
                  <div style={{
                    padding: "4px 8px",
                    background: "rgba(255, 107, 107, 0.2)",
                    borderRadius: "20px",
                    color: "#FF6B6B",
                    fontSize: isMobile ? "0.7rem" : "0.8rem",
                    fontWeight: "600"
                  }}>
                    Live
                  </div>
                </div>
                <p style={{
                  margin: "0 0 8px 0",
                  color: "#94A3B8",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  lineHeight: "1.4"
                }}>
                  {info?.description || "Explore cultural heritage"}
                </p>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px"
                }}>
                  {info?.crafts?.slice(0, isMobile ? 2 : 3).map((craft, idx) => (
                    <span key={idx} style={{
                      padding: isMobile ? "2px 6px" : "3px 8px",
                      background: `rgba(${parseInt(info.colors[0].slice(1, 3), 16)}, ${parseInt(info.colors[0].slice(3, 5), 16)}, ${parseInt(info.colors[0].slice(5, 7), 16)}, 0.2)`,
                      borderRadius: isMobile ? "8px" : "10px",
                      fontSize: isMobile ? "0.65rem" : "0.75rem",
                      color: info.colors[0]
                    }}>
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{
            marginTop: "20px",
            padding: isMobile ? "12px" : "15px",
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)",
            borderRadius: "15px",
            border: "1px solid rgba(255, 215, 0, 0.3)"
          }}>
            <p style={{
              margin: "0",
              color: "#FFD700",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              textAlign: "center",
              fontWeight: "500"
            }}>
              🌟 {isMobile ? "More states coming soon!" : "Coming Soon: More states will be added as we expand our heritage mapping"}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Legend - Simplified for Mobile */}
      {!isMobile && (
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15, 23, 42, 0.9)",
          padding: "12px 20px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          gap: "20px",
          zIndex: 500
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "16px",
              height: "16px",
              background: "#FF6B6B",
              borderRadius: "4px",
              opacity: 0.7
            }}></div>
            <span style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Active Hub</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "16px",
              height: "16px",
              background: "#2D3748",
              borderRadius: "4px",
              opacity: 0.4,
              border: "1px dashed #4A5568"
            }}></div>
            <span style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Coming Soon</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMapWrapper;
