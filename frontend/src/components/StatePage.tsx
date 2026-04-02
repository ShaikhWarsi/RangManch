import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import "../styles/StatePage.css";
import { theme } from '../styles/theme';

interface StateData {
  name: string;
  title: string;
  description: string;
  culture: {
    heritage: string;
    traditions: string[];
    festivals: string[];
  };
  crafts: {
    famous: string[];
    techniques: string[];
    artisans: number;
  };
  tourism: {
    attractions: string[];
    bestTime: string;
    climate: string;
  };
}

interface AllStatesData {
  [key: string]: StateData;
}

const StatePage = () => {
  const { stateName } = useParams();
  const [stateData, setStateData] = useState<StateData | null>(null);
  const [activeTab, setActiveTab] = useState("culture");

  // Use centralized theme colors for consistency
  const colors = {
    primary: theme.colors.maroon,
    secondary: theme.colors.gold,
    accent: theme.colors.teal,
    background: theme.colors.ivory,
    walnut: theme.colors.walnut,
    sand: theme.colors.sand
  };
    "tamilnadu": {
      primary: "#1A5276", // Deep Blue
      secondary: "#E74C3C", // Red
      accent: "#F39C12", // Orange
      background: "#F4F6F7" // Light blue
    },
    "default": {
      primary: "#2C3E50", // Dark Blue
      secondary: "#E74C3C", // Red
      accent: "#3498DB", // Light Blue
      background: "#F8F9F9" // Light gray
    }
  };

  // Get colors for current state
  const getStateColors = (): StateColors => {
    const key = typeof stateName === 'string' ? stateName.toLowerCase() : "default";
    return stateColors[key] || stateColors.default;
  };

  const colors = getStateColors();

  // Sample data structure for all states
  const allStatesData: AllStatesData = {
    "uttarpradesh": {
      name: "Uttar Pradesh",
      title: "The Cultural Heartland of India",
      description: "Land of ancient heritage, spiritual wisdom, and vibrant traditions",
      culture: {
        heritage: "Home to the Taj Mahal and countless pilgrimage sites",
        traditions: ["Classical Music", "Kathak Dance", "Ayurveda", "Yoga"],
        festivals: ["Diwali", "Holi", "Ram Navami", "Janmashtami"]
      },
      crafts: {
        famous: ["Chikankari Embroidery", "Banarasi Silk", "Brass Ware", "Pottery"],
        techniques: ["Hand Embroidery", "Weaving", "Metal Work", "Clay Art"],
        artisans: 25000
      },
      tourism: {
        attractions: ["Taj Mahal", "Varanasi Ghats", "Ayodhya", "Mathura"],
        bestTime: "October to March",
        climate: "Tropical Monsoon"
      }
    },
    "rajasthan": {
      name: "Rajasthan",
      title: "The Land of Kings and Colors",
      description: "A vibrant tapestry of royalty, desert landscapes, and rich culture",
      culture: {
        heritage: "Ancient forts, palaces, and royal traditions",
        traditions: ["Folk Music", "Ghoomar Dance", "Puppetry", "Turban Tying"],
        festivals: ["Pushkar Fair", "Desert Festival", "Gangaur", "Teej"]
      },
      crafts: {
        famous: ["Blue Pottery", "Block Printing", "Miniature Paintings", "Jewelry"],
        techniques: ["Hand Painting", "Block Printing", "Glazing", "Gem Setting"],
        artisans: 18000
      },
      tourism: {
        attractions: ["Jaipur Forts", "Udaipur Lakes", "Jaisalmer Desert", "Ranthambore"],
        bestTime: "October to March",
        climate: "Arid Desert"
      }
    },
    "tamilnadu": {
      name: "Tamil Nadu",
      title: "The Land of Temples and Traditions",
      description: "Ancient Dravidian culture, magnificent temples, and classical arts",
      culture: {
        heritage: "World's oldest living civilization and temple architecture",
        traditions: ["Bharatanatyam", "Carnatic Music", "Kolam Art", "Silk Weaving"],
        festivals: ["Pongal", "Tamil New Year", "Thaipusam", "Navaratri"]
      },
      crafts: {
        famous: ["Kanjivaram Silk", "Bronze Sculptures", "Thanjavur Paintings", "Stone Carvings"],
        techniques: ["Hand Weaving", "Lost Wax Casting", "Gold Leaf Work", "Stone Sculpture"],
        artisans: 22000
      },
      tourism: {
        attractions: ["Meenakshi Temple", "Mahabalipuram", "Kanyakumari", "Ooty"],
        bestTime: "September to March",
        climate: "Tropical"
      }
    }
  };

  useEffect(() => {
    // Load state data based on URL parameter
    if (typeof stateName === 'string') {
      const data = allStatesData[stateName.toLowerCase()];
      setStateData(data || null);
    }
  }, [stateName]);

  if (!stateData) {
    return (
      <div className="state-page-loading" style={{ backgroundColor: colors.background }}>
        <div className="loading-content">
          <h2 style={{ color: colors.primary }}>Loading State Information...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="state-page" style={{ backgroundColor: colors.background }}>
      {/* Header Section */}
      <div className="state-header" style={{ backgroundColor: colors.primary }}>
        <div className="header-content">
          <h1 className="state-title">{stateData.name}</h1>
          <h2 className="state-subtitle">{stateData.title}</h2>
          <p className="state-description">{stateData.description}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="state-tabs">
        <button
          className={`tab-button ${activeTab === "culture" ? "active" : ""}`}
          style={{ 
            backgroundColor: activeTab === "culture" ? colors.secondary : colors.background,
            color: activeTab === "culture" ? "white" : colors.primary
          }}
          onClick={() => setActiveTab("culture")}
        >
          Culture
        </button>
        <button
          className={`tab-button ${activeTab === "crafts" ? "active" : ""}`}
          style={{ 
            backgroundColor: activeTab === "crafts" ? colors.secondary : colors.background,
            color: activeTab === "crafts" ? "white" : colors.primary
          }}
          onClick={() => setActiveTab("crafts")}
        >
          Crafts
        </button>
        <button
          className={`tab-button ${activeTab === "tourism" ? "active" : ""}`}
          style={{ 
            backgroundColor: activeTab === "tourism" ? colors.secondary : colors.background,
            color: activeTab === "tourism" ? "white" : colors.primary
          }}
          onClick={() => setActiveTab("tourism")}
        >
          Tourism
        </button>
      </div>

      {/* Content Sections */}
      <div className="state-content">
        {activeTab === "culture" && (
          <div className="culture-section">
            <div className="heritage-card">
              <h3 style={{ color: colors.primary }}>Cultural Heritage</h3>
              <p>{stateData.culture.heritage}</p>
            </div>
            
            <div className="traditions-grid">
              <h4 style={{ color: colors.primary }}>Traditional Arts</h4>
              <div className="traditions-list">
                {stateData.culture.traditions.map((tradition, index) => (
                  <div key={index} className="tradition-item" style={{ 
                    backgroundColor: colors.secondary,
                    color: "white"
                  }}>
                    {tradition}
                  </div>
                ))}
              </div>
            </div>

            <div className="festivals-section">
              <h4 style={{ color: colors.primary }}>Festivals</h4>
              <div className="festivals-list">
                {stateData.culture.festivals.map((festival, index) => (
                  <div key={index} className="festival-item" style={{ 
                    borderLeft: `4px solid ${colors.accent}`
                  }}>
                    {festival}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "crafts" && (
          <div className="crafts-section">
            <div className="crafts-header">
              <h3 style={{ color: colors.primary }}>Traditional Crafts</h3>
              <p>Explore the rich heritage of artisanal crafts from {stateData.name}</p>
            </div>

            <div className="famous-crafts">
              <h4 style={{ color: colors.primary }}>Famous Crafts</h4>
              <div className="crafts-grid">
                {stateData.crafts.famous.map((craft, index) => (
                  <div key={index} className="craft-card" style={{ 
                    backgroundColor: colors.background,
                    border: `2px solid ${colors.secondary}`
                  }}>
                    <h5 style={{ color: colors.primary }}>{craft}</h5>
                  </div>
                ))}
              </div>
            </div>

            <div className="craft-techniques">
              <h4 style={{ color: colors.primary }}>Craft Techniques</h4>
              <div className="techniques-list">
                {stateData.crafts.techniques.map((technique, index) => (
                  <div key={index} className="technique-item" style={{ 
                    backgroundColor: colors.accent,
                    color: "white"
                  }}>
                    {technique}
                  </div>
                ))}
              </div>
            </div>

            <div className="artisan-count">
              <h4 style={{ color: colors.primary }}>Artisan Community</h4>
              <div className="count-display" style={{ 
                backgroundColor: colors.secondary,
                color: "white"
              }}>
                {stateData.crafts.artisans.toLocaleString()} Artisans
              </div>
            </div>
          </div>
        )}

        {activeTab === "tourism" && (
          <div className="tourism-section">
            <div className="tourism-header">
              <h3 style={{ color: colors.primary }}>Tourism Guide</h3>
              <p>Discover the best attractions and experiences in {stateData.name}</p>
            </div>

            <div className="attractions">
              <h4 style={{ color: colors.primary }}>Must-Visit Attractions</h4>
              <div className="attractions-grid">
                {stateData.tourism.attractions.map((attraction, index) => (
                  <div key={index} className="attraction-card" style={{ 
                    backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: "white"
                  }}>
                    {attraction}
                  </div>
                ))}
              </div>
            </div>

            <div className="travel-info">
              <div className="best-time">
                <h4 style={{ color: colors.primary }}>Best Time to Visit</h4>
                <div className="info-card" style={{ 
                  backgroundColor: colors.background,
                  border: `2px solid ${colors.accent}`
                }}>
                  {stateData.tourism.bestTime}
                </div>
              </div>

              <div className="climate">
                <h4 style={{ color: colors.primary }}>Climate</h4>
                <div className="info-card" style={{ 
                  backgroundColor: colors.background,
                  border: `2px solid ${colors.accent}`
                }}>
                  {stateData.tourism.climate}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatePage;
