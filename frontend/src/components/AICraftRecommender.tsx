'use client'

import React, { useState } from 'react'
import { MessageCircle, Sparkles, Bot, Send, Loader, MapPin, Star, Clock, DollarSign } from 'lucide-react'
import GroqService, { CraftRecommendation } from '../services/groqService'

export const AICraftRecommender: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recommendation, setRecommendation] = useState<CraftRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([
    { role: 'assistant', content: '👋 Namaste! I\'m your AI craft advisor. I can help you find perfect authentic Indian crafts and artisans. What brings you here today?' }
  ])

  const handleGetRecommendation = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    
    // Add user query to conversation
    setConversation(prev => [...prev, { role: 'user', content: query }])
    
    try {
      const result = await GroqService.getCraftRecommendation(query)
      setRecommendation(result)
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: result.reasoning }])
      
    } catch (error) {
      console.error('Error getting recommendation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleGetRecommendation()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[1000] bg-gradient-to-r from-maroon to-gold text-ivory p-4 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 group-hover:scale-105 flex items-center gap-3"
        aria-label="Open AI Craft Recommender"
      >
        <Bot size={20} className="animate-pulse" />
        <span className="font-ui font-bold text-sm">Ask AI</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-96 bg-white rounded-2xl shadow-premium border border-sand/20 flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sand/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-maroon to-gold flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading text-walnut text-lg font-bold">AI Craft Advisor</h3>
            <p className="text-xs text-walnut/60 font-ui">Powered by Groq AI</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-walnut/40 hover:text-walnut transition-colors p-2"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-48">
        {conversation.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-maroon text-ivory' 
                : 'bg-sand/10 text-walnut border border-sand/20'
            }`}>
              <p className="text-sm leading-relaxed font-ui whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-sand/10 text-walnut border border-sand/20 p-3 rounded-2xl max-w-[80%]">
              <div className="flex items-center gap-2">
                <Loader size={16} className="animate-spin" />
                <p className="text-sm font-ui">AI is analyzing your request...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendation Result */}
      {recommendation && (
        <div className="border-t border-sand/20 p-4 space-y-4">
          <div className="bg-gradient-to-r from-maroon/5 to-gold/10 p-3 rounded-xl">
            <h4 className="font-heading text-walnut font-bold text-sm mb-2">🎯 Recommended For You</h4>
            <p className="text-xs text-walnut/80 font-ui leading-relaxed">{recommendation.reasoning}</p>
          </div>

          {/* Artisan Recommendation */}
          {recommendation.artisan && (
            <div className="bg-white p-4 rounded-xl border border-sand/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center">
                  <Star size={20} className="text-maroon" />
                </div>
                <div className="flex-1">
                  <h5 className="font-heading text-walnut font-bold">{recommendation.artisan.name}</h5>
                  <div className="flex items-center gap-4 text-xs text-walnut/60 font-ui mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {recommendation.artisan.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {recommendation.artisan.experience} experience
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {recommendation.artisan.rating} rating
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recommendation.artisan.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-gold/20 text-walnut text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Recommendation */}
          {recommendation.product && (
            <div className="bg-white p-4 rounded-xl border border-sand/20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-heading text-walnut font-bold">{recommendation.product.name}</h5>
                  <p className="text-xs text-walnut/60 font-ui mt-1">{recommendation.product.category} • {recommendation.product.craft}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-heading text-maroon font-bold">₹{recommendation.product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <p className="text-sm text-walnut/70 leading-relaxed font-ui mb-3">{recommendation.product.description}</p>
            </div>
          )}

          {/* Alternatives */}
          {recommendation.alternatives && recommendation.alternatives.length > 0 && (
            <div className="bg-sand/5 p-4 rounded-xl">
              <h5 className="font-heading text-walnut font-bold text-sm mb-3">💡 Alternative Options</h5>
              <div className="space-y-2">
                {recommendation.alternatives.map((alt, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <div>
                      <p className="text-sm font-ui text-walnut font-medium">{alt.name}</p>
                      <p className="text-xs text-walnut/60">{alt.reason}</p>
                    </div>
                    <p className="text-sm font-heading text-maroon font-bold">₹{alt.price.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-sand/20 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe what you're looking for (e.g., 'wedding gift under 5000 rupees', 'blue pottery for home decor')"
            className="flex-1 px-4 py-3 border border-sand/20 rounded-full focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm font-ui"
            disabled={isLoading}
          />
          <button
            onClick={handleGetRecommendation}
            disabled={isLoading || !query.trim()}
            className="px-6 py-3 bg-maroon text-ivory rounded-full font-ui font-bold hover:bg-walnut transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Get Recommendation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AICraftRecommender
