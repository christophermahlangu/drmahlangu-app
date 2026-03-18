"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const habits = [
  "🗣️ 45 mins Morning Affirmations", "🚫 No porn", "🚫 No masturbation", "🧠 No daydreaming",
  "🔢 6 hours Mathematics", "⚛️ 6 hours Physical Science", "💧 Drink 3 liters water",
  "🥗 Avoid oily food", "🍬 Avoid sugar", "🧘‍♂️ 30 mins meditation",
  "📱 No Instagram", "🐦 No Twitter", "▶️ No YouTube shorts",
];

const startDate = new Date(2026, 2, 19);
const endDate = new Date(2026, 3, 30);

function generateDates() {
  const dates: string[] = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(current.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

const dates = generateDates();

export default function Home() {
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mahlanguTracker");
    if (saved) setCheckboxes(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("mahlanguTracker", JSON.stringify(checkboxes));
  }, [checkboxes, mounted]);

  const toggle = (habit: string, date: string) => {
    const key = `${habit}-${date}`;
    setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const overallProgress = () => {
    let totalChecked = 0;
    dates.forEach(date => habits.forEach(h => { if (checkboxes[`${h}-${date}`]) totalChecked++; }));
    return (totalChecked / (habits.length * dates.length)) * 100;
  };

  const habitStreak = (habit: string) => {
    let streak = 0;
    for (let i = dates.length - 1; i >= 0; i--) {
      const key = `${habit}-${dates[i]}`;
      if (checkboxes[key]) streak++;
      else break;
    }
    return streak;
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30 relative overflow-hidden antialiased">
      
      {/* APPLE BACKGROUND BLUR */}
      <div className="fixed inset-0 -z-10 bg-[#020205]">
        <div className="absolute top-[-20%] left-[-10%] w-[90%] h-[80%] rounded-full bg-blue-600/10 blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      {!showTracker ? (
        /* --- STAGE 1: THE FUNDAMENTALS (WELCOME) --- */
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="liquid-glass p-12 md:p-20 max-w-5xl w-full shadow-2xl space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
              Dr. Christopher Mahlangu
            </h1>
            
            <div className="space-y-3 text-lg md:text-xl font-semibold text-zinc-300 tracking-wide leading-relaxed">
              <p>BSc in Mathematical Sciences (Wits)</p>
              <p>BSc Honours in Mathematics (Wits)</p>
              <p>MSc Applied Mathematics (Harvard)</p>
              <p className="text-blue-400">PhD Applied Mathematics: Complex Quantum Stochastic Control Systems (Harvard)</p>
            </div>

            <div className="h-[1px] w-48 bg-white/10 mx-auto" />

            <div className="max-w-3xl mx-auto space-y-6 text-zinc-400 text-sm md:text-base italic font-light leading-relaxed">
              <p>"Building a house brick by brick. Layer by hard layer. Focus on the process."</p>
              <div className="flex justify-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600">
                <span>$600K+ Annually</span>
                <span>•</span>
                <span>Audi RS Q8</span>
                <span>•</span>
                <span>Range Rover Autobiography</span>
              </div>
            </div>

            <div className="pt-8">
               <button 
                  onClick={() => setShowTracker(true)}
                  className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-110 active:scale-95 transition-all shadow-white/20 shadow-2xl"
               >
                  Initialize Protocol
               </button>
            </div>
          </div>
        </section>
      ) : (
        /* --- STAGE 2: THE EXECUTION (TRACKER) --- */
        <section className="min-h-screen p-4 md:p-12 animate-in slide-in-from-bottom-10 duration-700">
          <div className="max-w-[1600px] mx-auto space-y-12">
            
            <div className="flex justify-between items-center bg-white/[0.03] p-8 rounded-[40px] border border-white/5">
                <button onClick={() => setShowTracker(false)} className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors">← Back to Vision</button>
                <h2 className="text-2xl font-black tracking-tighter uppercase text-zinc-400">Mission Control</h2>
            </div>

            {/* OVERALL PROGRESS CIRCLE */}
            <div className="flex justify-center py-10">
                <div className="liquid-glass p-12 rounded-full w-72 h-72 flex flex-col items-center justify-center relative shadow-2xl">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-110">
                        <circle cx="144" cy="144" r="120" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="none" />
                        <circle cx="144" cy="144" r="120" stroke="url(#circle-blue)" strokeWidth="12" fill="none"
                            strokeDasharray={2 * Math.PI * 120}
                            strokeDashoffset={2 * Math.PI * 120 * (1 - overallProgress() / 100)}
                            strokeLinecap="round" className="transition-all duration-1000"
                        />
                        <defs><linearGradient id="circle-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0A84FF" /><stop offset="100%" stopColor="#5E5CE6" /></linearGradient></defs>
                    </svg>
                    <span className="text-6xl font-black tracking-tighter">{overallProgress().toFixed(0)}%</span>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mt-2">Overall</span>
                </div>
            </div>

            {/* GRID TABLE */}
            <div className="liquid-glass rounded-[50px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/[0.05] border-b border-white/10">
                      <th className="sticky left-0 z-30 bg-[#0a0a0c] p-10 text-left text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 min-w-[320px]">Habit</th>
                      {dates.map(date => (
                        <th key={date} className="p-6 text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 border-r border-white/5 min-w-[80px]">
                          <div className="rotate-[-90deg] whitespace-nowrap">{date}</div>
                        </th>
                      ))}
                      <th className="sticky right-0 z-30 bg-[#0a0a0c] p-10 text-center text-xl font-black uppercase text-blue-500 border-l border-white/10">Streak 🔥</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {habits.map(habit => (
                      <tr key={habit} className="group hover:bg-white/[0.03] transition-colors">
                        <td className="sticky left-0 z-20 bg-[#08080a] p-10 text-2xl font-bold tracking-tighter text-zinc-400 group-hover:text-white transition-colors">
                          {habit}
                        </td>
                        {dates.map(date => {
                          const key = `${habit}-${date}`;
                          return (
                            <td key={key} className="p-0 border-r border-white/5">
                              <button onClick={() => toggle(habit, date)} className={`w-full h-24 flex items-center justify-center transition-all ${checkboxes[key] ? 'bg-blue-600/10' : 'hover:bg-white/5'}`}>
                                <div className={`w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${checkboxes[key] ? 'bg-blue-500 border-blue-400 shadow-[0_0_25px_rgba(10,132,255,0.6)] scale-125' : 'border-zinc-800'}`}>
                                  {checkboxes[key] && <span className="text-white text-[14px] font-black">✓</span>}
                                </div>
                              </button>
                            </td>
                          );
                        })}
                        <td className="sticky right-0 z-20 bg-[#08080a] p-10 text-center font-mono text-3xl text-blue-400 font-bold border-l border-white/5">
                          {habitStreak(habit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="text-center py-20 text-[10px] tracking-[1em] text-zinc-800 uppercase font-black">Quantum Execution Layer</footer>
          </div>
        </section>
      )}

      {/* CUSTOM LIQUID GLASS CSS */}
      <style jsx global>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(60px) saturate(220%);
          -webkit-backdrop-filter: blur(60px) saturate(220%);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(10, 132, 255, 0.5); }
      `}</style>
    </main>
  );
}