
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Bot, User, Loader2, Sparkles, Headset } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useApp } from '../store/AppContext';

const Chatbot: React.FC = () => {
  const { isChatOpen, setChatOpen, user } = useApp();
  const [messages, setMessages] = useState<{role: 'user' | 'bot' | 'system', content: string}[]>([
    { role: 'bot', content: 'Hi there! Welcome to Elite Inventory. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAgentAssigned, setIsAgentAssigned] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the Elite Inventory Support Assistant. 
          Use very simple, easy-to-understand language. Avoid technical jargon.
          Elite Inventory sells digital products like ChatGPT Plus, Canva Pro, VPNs, and software keys.
          Important info to explain simply:
          - How to pay: Send money manually via bKash or Nagad, then give us the TRX ID.
          - Delivery time: Usually takes 30 to 90 minutes. You will see it in your dashboard or email.
          - Refunds: Only if the key doesn't work and we can't fix it in 24 hours.
          If the user wants to talk to a person, admin, or agent, say "I will find a team member for you" and tell them to click the "Talk to a Human" button.
          The user's name is ${user?.name || 'Friend'}.`,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', content: response.text || "I'm sorry, I'm having a little trouble connecting. Can you try again?" }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "Something went wrong. Please refresh the page or try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const requestAgent = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAgentAssigned(true);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'Agent "Rahat" has joined the chat. They will help you in just a moment.' 
      }]);
    }, 1500);
  };

  if (!isChatOpen) return (
    <button 
      onClick={() => setChatOpen(true)}
      className="fixed bottom-24 right-4 sm:right-8 z-[60] bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border border-white/10"
      aria-label="Open Chat"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl hidden sm:inline-block">
        Chat with us
      </span>
    </button>
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[70] w-[calc(100%-2rem)] sm:w-[380px] h-[80vh] sm:h-[600px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-scaleIn">
      {/* Header */}
      <div className="bg-slate-900 p-5 sm:p-6 text-white flex justify-between items-center relative overflow-hidden flex-shrink-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-white/5 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 sm:w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Support Agent</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        <button onClick={() => setChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role !== 'system' && (
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-slate-900 shadow-md'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-slate-500" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
              )}
              <div className={`p-3 sm:p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' : 
                msg.role === 'system' ? 'bg-amber-50 text-amber-800 border border-amber-100 italic w-full text-center text-[11px]' :
                'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white border border-slate-100 p-3 sm:p-4 rounded-2xl shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Verifying...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {!isAgentAssigned && !loading && (
        <div className="px-4 sm:px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50/50 flex-shrink-0">
          <button 
            onClick={requestAgent}
            className="flex-shrink-0 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm"
          >
            <Headset className="w-3 h-3" /> Connect Human
          </button>
          <button 
            onClick={() => setInput("How do I pay with bKash?")}
            className="flex-shrink-0 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm"
          >
            Payment Guide
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 sm:p-6 bg-white border-t border-slate-100 flex-shrink-0">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Secure message..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 sm:py-4 pl-5 sm:pl-6 pr-14 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[8px] sm:text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-3 sm:mt-4 flex items-center justify-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5" /> AI Augmented Security
        </p>
      </form>
    </div>
  );
};

export default Chatbot;
