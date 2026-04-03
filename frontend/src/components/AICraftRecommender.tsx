'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Sparkles, Bot, Send, Loader, MapPin, Star, Clock, DollarSign, X, ExternalLink, ArrowRight, Trash2, RotateCcw } from 'lucide-react'
import GroqService, { CraftRecommendation } from '../services/groqService'
import Link from 'next/link'

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  recommendation?: CraftRecommendation;
}

const QUICK_QUERIES = [
  "Wedding gift under ₹5000",
  "Blue pottery decor",
  "Banarasi silk sarees",
  "Traditional art for home"
]

export const AICraftRecommender: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<ChatMessage[]>([
    { role: 'assistant', content: '👋 Namaste! I\'m your AI craft advisor. I can help you find perfect authentic Indian crafts and artisans. What brings you here today?' }
  ])
  
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when conversation changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation, isLoading])

  const handleGetRecommendation = async (text?: string) => {
    const queryText = text || query
    if (!queryText.trim()) return

    setQuery('')
    setIsLoading(true)
    
    // Add user query to conversation
    setConversation(prev => [...prev, { role: 'user', content: queryText }])
    
    try {
      const groqService = new GroqService()
      const result = await groqService.getCraftRecommendation(queryText)
      
      // Add AI response and recommendation to conversation
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: result.reasoning,
        recommendation: result
      }])
      
    } catch (error) {
      console.error('Error getting recommendation:', error)
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error while processing your request. Please try again later.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setConversation([
      { role: 'assistant', content: '👋 Namaste! I\'m your AI craft advisor. I can help you find perfect authentic Indian crafts and artisans. What brings you here today?' }
    ])
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
        className="fixed bottom-6 right-6 z-[1000] bg-gradient-to-r from-maroon to-gold text-ivory p-4 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
        aria-label="Open AI Craft Recommender"
      >
        <Bot size={24} className="group-hover:animate-bounce" />
        <span className="font-ui font-bold text-sm">Ask AI Advisor</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-[400px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-sand/30 flex flex-col h-[600px] max-h-[85vh] animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sand/20 bg-gradient-to-r from-maroon/5 to-gold/5 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-maroon to-gold flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading text-walnut text-lg font-bold">AI Craft Advisor</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-walnut/60 font-ui uppercase tracking-wider font-bold">Live • Powered by Groq</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="text-walnut/40 hover:text-maroon hover:bg-maroon/5 transition-all p-2 rounded-full"
            title="Clear Chat"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-walnut/40 hover:text-walnut hover:bg-sand/10 transition-all p-2 rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-sand/30 scrollbar-track-transparent pb-8"
      >
        {conversation.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-maroon text-ivory rounded-tr-none' 
                : 'bg-sand/10 text-walnut border border-sand/20 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed font-ui whitespace-pre-wrap">{msg.content}</p>
            </div>

            {/* Recommendation Result if present */}
            {msg.recommendation && (
              <div className="mt-4 w-full space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                {/* Artisan Recommendation */}
                {msg.recommendation.artisan && (
                  <div className="bg-white p-4 rounded-xl border border-sand/20 shadow-premium hover:border-gold/30 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                        <Star size={20} className="text-maroon" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="font-heading text-walnut font-bold truncate">{msg.recommendation.artisan.name}</h5>
                          <Link 
                            href="/artisans" 
                            className="text-maroon hover:text-walnut text-[10px] font-bold flex items-center gap-1 shrink-0 bg-maroon/5 px-2 py-1 rounded-full transition-colors"
                          >
                            PROFILE <ExternalLink size={10} />
                          </Link>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-walnut/60 font-ui mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {msg.recommendation.artisan.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {msg.recommendation.artisan.experience}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {msg.recommendation.artisan.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gold/10 text-walnut text-[10px] rounded-full border border-gold/20 font-medium">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Recommendation */}
                {msg.recommendation.product && (
                  <div className="bg-gradient-to-br from-white to-sand/5 p-4 rounded-xl border border-sand/20 shadow-premium hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <h5 className="font-heading text-walnut font-bold truncate">{msg.recommendation.product.name}</h5>
                        <p className="text-[10px] text-walnut/50 font-ui uppercase tracking-wider">{msg.recommendation.product.craft} • {msg.recommendation.product.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-heading text-maroon font-bold leading-none">₹{msg.recommendation.product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <p className="text-xs text-walnut/70 leading-relaxed font-ui mb-4 line-clamp-3 italic">"{msg.recommendation.product.description}"</p>
                    <Link 
                      href="/trade" 
                      className="w-full py-2 bg-maroon text-ivory rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-walnut transition-all shadow-md active:scale-[0.98]"
                    >
                      View Product Details <ArrowRight size={14} />
                    </Link>
                  </div>
                )}

                {/* Alternatives */}
                {msg.recommendation.alternatives && msg.recommendation.alternatives.length > 0 && (
                  <div className="bg-sand/5 p-4 rounded-xl border border-dashed border-sand/40">
                    <h5 className="font-heading text-walnut font-bold text-xs mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-gold" /> More Options
                    </h5>
                    <div className="space-y-2">
                      {msg.recommendation.alternatives.map((alt, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 bg-white/80 rounded-lg border border-sand/10 hover:border-gold/20 transition-all">
                          <div className="min-w-0 pr-2">
                            <p className="text-[11px] font-ui text-walnut font-bold truncate">{alt.name}</p>
                            <p className="text-[10px] text-walnut/60 truncate italic">{alt.reason}</p>
                          </div>
                          <p className="text-xs font-heading text-maroon font-bold shrink-0">₹{alt.price.toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-sand/10 text-walnut border border-sand/20 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-maroon/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-maroon/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-maroon/80 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <p className="text-xs font-ui italic text-walnut/60">Advisor is thinking...</p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && conversation.length === 1 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:0.3s]">
            {QUICK_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleGetRecommendation(q)}
                className="px-3 py-1.5 bg-white border border-sand/30 rounded-full text-[11px] font-ui text-walnut/70 hover:border-maroon/30 hover:bg-maroon/5 transition-all shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-sand/20 p-4 bg-white rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for gift ideas, specific crafts..."
            className="w-full pl-4 pr-12 py-3.5 border border-sand/20 rounded-2xl focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 text-sm font-ui shadow-inner bg-sand/5"
            disabled={isLoading}
          />
          <button
            onClick={() => handleGetRecommendation()}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 p-2 bg-maroon text-ivory rounded-xl font-ui font-bold hover:bg-walnut transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md flex items-center justify-center group"
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-center mt-3 text-walnut/40 font-ui italic">
          Try: "wedding gift under 5000" or "blue pottery decor"
        </p>
      </div>
    </div>
  )
}

export default AICraftRecommender
