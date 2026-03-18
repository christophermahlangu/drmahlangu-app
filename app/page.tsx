"use client";
import React, { useState, useEffect } from 'react';

// --- THE DATA FROM YOUR SPREADSHEET SCRIPT ---
const habits = [
  { id: 'aff', name: "45 mins Morning Affirmations", icon: "🗣️" },
  { id: 'math', name: "6 hours Mathematics (Senior Cert)", icon: "🔢" },
  { id: 'phys', name: "6 hours Physical Science (Senior Cert)", icon: "⚛️" },
  { id: 'med', name: "30 mins Meditation", icon: "🧘‍♂️" },
  { id: 'porn', name: "No Porn / No Masturbation", icon: "🚫" },
  { id: 'daydream', name: "No Daydreaming (Mental Focus)", icon: "🧠" },
  { id: 'water', name: "Drink 3 Liters Water", icon: "💧" },
  { id: 'food', name: "Avoid Sugar & Oily Food", icon: "🥗" },
  { id: 'social', name: "No IG / Twitter / YT Shorts", icon: "📱" }
];

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('mahlangu-elite-protocol');
    if (saved) setChecked(JSON.parse(saved));
    
    // Calculate Sprint (Ending April 30)
    const end = new Date('2026-04-30').getTime();
    const now = new Date().getTime();
    setDaysLeft(Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24))));
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('mahlangu-elite-protocol', JSON.stringify(checked));
  }, [checked, mounted]);

  const toggleHabit = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- GLOSSY BACKGROUND MESH --- */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-cyan-950/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-950/20 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto space-y-10 pb-24">
        
        {/* --- HEADER: DR. MAHLANGU IDENTITY --- */}
        <header className="text-center space-y-4 border-b border-white/5 pb-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
            DR. MAHLANGU
          </h1>
          <div className="text-[10px] md:text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase leading-relaxed px-4">
            BSc Wits (Distinction) | BScHons Wits (Distinction) | MSc Harvard | PhD Harvard Candidate
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {['$600K Salary', 'Audi RS Q8', 'Range Rover Autobiography'].map((asset) => (
              <span key={asset} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                {asset}
              </span>
            ))}
          </div>
        </header>

        {/* --- THE VISION BOARD QUOTES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 italic">
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 border-l-cyan-500 border-l-2 text-[11px] leading-relaxed text-zinc-400">
            "Just because it's taking time doesn't mean it's not happening. Building a house brick by brick... if you remove your mind from the outcome and put it into the process, you will achieve exactly what you want."
          </div>
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 border-l-blue-500 border-l-2 text-[11px] leading-relaxed text-zinc-400">
            "Do not use their success as a comparison to yours. Be focused. Be vigilant. You felt behind, but that doesn't mean it's not happening."
          </div>
        </div>

        {/* --- THE ANALYTICS --- */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-8 rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="block text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-2 font-black">Days Remaining</span>
            <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{daysLeft}</span>
            <span className="block text-[10px] text-cyan-400 mt-2 font-bold tracking-widest uppercase">To April 30</span>
          </div>

          <div className="p-8 rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="block text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-2 font-black">Daily Score</span>
            <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{progressPercent}<span className="text-2xl text-zinc-600">%</span></span>
            <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-1000" 
                  style={{width: `${progressPercent}%`}} 
                />
            </div>
          </div>
        </div>

        {/* --- THE PROTOCOL TRACKER --- */}
        <div className="bg-white/[0.01] border border-white/5 rounded-[48px] overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase">Protocol Activation</h2>
            <span className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase font-bold">Live Grid // 2026.03.19 - 2026.04.30</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center justify-between p-6 transition-all duration-300 group ${
                  checked[habit.id] ? 'bg-cyan-500/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl transition-all duration-500 ${checked[habit.id] ? 'scale-125 rotate-0 shadow-cyan-500' : 'grayscale group-hover:grayscale-0 -rotate-12 group-hover:rotate-0'}`}>
                    {habit.icon}
                  </span>
                  <span className={`text-sm md:text-base font-medium tracking-tight transition-colors duration-300 ${
                    checked[habit.id] ? 'text-cyan-300' : 'text-zinc-400'
                  }`}>
                    {habit.name}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                  checked[habit.id] ? 'bg-cyan-500 border-cyan-400' : 'border-zinc-800 bg-transparent'
                }`}>
                  {checked[habit.id] && (
                    <svg className="w-4 h-4 text-black font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- FOOTER STATUS --- */}
        <footer className="text-center pt-10 space-y-4">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-auto" />
            <p className="text-[8px] text-zinc-700 tracking-[0.6em] uppercase font-bold">
              Quantum Stochastic Interface // Christopher Mahlangu x Vercel Elite
            </p>
        </footer>
      </div>
    </main>
  );
}