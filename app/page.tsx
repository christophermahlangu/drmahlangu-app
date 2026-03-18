"use client";
import React, { useState, useEffect } from 'react';

const habits = [
  { name: "45 mins Morning Affirmations", icon: "🗣️" },
  { name: "6 hours Mathematics", icon: "🔢" },
  { name: "6 hours Physical Science", icon: "⚛️" },
  { name: "30 mins meditation", icon: "🧘‍♂️" },
  { name: "No porn", icon: "🚫" },
  { name: "No masturbation", icon: "🚫" },
  { name: "No daydreaming", icon: "🧠" },
  { name: "Drink 3 liters water", icon: "💧" },
  { name: "Avoid sugar & oily food", icon: "🥗" },
  { name: "No social media (IG/Twitter/YT)", icon: "📱" }
];

export default function Home() {
  const [checked, setChecked] = useState<boolean[]>(new Array(habits.length).fill(false));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mahlangu-elite-v1');
    if (saved) setChecked(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('mahlangu-elite-v1', JSON.stringify(checked));
  }, [checked, mounted]);

  const toggleHabit = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const progress = Math.round((checked.filter(Boolean).length / habits.length) * 100);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0c] text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- VIVID BACKGROUND MESH --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* --- GLASS HEADER --- */}
        <header className="mb-10 text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            DR. MAHLANGU
          </h1>
          <p className="text-cyan-400 text-[10px] tracking-[0.4em] uppercase font-bold">
            Harvard Applied Math Protocol
          </p>
        </header>

        {/* --- GLASS PROGRESS CARD --- */}
        <div className="mb-8 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-zinc-400 text-[10px] uppercase tracking-widest mb-2 font-semibold">Mission Completion</span>
            <div className="text-7xl font-black text-white tabular-nums tracking-tighter mb-4">
              {progress}<span className="text-cyan-500 text-3xl">%</span>
            </div>
            
            {/* Glossy Progress Track */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* --- INTERACTIVE HABIT LIST --- */}
        <div className="space-y-3">
          {habits.map((habit, i) => (
            <button
              key={i}
              onClick={() => toggleHabit(i)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${
                checked[i] 
                ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <span className={`text-xl transition-transform duration-300 ${checked[i] ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                  {habit.icon}
                </span>
                <span className={`text-sm font-medium transition-colors ${checked[i] ? 'text-cyan-300' : 'text-zinc-400'}`}>
                  {habit.name}
                </span>
              </div>
              
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                checked[i] ? 'bg-cyan-500 border-cyan-400 scale-110' : 'border-zinc-700 bg-transparent'
              }`}>
                {checked[i] && (
                  <svg className="w-3 h-3 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[9px] text-zinc-600 tracking-[0.3em] uppercase mb-4">
            System Status: Optimal // {new Date().toLocaleDateString()}
          </p>
          <div className="h-px w-12 bg-zinc-800 mx-auto" />
        </footer>
      </div>
    </main>
  );
}