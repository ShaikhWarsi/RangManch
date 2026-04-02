const realisticProducts = [
  {
    _id: '1',
    name: 'Heritage Silk Saree - Banarasi Jamdani',
    description: 'Handwoven Banarasi silk saree with traditional Jamdani patterns. Crafted by master weavers using pure mulberry silk and gold zari work.',
    price: 15000,
    category: 'Textiles',
    artisanId: 'artisan1',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=400&h=400&fit=crop'
    ],
    tags: ['banarasi', 'silk', 'jamdani', 'wedding', 'traditional']
  },
  {
    _id: '2',
    name: 'Blue Pottery Vase - Jaipur Art',
    description: 'Traditional blue pottery from Jaipur, featuring intricate floral patterns in Persian blue. Handcrafted using age-old techniques passed down through generations.',
    price: 3500,
    category: 'Home Decor',
    artisanId: 'artisan2',
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['pottery', 'blue-pottery', 'jaipur', 'home-decor', 'traditional']
  },
  {
    _id: '3',
    name: 'Madhubani Painting - Peacock Dance',
    description: 'Authentic Madhubani painting depicting peacock dance from Bihar. Natural vegetable dyes on handmade paper with intricate details.',
    price: 8000,
    category: 'Art',
    artisanId: 'artisan3',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['madhubani', 'painting', 'peacock', 'bihar', 'folk-art']
  },
  {
    _id: '4',
    name: 'Brass Diya Set - Festival Lighting',
    description: 'Traditional brass oil lamps for festivals and ceremonies. Handcrafted by master metalworkers with intricate engravings.',
    price: 2500,
    category: 'Festive',
    artisanId: 'artisan4',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['brass', 'diya', 'festival', 'lighting', 'traditional']
  },
  {
    _id: '5',
    name: 'Pattachitra Scroll - Lord Jagannath',
    description: 'Traditional Pattachitra scroll painting from Odisha depicting Lord Jagannath. Natural colors on cloth with gold leaf work.',
    price: 12000,
    category: 'Religious',
    artisanId: 'artisan5',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['pattachitra', 'scroll', 'religious', 'odisha', 'traditional']
  },
  {
    _id: '6',
    name: 'Wood Carved Elephant - Jaipur Craft',
    description: 'Hand-carved wooden elephant from Jaipur showing traditional Indian craftsmanship. Made from sheesham wood with detailed carving.',
    price: 6000,
    category: 'Decorative',
    artisanId: 'artisan6',
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1544716035-9e6a67b5d99?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1544716035-9e6a67b5d99?w=400&h=600&fit=crop'
    ],
    tags: ['wood-carving', 'elephant', 'jaipur', 'decorative', 'traditional']
  },
  {
    _id: '7',
    name: 'Kashmir Shawl - Pashmina Art',
    description: 'Luxurious pashmina shawl from Kashmir featuring traditional embroidery. Pure pashmina wool with intricate floral patterns.',
    price: 18000,
    category: 'Textiles',
    artisanId: 'artisan7',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=400&h=600&fit=crop'
    ],
    tags: ['pashmina', 'shawl', 'kashmir', 'luxury', 'traditional']
  },
  {
    _id: '8',
    name: 'Bidriware Box - Hyderabad Craft',
    description: 'Traditional Bidriware box from Hyderabad with silver inlay work. Black metal with silver patterns in Persian design.',
    price: 4500,
    category: 'Luxury',
    artisanId: 'artisan8',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['bidriware', 'silver-inlay', 'hyderabad', 'luxury', 'traditional']
  },
  {
    _id: '9',
    name: 'Chikankari Kurti - Lucknow Embroidery',
    description: 'Elegant Chikankari kurti from Lucknow with delicate white-on-white embroidery. Pure cotton with hand-embroidered patterns.',
    price: 7500,
    category: 'Apparel',
    artisanId: 'artisan9',
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['chikankari', 'kurti', 'lucknow', 'embroidery', 'traditional']
  },
  {
    _id: '10',
    name: 'Tanjore Painting Doll - Tamil Art',
    description: 'Traditional Tanjore painting doll from Tamil Nadu. Hand-painted with natural colors and adorned with jewelry.',
    price: 3200,
    category: 'Collectibles',
    artisanId: 'artisan10',
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=600&fit=crop'
    ],
    tags: ['tanjore', 'painting', 'doll', 'tamil', 'collectible']
  }
]

const realisticArtisans = [
  {
    _id: 'artisan1',
    name: 'Rajesh Kumar',
    craft: 'Banarasi Silk Weaving',
    experience: '35 years',
    story: '8th generation weaver preserving ancient Jamdani techniques. Specializes in Kadhwa weaving and traditional motifs.',
    image: 'https://images.unsplash.com/photo-1558809732-57d131a0743e?w=400&h=400&fit=crop&crop=faces',
    rating: 4.9,
    totalProducts: 42,
    approvedProducts: 38,
    contact: {
      email: 'rajesh.kumar@rangmanch.demo',
      phone: '+91 99999 00000',
      preferredTime: '10 AM - 6 PM'
    },
    specialties: ['Kadhwa Weaving', 'Jamdani', 'Tanchoi', 'Pure Mulberry Silk'],
    languages: ['Hindi', 'Bhojpuri', 'English']
  },
  {
    _id: 'artisan2',
    name: 'Lakshmi Ammal',
    craft: 'Kanjivaram Silk Sarees',
    experience: '28 years',
    story: 'Master craftsman specializing in temple-inspired motifs using pure mulberry silk with traditional weaving techniques.',
    image: 'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=400&h=400&fit=crop&crop=faces',
    rating: 4.8,
    totalProducts: 38,
    approvedProducts: 35,
    contact: {
      email: 'lakshmi.ammal@rangmanch.demo',
      phone: '+91 88888 77777',
      preferredTime: '9 AM - 5 PM'
    },
    specialties: ['Temple Motifs', 'Pure Mulberry Silk', 'Traditional Dyes'],
    languages: ['Tamil', 'Telugu', 'English']
  },
  {
    _id: 'artisan3',
    name: 'Abdul Karim',
    craft: 'Bidriware Metal Craft',
    experience: '30 years',
    story: 'Master of silver inlay on metal, preserving 14th-century Persian craft tradition with authentic techniques.',
    image: 'https://images.unsplash.com/photo-1544716035-9e6a67b5d99?w=400&h=400&fit=crop&crop=faces',
    rating: 4.9,
    totalProducts: 34,
    approvedProducts: 32,
    contact: {
      email: 'abdul.karim@rangmanch.demo',
      phone: '+91 66666 55555',
      preferredTime: '10 AM - 5 PM'
    },
    specialties: ['Silver Inlay', 'Metal Craft', 'Traditional Patterns'],
    languages: ['Urdu', 'Kannada', 'English']
  }
]

console.log('🌱 Seeding database with realistic Indian craft products and artisans...')
console.log(`📦 Adding ${realisticProducts.length} products...`)
console.log(`👨 Adding ${realisticArtisans.length} artisans...`)

// Export for use in API service
module.exports = {
  products: realisticProducts,
  artisans: realisticArtisans
}
