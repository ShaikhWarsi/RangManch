export interface CraftRecommendation {
  artisan: {
    name: string;
    experience: string;
    rating: number;
    location: string;
    specialties: string[];
  };
  product: {
    name: string;
    price: number;
    description: string;
    category: string;
    craft: string;
  };
  reasoning: string;
  alternatives: Array<{
    name: string;
    price: number;
    reason: string;
  }>;
}

class GroqService {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || 'demo-key';
  }

  async getCraftRecommendation(userQuery: string): Promise<CraftRecommendation> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are an expert Indian craft advisor for RangManch platform. You help users find perfect authentic Indian crafts and artisans. 

Context: RangManch connects master artisans with customers seeking authentic Indian crafts. We have:
- Banarasi silk weavers (Rajesh Kumar, 35 years experience)
- Kanjivaram silk specialists (Lakshmi Ammal, 28 years experience) 
- Bidriware metal craftsmen (Abdul Karim, 30 years experience)
- Blue pottery artisans (various regional specialists)
- Madhubani painters (traditional folk art)

Price ranges: Budget (₹500-2000), Mid-range (₹2000-8000), Premium (₹8000-25000), Luxury (₹25000+)

Always provide:
1. Specific artisan recommendations with real names
2. Exact product suggestions with prices
3. Cultural significance and craft details
4. Alternative options within budget
5. Contact information when relevant

Be helpful, culturally aware, and focus on preserving traditional crafts.

RESPOND IN JSON FORMAT:
{
  "artisan": {
    "name": "Artisan Name",
    "experience": "X years",
    "rating": 4.8,
    "location": "City, State",
    "specialties": ["craft1", "craft2"]
  },
  "product": {
    "name": "Product Name",
    "price": 3500,
    "description": "Product description",
    "category": "category",
    "craft": "craft_type"
  },
  "reasoning": "Detailed explanation of why this recommendation",
  "alternatives": [
    {
      "name": "Alternative 1",
      "price": 2800,
      "reason": "Why this is a good alternative"
    }
  ]
}`
            },
            {
              role: 'user',
              content: userQuery
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: 'json_object' }
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || '{}';

      try {
        const structuredResponse = JSON.parse(aiResponse);
        return structuredResponse;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        return this.getFallbackRecommendation(userQuery);
      }
      
    } catch (error) {
      console.error('Groq API Error:', error);
      return this.getFallbackRecommendation(userQuery);
    }
  }

  private parseAIResponse(response: string): CraftRecommendation {
    // Parse the AI response into structured format
    const lines = response.split('\n').filter(line => line.trim());
    
    let artisan = null;
    let product = { name: 'Handcrafted Item', price: 5000, description: 'Traditional craft item', category: 'Traditional', craft: 'Artisan Craft' };
    let reasoning = '';
    const alternatives: { name: string; price: number; reason: string }[] = [];

    for (const line of lines) {
      if (line.includes('Artisan:') || line.includes('Recommend:')) {
        reasoning += line + '\n';
      } else if (line.includes('₹') || line.includes('rupees')) {
        if (!product) {
          product = { name: 'Handcrafted Item', price: 5000, description: line, category: 'Traditional', craft: 'Artisan Craft' };
        }
      } else if (line.includes('Alternative:') || line.includes('Option:')) {
        alternatives.push({ name: line.split(':')[1]?.trim() || 'Alternative', price: 4000, reason: 'Good alternative option' });
      }
    }

    // Default artisan data if not found in response
    if (!artisan) {
      artisan = {
        name: 'Rajesh Kumar',
        experience: '35 years',
        rating: 4.9,
        location: 'Varanasi, Uttar Pradesh',
        specialties: ['Banarasi Weaving', 'Kadhwa Work', 'Gold Zari']
      };
    }

    return {
      artisan,
      product,
      reasoning: reasoning || 'Based on your requirements, I recommend this traditional craft.',
      alternatives
    };
  }

  private getFallbackRecommendation(userQuery: string): CraftRecommendation {
    // Fallback recommendations when API fails
    const query = userQuery.toLowerCase();
    
    if (query.includes('wedding') || query.includes('marriage')) {
      return {
        artisan: {
          name: 'Rajesh Kumar',
          experience: '35 years',
          rating: 4.9,
          location: 'Varanasi, Uttar Pradesh',
          specialties: ['Banarasi Weaving', 'Kadhwa Work', 'Gold Zari']
        },
        product: {
          name: 'Banarasi Silk Saree - Wedding Collection',
          price: 12000,
          description: 'Handwoven Banarasi silk saree with traditional gold zari work, perfect for wedding ceremonies',
          category: 'Textiles',
          craft: 'Banarasi Weaving'
        },
        reasoning: 'For a wedding gift under ₹5000, I recommend exploring our collection of authentic Banarasi silk pieces. While premium wedding sarees start around ₹12000, we have beautiful options in your range including smaller silk scarves and accessories.',
        alternatives: [
          { name: 'Banarasi Silk Scarf', price: 3500, reason: 'Elegant silk scarf with traditional motifs' },
          { name: 'Handwoven Cotton Saree', price: 4500, reason: 'Lightweight cotton with Banarasi-inspired patterns' }
        ]
      };
    }

    if (query.includes('pottery') || query.includes('vase') || query.includes('decor')) {
      return {
        artisan: {
          name: 'Abdul Karim',
          experience: '30 years',
          rating: 4.8,
          location: 'Jaipur, Rajasthan',
          specialties: ['Blue Pottery', 'Glazed Ceramics', 'Traditional Firing']
        },
        product: {
          name: 'Jaipur Blue Pottery Vase',
          price: 2500,
          description: 'Traditional blue pottery vase with intricate floral patterns, handcrafted using age-old techniques',
          category: 'Home Decor',
          craft: 'Blue Pottery'
        },
        reasoning: 'This blue pottery vase from Jaipur represents the finest Rajasthani ceramic traditions. Perfect for home decoration with cultural significance.',
        alternatives: [
          { name: 'Blue Pottery Bowl Set', price: 1800, reason: 'Set of 3 handcrafted bowls for daily use' },
          { name: 'Terracotta Decorative Items', price: 1200, reason: 'Traditional terracotta with natural earth tones' }
        ]
      };
    }

    if (query.includes('painting') || query.includes('art') || query.includes('madhubani')) {
      return {
        artisan: {
          name: 'Various Regional Artists',
          experience: '25+ years',
          rating: 4.7,
          location: 'Bihar, Odisha, Rajasthan',
          specialties: ['Madhubani', 'Pattachitra', 'Miniature Painting']
        },
        product: {
          name: 'Traditional Indian Folk Art',
          price: 3000,
          description: 'Authentic Indian folk painting using natural vegetable dyes on handmade paper',
          category: 'Art',
          craft: 'Traditional Painting'
        },
        reasoning: 'Indian folk paintings represent our rich cultural heritage. Each piece tells a story of tradition and craftsmanship passed down through generations.',
        alternatives: [
          { name: 'Warli Art Print', price: 2000, reason: 'Maharashtrian tribal art form' },
          { name: 'Pattachitra Bookmark', price: 800, reason: 'Traditional Odisha art for daily use' }
        ]
      };
    }

    // Default recommendation
    return {
      artisan: {
        name: 'Master Artisans Network',
        experience: '30+ years',
        rating: 4.8,
        location: 'Various Regions Across India',
        specialties: ['Multiple Traditional Crafts']
      },
      product: {
        name: 'Handcrafted Indian Treasure',
        price: 4000,
        description: 'Authentic Indian craft piece representing centuries of cultural heritage and traditional craftsmanship',
        category: 'Heritage',
        craft: 'Traditional Indian Craft'
      },
      reasoning: 'Based on your interest in Indian crafts, I recommend exploring our curated collection of authentic pieces from master artisans across India.',
      alternatives: [
        { name: 'Craft Workshop Experience', price: 2500, reason: 'Learn traditional crafts directly from artisans' },
        { name: 'Cultural Heritage Tour', price: 3000, reason: 'Virtual tour of artisan communities' }
        ]
    };
  }
}

export default GroqService;
