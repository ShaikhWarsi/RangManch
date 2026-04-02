'use client'

import React, { useState } from 'react'
import { MessageCircle, Send, Bot, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  isTyping?: boolean
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Namaste! I\'m your AI craft assistant. I can help you find the perfect artisan for any occasion. What brings you here today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(inputText)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = async (query: string): Promise<Message> => {
    // Simulate API call to Groq
    const responses = [
      `For a wedding Bandhani gift, I recommend **Master Weaver Rajesh Kumar** from Kutch. His Bandhani sarees use traditional tie-dye techniques with natural colors, perfect for wedding ceremonies. Price range: ₹8,000-15,000. Would you like me to connect you with him?`,
      `The **finest Bandhani for weddings** comes from **Kutch, Gujarat**. Look for artisans specializing in **Gharchola** and **Khatri** Bandhani techniques. These feature intricate peacock and floral motifs in vibrant reds and maroons - traditionally auspicious for weddings.`,
      `I suggest **Zarina Begum** from Jaipur for your wedding Bandhani. She specializes in **Bandhej** style with gold zari work on silk. Her pieces are museum-quality and perfect for special occasions. Average wedding Bandhani saree: ₹12,000-25,000.`,
      `For authentic wedding Bandhani, consider **traditional reds** (geru, kumkum) with **gold borders**. Master artisans use **natural vegetable dyes** that last generations. Wedding collections typically take 2-3 months to complete.`
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[1000] bg-maroon text-ivory p-4 rounded-full shadow-premium hover:bg-walnut transition-all duration-300 group-hover:scale-110"
        aria-label="Open AI Craft Assistant"
      >
        <Bot size={24} className="mr-2" />
        <span className="font-ui font-bold text-sm">Ask AI</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-96 bg-white rounded-2xl shadow-premium border border-sand/20 flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sand/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-maroon to-gold flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading text-walnut text-lg font-bold">Craft Assistant</h3>
            <p className="text-xs text-walnut/60 font-ui">Powered by AI</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-walnut/40 hover:text-walnut transition-colors p-2"
          aria-label="Close assistant"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-maroon text-ivory'
                  : 'bg-sand/10 text-walnut border border-sand/20'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-maroon" />
                  <span className="text-xs font-ui text-walnut/60 uppercase tracking-widest">AI Assistant</span>
                </div>
              )}
              <p className="text-sm leading-relaxed font-ui">
                {message.text}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-sand/10 text-walnut border border-sand/20 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-walnut/40 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-walnut/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-walnut/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-walnut/60">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-sand/20">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about authentic Indian crafts..."
            className="flex-1 px-4 py-3 bg-sand/10 border border-sand/20 rounded-full text-sm focus:outline-none focus:border-gold focus:bg-white transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-maroon text-ivory rounded-full hover:bg-walnut transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
