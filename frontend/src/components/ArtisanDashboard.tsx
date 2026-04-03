'use client'

import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import IndianNavbarFixed from "./IndianNavbarFixed";
import { Product, ArtisanInfo, Category } from "../types";
import { apiService } from "../services/api";

export const ArtisanDashboard: React.FC = () => {
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [artisanHover, setArtisanHover] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  
  // Form state
  const [productForm, setProductForm] = useState<Product>({
    name: "",
    price: "",
    category: "sarees",
    description: "",
    material: "",
    craftsmanship: "",
    imageUrl: "",
    inStock: true,
    quantity: 1
  });

  // File upload state
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Premium Indian color palette
  const colors = {
    maroon: "#6B1F2B",
    gold: "#C6A75E",
    ivory: "#F5EFE6",
    walnut: "#3E2F26",
    sand: "#D8CFC4",
    teal: "#2D4B4B",
    purple: "#4A2C40",
    green: "#2D6A4F",
    blue: "#3A5A7C"
  };

  // Artisan info (static for demo)
  const artisanInfo: ArtisanInfo = {
    id: 1,
    name: "Monika Das",
    title: "Master Weaver",
    location: "Varanasi, UP",
    craft: "Banarasi Silk",
    experience: "35 years",
    story: "8th generation weaver preserving ancient Jamdani techniques",
    image: "https://static.wixstatic.com/media/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg/v1/fill/w_568,h_482,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg?w=400&h=500&fit=crop",
    rating: "4.9"
  };

  // Categories for dropdown
  const categories: Category[] = [
    { id: "sarees", name: "Sarees & Textiles", icon: "🧣" },
    { id: "jewelry", name: "Traditional Jewelry", icon: "💎" },
    { id: "pottery", name: "Terracotta & Pottery", icon: "🏺" },
    { id: "home", name: "Home Decor", icon: "🏠" },
    { id: "handicrafts", name: "Handicrafts", icon: "🪔" }
  ];

  // Default products for the artisan
  const defaultProducts: Product[] = [
    {
      id: "default1",
      name: "Kadhwa Banarasi Silk Saree",
      price: "12,999",
      category: "sarees",
      description: "Handwoven pure silk saree with intricate Kadhwa technique, featuring traditional floral motifs and real zari work.",
      material: "Pure Katan Silk with Zari",
      craftsmanship: "Kadhwa weaving technique, takes 45-60 days to complete",
      imageUrl: "https://tilfi.com/cdn/shop/products/KOH0003Red_Kashi_PureKatanSilkKashiGhatSaree3_1200x.jpg?v=1689252962",
      inStock: true,
      quantity: 3,
      dateAdded: "2024-01-15",
      salesCount: 12
    },
    {
      id: "default2",
      name: "Jamdani Cotton Saree",
      price: "8,499",
      category: "sarees",
      description: "Lightweight cotton saree with traditional Jamdani weave, perfect for summer wear with intricate border designs.",
      material: "Fine Bengali Cotton",
      craftsmanship: "Jamdani weaving, supplementary weft technique",
      imageUrl: "https://i.pinimg.com/736x/c6/c6/a9/c6c6a97b887cc64b80b51e06ddb571df.jpg",
      inStock: true,
      quantity: 5,
      dateAdded: "2024-02-20",
      salesCount: 8
    },
    {
      id: "default3",
      name: "Tanchoi Brocade Saree",
      price: "15,999",
      category: "sarees",
      description: "Exquisite Tanchoi weave saree with peacock motifs, featuring multi-colored silk threads creating raised patterns.",
      material: "Mulberry Silk",
      craftsmanship: "Tanchoi technique, 3-shuttle method",
      imageUrl: "https://www.unnatisilks.com/cdn/shop/articles/how-to-identify-a-tanchoi-saree.jpg?v=1695207357",
      inStock: true,
      quantity: 2,
      dateAdded: "2024-01-30",
      salesCount: 5
    },
    {
      id: "default4",
      name: "Silk Brocade Border Piece",
      price: "3,499",
      category: "handicrafts",
      description: "Traditional brocade border piece, can be used as saree border or decorative fabric for home decor.",
      material: "Silk with Zari",
      craftsmanship: "Supplementary weft technique",
      imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YC/XE/XZ/47158951/hand-block-printed-cushion-cover.jpeg",
      inStock: true,
      quantity: 8,
      dateAdded: "2024-03-01",
      salesCount: 15
    }
  ];

  // Load products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProductsByArtisan(artisanInfo.id.toString());
        if (response.success && response.data && response.data.length > 0) {
          setArtisanProducts(response.data);
        } else {
          setArtisanProducts(defaultProducts);
        }
      } catch (error) {
        console.warn("Backend not available, using default products");
        // Try to load from localStorage as a secondary fallback
        const savedProducts = localStorage.getItem('artisanProducts');
        if (savedProducts) {
          setArtisanProducts(JSON.parse(savedProducts));
        } else {
          setArtisanProducts(defaultProducts);
        }
      }
    };
    fetchProducts();
  }, []);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://yamxxx1-artisan.hf.space/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.warn("Could not fetch orders from backend");
      }
    };
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('artisanProducts', JSON.stringify(artisanProducts));
  }, [artisanProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    // Validate files
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    setUploadedImages(prev => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImagesForSubmission = async (): Promise<string[]> => {
    const imageUrls: string[] = [];
    
    // Add uploaded images as base64
    for (const file of uploadedImages) {
      const base64 = await convertToBase64(file);
      imageUrls.push(base64);
    }
    
    // Add existing URL if provided
    if (productForm.imageUrl) {
      imageUrls.push(productForm.imageUrl);
    }
    
    return imageUrls;
  };

  const generateAIDescription = async () => {
    if (!productForm.name) {
      alert("Please enter a product name first!");
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Generate a poetic and culturally rich product description for an Indian handicraft named "${productForm.name}" in category "${productForm.category}". Focus on heritage, craftsmanship, and soul.`;
      
      setTimeout(() => {
        const aiDescriptions: Record<string, string> = {
          sarees: `Woven with the threads of time, this ${productForm.name} is a masterpiece of Indian textile heritage. Each motif tells a story of the artisan's soul, carrying the weight of centuries-old traditions into the modern world. Perfect for the woman who wears her culture with pride.`,
          jewelry: `A symphony of gold and gemstones, this ${productForm.name} captures the royal essence of ancient Indian courts. Handcrafted by master jewelers using techniques passed down through generations, it is more than an ornament—it is a legacy.`,
          pottery: `Born from the sacred earth and fired with passion, this terracotta ${productForm.name} brings the warmth of rural India into your home. Its rustic charm and intricate patterns reflect the timeless connection between man and nature.`,
          default: `This handcrafted ${productForm.name} is a testament to India's diverse artistic landscape. Every curve and color has been carefully chosen by the artisan to represent the vibrant spirit of our cultural heritage.`
        };

        const generatedText = aiDescriptions[productForm.category] || aiDescriptions.default;
        
        setProductForm(prev => ({
          ...prev,
          description: generatedText
        }));
        setIsGenerating(false);
      }, 1500);

    } catch (error) {
      console.error("AI Generation Error:", error);
      setIsGenerating(false);
      alert("Failed to generate description. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one image is provided
    if (uploadedImages.length === 0 && !productForm.imageUrl) {
      alert("Please upload at least one image or provide an image URL");
      return;
    }
    
    try {
      const imageUrls = await processImagesForSubmission();
      
      if (editingProduct) {
        const updatedProductData = {
          name: productForm.name,
          price: parseFloat(productForm.price.replace(/,/g, '')),
          category: productForm.category,
          description: productForm.description,
          material: productForm.material,
          craftsmanship: productForm.craftsmanship,
          imageUrl: imageUrls[0] || productForm.imageUrl, // Use first image as primary
          images: imageUrls, // Store all images
          inStock: productForm.inStock,
          quantity: productForm.quantity,
        };
        const response = await apiService.updateProduct(editingProduct._id || editingProduct.id!, updatedProductData);
        if (response.success) {
          setArtisanProducts(prev =>
            prev.map(p => (p._id || p.id) === (editingProduct._id || editingProduct.id) ? { ...editingProduct, ...updatedProductData, _id: editingProduct._id, id: editingProduct.id } : p)
          );
        }
      } else {
        const productToAdd = {
          ...productForm,
          price: parseFloat(productForm.price.replace(/,/g, '')),
          artisanId: artisanInfo.id.toString(),
          dateAdded: new Date().toISOString(),
          imageUrl: imageUrls[0] || productForm.imageUrl, // Use first image as primary
          images: imageUrls // Store all images
        };

        const response = await apiService.createProduct(productToAdd);
        if (response.success) {
          setArtisanProducts(prev => [response.data, ...prev]);
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
    
    setProductForm({
      name: "",
      price: "",
      category: "sarees",
      description: "",
      material: "",
      craftsmanship: "",
      imageUrl: "",
      inStock: true,
      quantity: 1
    });
    setUploadedImages([]);
    setImagePreview([]);
    setShowUploadForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowUploadForm(true);
  };

  const handleDelete = async (productId: string | undefined) => {
    if (!productId) return;
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await apiService.deleteProduct(productId);
        if (response.success) {
          setArtisanProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        setArtisanProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
      }
    }
  };

  const handleClearSession = () => {
    if (typeof window !== 'undefined' && window.confirm('This will reset to default products. Continue?')) {
      sessionStorage.removeItem('artisanProducts');
      setArtisanProducts(defaultProducts);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    }).format(numPrice);
  };

  return (
    <div className="artisan-dashboard" style={{
      background: "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 30%, #FFF3E0 100%)",
      minHeight: "100vh"
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${colors.maroon} 0%, ${colors.purple} 100%)`,
        padding: "20px 40px",
        borderBottom: `5px solid ${colors.gold}`,
        position: "relative",
        overflow: "hidden"
      }}>
        <IndianNavbarFixed />
      </div>

      <div style={{
        background: `linear-gradient(rgba(128, 0, 0, 0.9), rgba(128, 0, 0, 0.95)), url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&h=300&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "60px 40px",
        borderBottom: `5px solid ${colors.gold}`
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap"
        }}>
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundImage: `url(${artisanInfo.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: `5px solid ${colors.gold}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}></div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: "3rem",
              fontFamily: "'Playfair Display', serif",
              marginBottom: "10px",
              letterSpacing: "-0.02em"
            }}>
              Rangmanch Workshop: {artisanInfo.name}
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: colors.gold,
              marginBottom: "20px",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic"
            }}>
              {artisanInfo.title} | {artisanInfo.location} | {artisanInfo.experience} Experience
            </p>
            <p style={{
              maxWidth: "600px",
              opacity: 0.9,
              lineHeight: "1.8",
              fontFamily: "Inter, sans-serif"
            }}>{artisanInfo.story}</p>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "2rem", color: colors.gold }}>{artisanProducts.length}</div>
            <div>Products Listed</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "5px" }}>
              {artisanProducts.reduce((sum, p) => sum + (p.salesCount || 0), 0)} Total Sales
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: "30px 40px",
        borderBottom: `2px solid ${colors.gold}40`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div>
          <button
            onClick={() => {
              setShowUploadForm(!showUploadForm);
              setEditingProduct(null);
              setProductForm({
                name: "",
                price: "",
                category: "sarees",
                description: "",
                material: "",
                craftsmanship: "",
                imageUrl: "",
                inStock: true,
                quantity: 1
              });
              setUploadedImages([]);
              setImagePreview([]);
            }}
            style={{
              padding: "15px 40px",
              background: colors.green,
              border: "none",
              borderRadius: "50px",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 5px 15px rgba(19, 136, 8, 0.3)"
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>+</span>
            {showUploadForm ? "Close Form" : "Add New Product"}
          </button>
        </div>
        <div>
          <button
            onClick={handleClearSession}
            style={{
              padding: "10px 20px",
              background: "transparent",
              border: `2px solid ${colors.maroon}`,
              borderRadius: "50px",
              color: colors.maroon,
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Reset to Default
          </button>
          <span style={{
            background: colors.gold + "20",
            padding: "8px 15px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            color: colors.maroon
          }}>
            Session Storage • {artisanProducts.length} products
          </span>
        </div>
      </div>

      {showUploadForm && (
        <div style={{
          padding: "40px",
          background: "white",
          margin: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: `2px solid ${colors.gold}`
        }}>
          <h2 style={{
            fontSize: "2rem",
            color: colors.maroon,
            marginBottom: "30px",
            fontFamily: "'Noto Serif', serif"
          }}>
            {editingProduct ? 'Edit Product' : 'Upload New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px"
          }}>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem"
                }}
                placeholder="e.g., Banarasi Silk Saree with Zari Work"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Price (₹) *
              </label>
              <input
                type="text"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem"
                }}
                placeholder="e.g., 12,999"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Category *
              </label>
              <select
                name="category"
                value={productForm.category}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem",
                  background: "white"
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ fontWeight: "600", color: colors.maroon }}>
                  Description *
                </label>
                <button 
                  type="button" 
                  onClick={generateAIDescription}
                  disabled={isGenerating}
                  style={{
                    background: colors.purple,
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    padding: "5px 15px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    opacity: isGenerating ? 0.7 : 1
                  }}
                >
                  {isGenerating ? "🤖 Generating..." : "✨ Generate AI Description"}
                </button>
              </div>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontFamily: "inherit"
                }}
                placeholder="Describe your product, its cultural significance, and unique features..."
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Material Used
              </label>
              <input
                type="text"
                name="material"
                value={productForm.material}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem"
                }}
                placeholder="e.g., Pure Katan Silk, Zari"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Craftsmanship Details
              </label>
              <input
                type="text"
                name="craftsmanship"
                value={productForm.craftsmanship}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem"
                }}
                placeholder="e.g., Kadhwa technique, 45 days to weave"
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Product Images *
              </label>
              
              {/* File Upload Area */}
              <div 
                style={{
                  border: `2px dashed ${isDragging ? colors.maroon : colors.gold}60`,
                  borderRadius: "10px",
                  padding: "30px",
                  textAlign: "center",
                  backgroundColor: isDragging ? colors.maroon + "10" : colors.gold + "10",
                  marginBottom: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isDragging ? "scale(1.02)" : "scale(1)"
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
                    {isDragging ? "📥" : "📸"}
                  </div>
                  <div style={{ fontSize: "1.1rem", color: colors.maroon, fontWeight: "600", marginBottom: "5px" }}>
                    {isDragging ? "Drop images here" : "Click to Upload Images"}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: colors.walnut, opacity: 0.8 }}>
                    or drag and drop • PNG, JPG, GIF up to 5MB each
                  </div>
                </label>
              </div>

              {/* Image Preview Grid */}
              {imagePreview.length > 0 && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "15px",
                  marginBottom: "20px"
                }}>
                  {imagePreview.map((preview, index) => (
                    <div key={index} style={{
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: `2px solid ${colors.gold}40`,
                      backgroundColor: "white"
                    }}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeUploadedImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: colors.maroon,
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Fallback URL Input */}
              <div style={{
                padding: "15px",
                backgroundColor: colors.sand + "20",
                borderRadius: "8px",
                border: `1px solid ${colors.sand}40`
              }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: colors.walnut }}>
                  Or provide image URL (optional):
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={productForm.imageUrl}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: `1px solid ${colors.sand}60`,
                    borderRadius: "6px",
                    fontSize: "0.9rem"
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              {uploadedImages.length === 0 && !productForm.imageUrl && (
                <p style={{ 
                  color: colors.maroon, 
                  fontSize: "0.8rem", 
                  marginTop: "5px",
                  opacity: 0.8 
                }}>
                  Please upload at least one image or provide an image URL
                </p>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: colors.maroon }}>
                Quantity Available *
              </label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleInputChange}
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "15px",
                  border: `2px solid ${colors.gold}40`,
                  borderRadius: "10px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <div style={{
              gridColumn: "span 2",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <input
                type="checkbox"
                name="inStock"
                checked={productForm.inStock}
                onChange={handleInputChange}
                id="inStock"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer"
                }}
              />
              <label htmlFor="inStock" style={{ fontWeight: "600", color: colors.maroon, cursor: "pointer" }}>
                Product is in stock and available for sale
              </label>
            </div>

            <div style={{
              gridColumn: "span 2",
              display: "flex",
              gap: "20px",
              justifyContent: "flex-end",
              marginTop: "20px"
            }}>
              <button
                type="button"
                onClick={() => {
                  setShowUploadForm(false);
                  setEditingProduct(null);
                }}
                style={{
                  padding: "15px 40px",
                  background: "transparent",
                  border: `2px solid ${colors.maroon}`,
                  borderRadius: "50px",
                  color: colors.maroon,
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "15px 50px",
                  background: colors.green,
                  border: "none",
                  borderRadius: "50px",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ padding: "40px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: "15px 30px",
                background: activeTab === 'products' ? colors.maroon : 'transparent',
                border: `2px solid ${colors.maroon}`,
                borderRadius: "50px",
                color: activeTab === 'products' ? 'white' : colors.maroon,
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              📦 Products ({artisanProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: "15px 30px",
                background: activeTab === 'orders' ? colors.green : 'transparent',
                border: `2px solid ${colors.green}`,
                borderRadius: "50px",
                color: activeTab === 'orders' ? 'white' : colors.green,
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              🛒 Orders ({orders.length})
            </button>
          </div>
          {activeTab === 'products' && (
            <div style={{
              display: "flex",
              gap: "10px",
              color: colors.teal
            }}>
              <span>💰 Total Value: {
                formatPrice(artisanProducts.reduce((sum, p) => {
                  const priceValue = typeof p.price === 'string' ? parseFloat(p.price.replace(/,/g, '')) : p.price;
                  return sum + (priceValue * (p.quantity || 1));
                }, 0))
              }</span>
            </div>
          )}
        </div>

        {activeTab === 'products' ? (
          artisanProducts.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "30px"
            }}>
            {artisanProducts.map((product) => (
              <div
                key={product._id || product.id}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  border: `2px solid ${colors.purple}30`,
                  position: "relative",
                  transition: "all 0.3s ease",
                  transform: artisanHover === (product._id || product.id) ? "translateY(-5px)" : "none"
                }}
                onMouseEnter={() => setArtisanHover((product._id || product.id) as string)}
                onMouseLeave={() => setArtisanHover(null)}
              >
                {(() => {
                  const primaryImage = product.images?.[0] || product.imageUrl;
                  return primaryImage && (
                    <div style={{
                      height: "200px",
                      backgroundImage: `url(${primaryImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative"
                    }}>
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: product.inStock ? colors.green : "#999",
                      color: "white",
                      padding: "5px 15px",
                      borderRadius: "20px",
                      fontSize: "0.8rem"
                    }}>
                      {product.inStock ? `In Stock (${product.quantity})` : 'Out of Stock'}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "15px",
                      background: colors.gold,
                      color: colors.maroon,
                      padding: "5px 15px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {product.salesCount || 0} sold
                    </div>
                    {/* Show multiple images indicator */}
                    {product.images && product.images.length > 1 && (
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        background: colors.maroon,
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "600"
                      }}>
                        {product.images.length} photos
                      </div>
                    )}
                  </div>
                  );
                })()}
              
              <div style={{ padding: "20px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "10px"
                }}>
                  <h3 style={{
                    fontSize: "1.2rem",
                    color: colors.maroon,
                    fontFamily: "'Noto Serif', serif",
                    marginBottom: "5px"
                  }}>{product.name}</h3>
                  <span style={{
                    background: colors.gold + "20",
                    padding: "3px 10px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    color: colors.maroon
                  }}>
                    {categories.find(c => c.id === product.category)?.icon} {product.category}
                  </span>
                </div>

                <p style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  marginBottom: "15px",
                  lineHeight: "1.5"
                }}>{product.description}</p>

                {product.material && (
                  <div style={{
                    fontSize: "0.9rem",
                    color: colors.teal,
                    marginBottom: "5px"
                  }}>
                    <strong>Material:</strong> {product.material}
                  </div>
                )}

                {product.craftsmanship && (
                  <div style={{
                    fontSize: "0.9rem",
                    color: colors.teal,
                    marginBottom: "15px"
                  }}>
                    <strong>Craftsmanship:</strong> {product.craftsmanship}
                  </div>
                )}

                {product.reviews && product.reviews.length > 0 && (
                  <div style={{
                    marginTop: "15px",
                    paddingTop: "15px",
                    borderTop: `1px solid ${colors.gold}40`
                  }}>
                    <h4 style={{
                      fontSize: "1rem",
                      color: colors.maroon,
                      marginBottom: "10px"
                    }}>Customer Reviews ({product.reviews.length})</h4>
                    {product.reviews.map((review, index) => (
                      <div key={index} style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: `1px dashed ${colors.sand}` }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                          <span style={{ color: colors.gold, marginRight: "5px" }}>
                            {'⭐'.repeat(review.rating)}
                          </span>
                          <span style={{ fontSize: "0.85rem", color: colors.teal }}>
                            by {review.user} on {review.date ? new Date(review.date).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.9rem", color: "#555" }}>"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: `1px solid ${colors.gold}40`
                }}>
                  <div>
                    <div style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: colors.green
                    }}>{formatPrice(product.price)}</div>
                    <div style={{
                      fontSize: "0.8rem",
                      color: "#999"
                    }}>Added: {product.dateAdded?.split('T')[0]}</div>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    gap: "10px"
                  }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: "8px 20px",
                        background: colors.blue,
                        border: "none",
                        borderRadius: "30px",
                        color: "white",
                        fontSize: "0.9rem",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id || product.id)}
                      style={{
                        padding: "8px 20px",
                        background: colors.maroon,
                        border: "none",
                        borderRadius: "30px",
                        color: "white",
                        fontSize: "0.9rem",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "80px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "20px",
              border: `2px dashed ${colors.gold}`
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🪔</div>
              <h3 style={{ fontSize: "1.5rem", color: colors.maroon, marginBottom: "10px" }}>
                No Products Yet
              </h3>
              <p style={{ color: colors.teal }}>
                Click the "Add New Product" button to start listing your creations.
              </p>
            </div>
          )
        ) : (
          <div>
            {orders.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "80px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "20px",
                border: `2px dashed ${colors.gold}`
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
                <h3 style={{ fontSize: "1.5rem", color: colors.maroon, marginBottom: "10px" }}>
                  No Orders Yet
                </h3>
                <p style={{ color: colors.teal }}>
                  Orders from customers will appear here when they place them.
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                gap: "20px"
              }}>
                {orders.map((order: any) => (
                  <div
                    key={order.id || order.order_id}
                    style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "25px",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                      border: `2px solid ${colors.gold}40`,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px"
                    }}>
                      <div>
                        <span style={{
                          fontSize: "0.8rem",
                          color: colors.teal,
                          fontWeight: "600"
                        }}>Order ID</span>
                        <div style={{
                          fontFamily: "monospace",
                          fontSize: "0.9rem",
                          color: colors.maroon
                        }}>#{order.order_id?.slice(-8).toUpperCase() || order.id?.slice(-8).toUpperCase()}</div>
                      </div>
                      <div style={{
                        padding: "8px 15px",
                        borderRadius: "20px",
                        background: order.status === 'cod_pending' ? colors.gold + '30' : colors.green + '30',
                        color: order.status === 'cod_pending' ? colors.maroon : colors.green,
                        fontSize: "0.85rem",
                        fontWeight: "600"
                      }}>
                        {order.status === 'cod_pending' ? '💵 COD - Pending' : order.status}
                      </div>
                    </div>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      marginBottom: "15px"
                    }}>
                      <div>
                        <span style={{ fontSize: "0.75rem", color: colors.teal, textTransform: "uppercase" }}>Customer</span>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: colors.walnut }}>
                          {order.customer_name || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontSize: "0.75rem", color: colors.teal, textTransform: "uppercase" }}>Contact</span>
                        <div style={{ fontSize: "1rem", color: colors.walnut }}>
                          {order.customer_contact || order.customer_email || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: colors.ivory,
                      padding: "15px",
                      borderRadius: "10px",
                      marginBottom: "15px"
                    }}>
                      <span style={{ fontSize: "0.75rem", color: colors.teal, textTransform: "uppercase" }}>Products</span>
                      <div style={{ marginTop: "8px" }}>
                        {order.products && Array.isArray(order.products) ? (
                          order.products.slice(0, 3).map((product: any, idx: number) => (
                            <div key={idx} style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "0.9rem",
                              marginBottom: "5px"
                            }}>
                              <span style={{ color: colors.walnut }}>
                                {product.name || product.title || 'Product'} x{product.quantity || 1}
                              </span>
                              <span style={{ color: colors.green, fontWeight: "600" }}>
                                ₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div style={{ color: colors.walnut, fontSize: "0.9rem" }}>
                            {typeof order.products === 'string' ? order.products : 'Products data unavailable'}
                          </div>
                        )}
                        {order.products && Array.isArray(order.products) && order.products.length > 3 && (
                          <div style={{ fontSize: "0.8rem", color: colors.teal, marginTop: "5px" }}>
                            +{order.products.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "15px",
                      borderTop: `1px solid ${colors.gold}30`
                    }}>
                      <div>
                        <span style={{ fontSize: "0.75rem", color: colors.teal, textTransform: "uppercase" }}>Total Amount</span>
                        <div style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: colors.green
                        }}>
                          ₹{typeof order.amount === 'number' ? order.amount.toLocaleString('en-IN') : order.amount}
                        </div>
                      </div>
                      <div style={{
                        padding: "8px 15px",
                        borderRadius: "20px",
                        background: order.payment_method === 'cod' ? colors.gold + '20' : colors.blue + '20',
                        fontSize: "0.8rem"
                      }}>
                        Payment: {order.payment_method?.toUpperCase() || 'N/A'}
                      </div>
                    </div>

                    {order.created_at && (
                      <div style={{
                        marginTop: "10px",
                        fontSize: "0.8rem",
                        color: colors.teal
                      }}>
                        📅 {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.teal} 100%)`,
        color: "white",
        padding: "40px",
        marginTop: "40px"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "30px",
          textAlign: "center"
        }}>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📦</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Total Products</div>
            <div style={{ fontSize: "2rem", color: colors.gold }}>{artisanProducts.length}</div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>💰</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Inventory Value</div>
            <div style={{ fontSize: "2rem", color: colors.gold }}>
              {formatPrice(artisanProducts.reduce((sum, p) => {
                const priceValue = typeof p.price === 'string' ? parseFloat(p.price.replace(/,/g, '')) : p.price;
                return sum + (priceValue * (p.quantity || 1));
              }, 0))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>⭐</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Artisan Rating</div>
            <div style={{ fontSize: "2rem", color: colors.gold }}>{artisanInfo.rating}</div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🪔</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Years of Craft</div>
            <div style={{ fontSize: "2rem", color: colors.gold }}>{artisanInfo.experience}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtisanDashboard;
