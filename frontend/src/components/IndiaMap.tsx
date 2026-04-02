'use client'

import React, { useState } from "react";
import { X, ArrowRight, Star, ShoppingCart, MapPin, Palette } from "lucide-react";
import { apiService, Product } from "../services/api";

interface StateInfo {
  crafts: string[];
  colors: string[];
  description: string;
}

const stateHeritageInfo: Record<string, StateInfo> = {
  "Rajasthan": {
    crafts: ["Blue Pottery", "Block Printing", "Handwoven Textiles"],
    colors: ["#FF6B6B", "#4ECDC4"],
    description: "Land of forts and vibrant handicrafts"
  },
  "Tamil Nadu": {
    crafts: ["Kanjivaram Silk", "Tanjore Paintings", "Bronze Sculptures"],
    colors: ["#45B7D1", "#96CEB4"],
    description: "Home to ancient temples and silk weaving"
  },
  "Uttar Pradesh": {
    crafts: ["Banarasi Silk", "Chikankari", "Marble Inlay"],
    colors: ["#FFEAA7", "#DDA0DD"],
    description: "Epicenter of textile arts and Mughal crafts"
  },
  "Gujarat": {
    crafts: ["Bandhani", "Patola Silk", "Wood Carving"],
    colors: ["#A8E6CF", "#DCEDC1"],
    description: "Colorful textiles and folk traditions"
  },
  "Kerala": {
    crafts: ["Coir Products", "Wooden Toys", "Murals"],
    colors: ["#FFAAA5", "#FF8B94"],
    description: "Backwater artisans and natural crafts"
  },
  "Maharashtra": {
    crafts: ["Paithani Silk", "Bidriware", "Warli Art"],
    colors: ["#FFB347", "#FFCC80"],
    description: "Rich folk art and prestigious textiles"
  },
  "West Bengal": {
    crafts: ["Baluchari Sarees", "Terracotta", "Dokra Art"],
    colors: ["#9B59B6", "#8E44AD"],
    description: "Artistic heritage and handloom traditions"
  },
  "Karnataka": {
    crafts: ["Mysore Silk", "Sandur Lambani", "Channapatna Toys"],
    colors: ["#3498DB", "#2980B9"],
    description: "Silk city and traditional craftsmanship"
  },
  "Odisha": {
    crafts: ["Pattachitra", "Sambalpuri Sarees", "Silver Filigree"],
    colors: ["#E67E22", "#D35400"],
    description: "Ancient art forms and woven masterpieces"
  },
  "Andhra Pradesh": {
    crafts: ["Kalamkari", "Bandhani", "Bronze Castings"],
    colors: ["#1ABC9C", "#16A085"],
    description: "Ancient painting traditions and metal arts"
  }
};

const statePaths: Record<string, string> = {
  "Rajasthan": "M120,120 L180,100 L220,140 L240,200 L220,260 L160,280 L100,240 L80,180 Z",
  "Gujarat": "M60,200 L100,180 L120,220 L100,280 L60,300 L40,260 Z",
  "Maharashtra": "M100,280 L140,260 L160,300 L140,360 L100,380 L80,340 Z",
  "Tamil Nadu": "M140,380 L160,360 L180,400 L160,460 L130,480 L120,420 Z",
  "Kerala": "M130,420 L150,400 L160,440 L140,480 L120,460 Z",
  "Karnataka": "M120,320 L160,300 L180,340 L160,400 L120,420 L100,360 Z",
  "Andhra Pradesh": "M160,320 L200,300 L220,340 L200,400 L160,400 L150,360 Z",
  "Odisha": "M200,280 L240,260 L260,300 L240,340 L200,340 L190,300 Z",
  "West Bengal": "M220,220 L260,200 L280,240 L260,280 L220,280 L210,240 Z",
  "Uttar Pradesh": "M180,140 L240,120 L280,160 L260,220 L200,220 L170,180 Z"
};

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts(1, 50);
        if (response.success && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log('Using mock products');
      }
    };
    fetchProducts();
  }, []);

  const getStateProducts = (stateName: string): Product[] => {
    const stateInfo = stateHeritageInfo[stateName];
    if (!stateInfo) return [];

    return products.filter(product => {
      const productName = product.name.toLowerCase();
      const productDesc = product.description.toLowerCase();
      return stateInfo.crafts.some(craft =>
        productName.includes(craft.toLowerCase()) ||
        productDesc.includes(craft.toLowerCase())
      );
    });
  };

  const navigateToProduct = (productId: string) => {
    window.location.href = `/product/${productId}`;
  };

  const navigateToMarketplace = () => {
    window.location.href = '/trade';
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <h1 style={{
              margin: "0",
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(90deg, #FFD700, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Noto Serif Devanagari', serif"
            }}>
              Rangmanch Cultural Map
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#CBD5E1",
              fontSize: "1.1rem"
            }}>
              Discover local cultural arts from across India
            </p>
          </div>
          <button
            onClick={navigateToMarketplace}
            style={{
              padding: "12px 25px",
              background: "linear-gradient(135deg, #FF6B6B 0%, #C44569 100%)",
              border: "none",
              borderRadius: "25px",
              color: "white",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <ShoppingCart size={18} />
            Browse Marketplace
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: selectedState ? "1fr 400px" : "1fr",
          gap: "30px",
          alignItems: "start"
        }}>
          <div style={{
            background: "rgba(15, 23, 42, 0.8)",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <svg
              viewBox="0 0 400 550"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh"
              }}
            >
              {Object.entries(statePaths).map(([stateName, path]) => {
                const info = stateHeritageInfo[stateName];
                const isHovered = hoveredState === stateName;
                const isSelected = selectedState === stateName;

                return (
                  <g key={stateName}>
                    <path
                      d={path}
                      fill={info?.colors[0] || "#4A5568"}
                      stroke={isSelected || isHovered ? "#FFD700" : "#1e293b"}
                      strokeWidth={isSelected || isHovered ? 3 : 1}
                      opacity={isSelected || isHovered ? 1 : 0.7}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: isHovered ? "scale(1.02)" : "scale(1)",
                        transformOrigin: "center"
                      }}
                      onClick={() => setSelectedState(stateName)}
                      onMouseEnter={() => setHoveredState(stateName)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                    <text
                      x={path.split(" ")[1]}
                      y={path.split(" ")[2]}
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      style={{ pointerEvents: "none" }}
                    >
                      {stateName.split(" ").map((word, i) => (
                        <tspan key={i} x={path.split(" ")[1]} dy={i * 12}>
                          {word}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "30px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  background: "#FF6B6B",
                  borderRadius: "4px"
                }}></div>
                <span style={{ color: "#CBD5E1", fontSize: "0.85rem" }}>Cultural Hub</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "16px",
                  height: "16px",
                  background: "#4A5568",
                  borderRadius: "4px"
                }}></div>
                <span style={{ color: "#CBD5E1", fontSize: "0.85rem" }}>Coming Soon</span>
              </div>
            </div>
          </div>

          {selectedState && (
            <div style={{
              background: "rgba(15, 23, 42, 0.95)",
              borderRadius: "20px",
              padding: "25px",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              maxHeight: "80vh",
              overflowY: "auto"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    background: `linear-gradient(135deg, ${stateHeritageInfo[selectedState]?.colors[0] || '#FF6B6B'} 0%, ${stateHeritageInfo[selectedState]?.colors[1] || '#4ECDC4'} 100%)`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <MapPin size={24} color="white" />
                  </div>
                  <div>
                    <h3 style={{
                      margin: "0",
                      color: "white",
                      fontSize: "1.4rem",
                      fontWeight: "700"
                    }}>
                      {selectedState}
                    </h3>
                    <p style={{
                      margin: "4px 0 0 0",
                      color: "#94A3B8",
                      fontSize: "0.9rem"
                    }}>
                      {stateHeritageInfo[selectedState]?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedState(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#94A3B8"
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px"
              }}>
                {stateHeritageInfo[selectedState]?.crafts.map((craft, idx) => (
                  <span key={idx} style={{
                    padding: "6px 12px",
                    background: `linear-gradient(135deg, ${stateHeritageInfo[selectedState]?.colors[0]}20 0%, ${stateHeritageInfo[selectedState]?.colors[1]}20 100%)`,
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    color: stateHeritageInfo[selectedState]?.colors[0],
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <Palette size={14} />
                    {craft}
                  </span>
                ))}
              </div>

              <h4 style={{
                margin: "0 0 15px 0",
                color: "#FFD700",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <ShoppingCart size={16} />
                Products from {selectedState}
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {getStateProducts(selectedState).length > 0 ? (
                  getStateProducts(selectedState).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => navigateToProduct(product._id)}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.transform = "translateX(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "rgba(255, 255, 255, 0.1)"
                      }}>
                        <img
                          src={product.images?.[0] || "https://via.placeholder.com/100"}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h5 style={{
                          margin: "0 0 4px 0",
                          color: "white",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}>
                          {product.name}
                        </h5>
                        <p style={{
                          margin: "0 0 8px 0",
                          color: "#94A3B8",
                          fontSize: "0.8rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}>
                          {product.description}
                        </p>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          <span style={{
                            color: "#FFD700",
                            fontSize: "0.95rem",
                            fontWeight: "700"
                          }}>
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.rating && (
                            <span style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              color: "#FFB347",
                              fontSize: "0.75rem"
                            }}>
                              <Star size={12} fill="#FFB347" />
                              {product.rating}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#94A3B8"
                      }}>
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    textAlign: "center",
                    padding: "30px 20px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "12px"
                  }}>
                    <p style={{
                      color: "#94A3B8",
                      fontSize: "0.9rem",
                      margin: "0 0 10px 0"
                    }}>
                      No products found for {selectedState} crafts
                    </p>
                    <button
                      onClick={navigateToMarketplace}
                      style={{
                        padding: "10px 20px",
                        background: "linear-gradient(135deg, #FF6B6B 0%, #C44569 100%)",
                        border: "none",
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Browse Full Marketplace
                    </button>
                  </div>
                )}
              </div>

              <div style={{
                marginTop: "20px",
                padding: "15px",
                background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 215, 0, 0.2)"
              }}>
                <p style={{
                  margin: "0",
                  color: "#FFD700",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  fontWeight: "500"
                }}>
                  🛒 Click any product to view on Marketplace
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}