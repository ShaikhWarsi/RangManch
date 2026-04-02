'use client'

import React, { useState } from "react";
import { Footer } from "../components/Footer";
import IndianNavbarFixed from "../components/IndianNavbarFixed";
import {
  Search,
  MapPin,
  History,
  Star,
  Package,
  Sparkles,
  Clock,
  Send,
  X,
  ArrowRight,
  Languages
} from "lucide-react";

interface Artisan {
  id: number;
  name: string;
  title: string;
  location: string;
  craft: string;
  experience: string;
  story: string;
  image: string;
  rating: number;
  totalProducts: number;
  region: string;
  contact: {
    email: string;
    phone: string;
    preferredTime: string;
  };
  specialties: string[];
  languages: string[];
}

export const ArtisansList: React.FC = () => {
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCraft, setSelectedCraft] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const artisans: Artisan[] = [
    {
      id: 1,
      name: "Monika Das",
      title: "Master Weaver",
      location: "Varanasi, UP",
      craft: "Banarasi Silk",
      experience: "35 years",
      story: "8th generation weaver preserving ancient Jamdani techniques",
      image: "https://static.wixstatic.com/media/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg/v1/fill/w_568,h_482,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg",
      rating: 4.9,
      totalProducts: 42,
      region: "North",
      contact: {
        email: "monika.das@rangmanch.in",
        phone: "+91 99999 00000",
        preferredTime: "10 AM - 6 PM"
      },
      specialties: ["Kadhwa Weaving", "Jamdani", "Tanchoi"],
      languages: ["Hindi", "Bhojpuri", "English"]
    },
    {
      id: 2,
      name: "Lakshmi Ammal",
      title: "Kanjivaram Weaver",
      location: "Kanchipuram, TN",
      craft: "Silk Sarees",
      experience: "28 years",
      story: "Specializes in temple-inspired motifs using pure mulberry silk",
      image: "https://static.fibre2fashion.com//articleresources/images/105/10481/Cover-s_Small.jpg",
      rating: 4.8,
      totalProducts: 38,
      region: "South",
      contact: {
        email: "lakshmi.ammal@rangmanch.in",
        phone: "+91 88888 77777",
        preferredTime: "9 AM - 5 PM"
      },
      specialties: ["Temple Motifs", "Pure Mulberry Silk", "Traditional Dyes"],
      languages: ["Tamil", "Telugu", "English"]
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      title: "Pottery Artist",
      location: "Jaipur, RJ",
      craft: "Blue Pottery",
      experience: "22 years",
      story: "Reviving Persian-influenced ceramic art with natural pigments",
      image: "https://media.assettype.com/homegrown/2024-10-24/qbq15gxz/WhatsApp-Image-2024-10-24-at-5.15.52-PM.jpeg",
      rating: 4.7,
      totalProducts: 56,
      region: "West",
      contact: {
        email: "rajesh.kumar@rangmanch.in",
        phone: "+91 99999 88888",
        preferredTime: "11 AM - 7 PM"
      },
      specialties: ["Blue Pottery", "Terracotta", "Hand-Painted Ceramics"],
      languages: ["Hindi", "Rajasthani", "English"]
    },
    {
      id: 4,
      name: "Ashu Jha",
      title: "Madhubani Artist",
      location: "Madhubani, BR",
      craft: "Madhubani Painting",
      experience: "18 years",
      story: "Preserving the ancient Mithila art form through natural dyes",
      image: "https://www.madhubanipaints.com/cdn/shop/files/InShot_20230404_163140807_1500x.jpg?v=1680606109",
      rating: 4.6,
      totalProducts: 28,
      region: "East",
      contact: {
        email: "ashu.jha@rangmanch.in",
        phone: "+91 77777 99999",
        preferredTime: "10 AM - 4 PM"
      },
      specialties: ["Mithila Art", "Natural Dyes", "Finger Painting"],
      languages: ["Maithili", "Hindi", "English"]
    },
    {
      id: 5,
      name: "Abdul Karim",
      title: "Bidri Artisan",
      location: "Bidar, KA",
      craft: "Bidriware",
      experience: "30 years",
      story: "Master of silver inlay on metal, preserving 14th-century Persian craft",
      image: "https://humansofhyderabad.co.in/wp-content/uploads/2024/12/FB_IMG_1733306913148-970x970.jpg",
      rating: 4.9,
      totalProducts: 34,
      region: "South",
      contact: {
        email: "abdul.karim@rangmanch.in",
        phone: "+91 66666 55555",
        preferredTime: "10 AM - 5 PM"
      },
      specialties: ["Silver Inlay", "Metal Craft", "Traditional Patterns"],
      languages: ["Urdu", "Kannada", "English"]
    },
    {
      id: 6,
      name: "Phoolan Devi",
      title: "Sujani Embroidery Artist",
      location: "Bihar, BR",
      craft: "Sujani Embroidery",
      experience: "25 years",
      story: "Keeping the storytelling tradition alive through intricate embroidery",
      image: "https://media.assettype.com/homegrown/import/book/14721-mfydlsnykl-1660918245.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
      rating: 4.8,
      totalProducts: 45,
      region: "East",
      contact: {
        email: "phoolan.devi@rangmanch.in",
        phone: "+91 55555 44444",
        preferredTime: "9 AM - 3 PM"
      },
      specialties: ["Storytelling Embroidery", "Running Stitch Work", "Cotton Thread Art"],
      languages: ["Maithili", "Hindi"]
    },
    {
      id: 7,
      name: "Gurmeet Singh",
      title: "Phulkari Artist",
      location: "Amritsar, PB",
      craft: "Phulkari Embroidery",
      experience: "20 years",
      story: "Preserving the vibrant Punjabi embroidery tradition",
      image: "https://www.sakoyafoundation.com/assets/image/artist/Phulkari-Lajwanti-Ravinder-1.jpg",
      rating: 4.7,
      totalProducts: 32,
      region: "North",
      contact: {
        email: "gurmeet.singh@rangmanch.in",
        phone: "+91 44444 33333",
        preferredTime: "11 AM - 6 PM"
      },
      specialties: ["Phulkari", "Baghs", "Darning Stitch"],
      languages: ["Punjabi", "Hindi", "English"]
    },
    {
      id: 8,
      name: "Ramesh Sutaar",
      title: "Wood Carver",
      location: "Saharanpur, UP",
      craft: "Wood Carving",
      experience: "32 years",
      story: "Master craftsman specializing in intricate wooden designs",
      image: "https://www.valgardena-groeden.com/images/cms/main/754x435/B-holzschnitzen_helmuth-rier-smg.jpg",
      rating: 4.8,
      totalProducts: 67,
      region: "North",
      contact: {
        email: "ramesh.sutaar@rangmanch.in",
        phone: "+91 33333 22222",
        preferredTime: "9 AM - 5 PM"
      },
      specialties: ["Furniture Making", "Decorative Carving", "Inlay Work"],
      languages: ["Hindi", "Garhwali"]
    },
    {
      id: 9,
      name: "Zarina Begum",
      title: "Chikankari Artist",
      location: "Lucknow, UP",
      craft: "Chikankari Embroidery",
      experience: "23 years",
      story: "Master of the delicate white-on-white embroidery technique",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8P0fbFQ1a445h7f8Rtsd946rzVcIW6GOseg&s",
      rating: 4.9,
      totalProducts: 51,
      region: "North",
      contact: {
        email: "zarina.begum@rangmanch.in",
        phone: "+91 22222 11111",
        preferredTime: "10 AM - 4 PM"
      },
      specialties: ["Chikankari", "Shadow Work", "Mukesh Work"],
      languages: ["Urdu", "Hindi", "English"]
    },
    {
      id: 10,
      name: "Narayan Das",
      title: "Pattachitra Artist",
      location: "Puri, OD",
      craft: "Pattachitra Painting",
      experience: "27 years",
      story: "Preserving the ancient scroll painting tradition of Odisha",
      image: "https://inditales.com/wp-content/uploads/2020/03/pattachitra-artist-raghurajpur.jpg",
      rating: 4.8,
      totalProducts: 29,
      region: "East",
      contact: {
        email: "narayan.das@rangmanch.in",
        phone: "+91 11111 00000",
        preferredTime: "8 AM - 12 PM"
      },
      specialties: ["Pattachitra", "Tala Pattachitra", "Natural Colors"],
      languages: ["Odia", "Hindi", "English"]
    }
  ];

  const crafts = ["all", ...Array.from(new Set(artisans.map(a => a.craft)))];
  const regions = ["all", ...Array.from(new Set(artisans.map(a => a.region)))];

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.craft.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCraft = selectedCraft === "all" || artisan.craft === selectedCraft;
    const matchesRegion = selectedRegion === "all" || artisan.region === selectedRegion;

    return matchesSearch && matchesCraft && matchesRegion;
  });

  const handleContactClick = (artisan: Artisan): void => {
    setSelectedArtisan(artisan);
    setShowContactModal(true);
  };

  const handleSendRequest = (): void => {
    setShowSuccessMessage(true);
    setMessageText("");
    setShowContactModal(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-ivory font-body text-walnut">
      <IndianNavbarFixed />

      {showSuccessMessage && (
        <div className="fixed top-8 right-8 bg-teal text-white px-8 py-4 rounded-2xl shadow-premium z-[2000] flex items-center gap-4 animate-in fade-in slide-in-from-right-4 border border-teal/10">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-heading font-bold">Request Sent</h4>
            <p className="text-xs opacity-80">The artisan will contact you soon.</p>
          </div>
        </div>
      )}

      <div className="relative pt-32 pb-20 bg-walnut text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1589578527966-04d7c15ad48a?w=1600&h=400&fit=crop"
            alt="Craft texture"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative text-center">
          <h1 className="text-6xl md:text-7xl font-heading mb-6 tracking-tight-editorial">
            The Living Archive
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-ivory/70 leading-relaxed font-heading italic">
            Connecting collectors with the master craftspeople preserving India's timeless heritage.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-3">
              <Package className="text-gold" size={18} strokeWidth={1} />
              <span className="text-sm font-ui font-semibold uppercase tracking-widest">{artisans.length}+ Artisans</span>
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-3">
              <Sparkles className="text-gold" size={18} strokeWidth={1} />
              <span className="text-sm font-ui font-semibold uppercase tracking-widest">{crafts.length - 1}+ Traditional Crafts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-walnut/40" size={18} />
            <input
              type="text"
              placeholder="Search by name, craft, or heritage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-ivory/30 border border-sand/40 rounded-full focus:border-gold outline-none transition-colors font-ui"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="flex-1 md:w-48 px-6 py-4 bg-ivory/30 border border-sand/40 rounded-full focus:border-gold outline-none appearance-none font-ui text-sm cursor-pointer"
            >
              <option value="all">All Crafts</option>
              {crafts.filter(c => c !== "all").map(craft => (
                <option key={craft} value={craft}>{craft}</option>
              ))}
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="flex-1 md:w-48 px-6 py-4 bg-ivory/30 border border-sand/40 rounded-full focus:border-gold outline-none appearance-none font-ui text-sm cursor-pointer"
            >
              <option value="all">All Regions</option>
              {regions.filter(r => r !== "all").map(region => (
                <option key={region} value={region}>{region} India</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="group bg-white rounded-3xl overflow-hidden border border-sand/10 hover:border-gold/20 transition-all duration-500 hover:shadow-premium-hover flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-sand/5">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 border border-sand/30 shadow-sm">
                  <Star className="text-gold" size={16} strokeWidth={1} />
                  <span className="font-heading font-bold">{artisan.rating}</span>
                </div>
                <div className="absolute bottom-6 left-6 bg-maroon text-ivory px-4 py-1.5 rounded-full text-[10px] font-ui font-bold uppercase tracking-widest">
                  {artisan.region} India
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-gold mb-1">{artisan.craft}</div>
                  <h3 className="text-3xl font-heading text-walnut mb-2 tracking-tight">{artisan.name}</h3>
                  <div className="flex items-center gap-2 text-walnut/40 text-xs font-ui">
                    <MapPin size={14} strokeWidth={1.5} />
                    {artisan.location}
                  </div>
                </div>

                <p className="text-sm text-walnut/60 leading-relaxed mb-8 italic font-heading line-clamp-2">
                  "{artisan.story}"
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {artisan.specialties.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-sand/10 border border-sand/20 rounded-lg text-[10px] font-ui font-bold text-walnut/50 uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-sand/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-ui font-bold text-walnut/30 uppercase tracking-widest">
                    <History size={14} />
                    {artisan.experience}
                  </div>
                  <button
                    onClick={() => handleContactClick(artisan)}
                    className="flex items-center gap-3 text-sm font-ui font-bold text-maroon hover:text-walnut transition-colors group/btn"
                  >
                    Connect
                    <ArrowRight className="transition-transform group-hover/btn:translate-x-1" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-40 bg-sand/5 rounded-[40px] border-2 border-dashed border-sand/20">
            <Search className="mx-auto text-sand mb-6" size={48} strokeWidth={1} />
            <h3 className="text-2xl font-heading text-walnut mb-2">No Artisans Found</h3>
            <p className="text-walnut/40 font-ui text-sm">Refine your search to discover our master craftspeople.</p>
          </div>
        )}
      </div>

      {showContactModal && selectedArtisan && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-walnut/60 backdrop-blur-sm" onClick={() => setShowContactModal(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden border border-sand/20 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-8 right-8 p-2 text-walnut/20 hover:text-walnut transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-12">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border border-sand/20">
                  <img src={selectedArtisan.image} alt={selectedArtisan.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-gold mb-1">Inquiry for</div>
                  <h3 className="text-3xl font-heading text-walnut">{selectedArtisan.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-4 bg-ivory/30 rounded-2xl border border-sand/10">
                  <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-2 flex items-center gap-2">
                    <Languages size={12} /> Communication
                  </div>
                  <div className="text-xs text-walnut/70">{selectedArtisan.languages.join(", ")}</div>
                </div>
                <div className="p-4 bg-ivory/30 rounded-2xl border border-sand/10">
                  <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-2 flex items-center gap-2">
                    <Clock size={12} /> Preferred Time
                  </div>
                  <div className="text-xs text-walnut/70">{selectedArtisan.contact.preferredTime}</div>
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-3">Your Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  placeholder="Inquire about a custom piece or request a studio visit..."
                  className="w-full px-6 py-4 bg-ivory/30 border border-sand/40 rounded-3xl focus:border-gold outline-none transition-colors text-sm leading-relaxed"
                />
              </div>

              <button
                onClick={handleSendRequest}
                className="w-full py-4 bg-maroon text-ivory rounded-full font-ui font-bold text-sm shadow-premium hover:bg-walnut transition-all flex items-center justify-center gap-3"
              >
                <Send size={18} />
                Send Inquiry
              </button>

              <p className="mt-6 text-center text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/20">
                The artisan typically responds within 48 hours
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ArtisansList;