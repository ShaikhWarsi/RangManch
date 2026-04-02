const { MongoClient } = require('mongodb');

// Realistic Indian Craft Products
const products = [
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
      'https://images.unsplash.com/photo-1596462502266-2a9a5a4a2e4a5e5a4f0b7c7?w=400&h=600&fit=crop'
    ],
    tags: ['banarasi', 'silk', 'jamdani', 'wedding', 'traditional']
  },
  {
    _id: '2',
    name: 'Blue Pottery Vase - Jaipur Art',
    description: 'Traditional blue pottery from Jaipur, featuring intricate floral patterns in Persian blue. Handcrafted using age-old techniques.',
    price: 3500,
    category: 'Home Decor',
    artisanId: 'artisan2',
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop'
    ],
    tags: ['pottery', 'blue-pottery', 'jaipur', 'home-decor', 'traditional']
  },
  {
    _id: '3',
    name: 'Madhubani Painting - Peacock Dance',
    description: 'Authentic Madhubani painting depicting peacock dance from Bihar. Natural vegetable dyes on handmade paper.',
    price: 8000,
    category: 'Art',
    artisanId: 'artisan3',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop'
    ],
    tags: ['madhubani', 'painting', 'peacock', 'bihar', 'folk-art']
  },
  {
    _id: '4',
    name: 'Brass Diya Set - Festival Lighting',
    description: 'Traditional brass oil lamps for festivals and ceremonies. Handcrafted with intricate engravings.',
    price: 2500,
    category: 'Festive',
    artisanId: 'artisan4',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop'
    ],
    tags: ['brass', 'diya', 'festival', 'lighting', 'traditional']
  },
  {
    _id: '5',
    name: 'Pattachitra Scroll - Lord Jagannath',
    description: 'Traditional Pattachitra scroll painting from Odisha depicting Lord Jagannath. Natural colors on cloth.',
    price: 12000,
    category: 'Religious',
    artisanId: 'artisan5',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1571013125012-079b8c2dd9?w=800&h=1200&fit=crop'
    ],
    tags: ['pattachitra', 'scroll', 'religious', 'odisha', 'traditional']
  }
];

// Authentic Artisans
const artisans = [
  {
    _id: 'artisan1',
    name: 'Rajesh Kumar',
    craft: 'Banarasi Silk Weaving',
    experience: '35 years',
    story: '8th generation weaver preserving ancient Jamdani techniques. Specializes in Kadhwa weaving.',
    image: 'https://images.unsplash.com/photo-1558809732-57d131a0743e?w=400&h=400&fit=crop&crop=faces',
    rating: 4.9,
    totalProducts: 42,
    approvedProducts: 38,
    contact: {
      email: 'rajesh.kumar@rangmanch.demo',
      phone: '+91 99999 00000',
      preferredTime: '10 AM - 6 PM'
    },
    specialties: ['Kadhwa Weaving', 'Jamdani', 'Tanchoi'],
    languages: ['Hindi', 'Bhojpuri', 'English']
  },
  {
    _id: 'artisan2',
    name: 'Lakshmi Ammal',
    craft: 'Kanjivaram Silk Sarees',
    experience: '28 years',
    story: 'Master craftswoman specializing in temple-inspired motifs using pure mulberry silk.',
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
    story: 'Master of silver inlay on metal, preserving 14th-century Persian craft tradition.',
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
];

async function seedDatabase() {
  console.log('🌱 Seeding MongoDB with realistic Indian craft data...');
  
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch';
    const client = new MongoClient(mongoUri);
    
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data
    await db.collection('products').deleteMany({});
    await db.collection('artisans').deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Insert products
    await db.collection('products').insertMany(products);
    console.log(`📦 Inserted ${products.length} products`);
    
    // Insert artisans
    await db.collection('artisans').insertMany(artisans);
    console.log(`👨 Inserted ${artisans.length} artisans`);
    
    await client.close();
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, products, artisans };
