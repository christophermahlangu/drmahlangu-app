"use client";
import { useEffect, useState, useRef } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);

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

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden antialiased">
      
      {/* --- APPLE VIBRANT BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 bg-[#020205]">
        <div className="absolute top-[-20%] left-[-10%] w-[90%] h-[80%] rounded-full bg-blue-600/10 blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      {/* --- SECTION 1: THE WELCOME PAGE (Vision Board) --- */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
        <div className="liquid-glass p-12 md:p-20 max-w-5xl w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
            Dr. Christopher Mahlangu
          </h1>
          
          <div className="space-y-3 text-base md:text-xl font-medium text-zinc-300 tracking-wide">
            <p>BSc in Mathematical Sciences (Wits)</p>
            <p>BSc Honours in Mathematics (Wits)</p>
            <p>MSc Applied Mathematics (Harvard)</p>
            <p className="text-blue-400 font-bold">PhD Applied Mathematics: Complex Quantum Stochastic Control Systems (Harvard)</p>
          </div>

          <div className="h-[1px] w-48 bg-white/10 mx-auto" />

          {/* THE LONG-ASS MOTIVATION */}
          <div className="max-w-3xl mx-auto space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-light italic">
            <p>
              "Just because it's taking time doesn't mean it's not happening. Building a house brick by brick, layer by hard layer—especially when you started without many resources—can feel like it will never end."
            </p>
            <p>
              "Do not use their success as a comparison to yours. Be focused. Be vigilant. You felt behind, but that doesn't mean it's not happening. If you remove your mind from the outcome and put it into the process, you will eventually achieve exactly what you want."
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
             <div className="flex gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-6">
                <span>$600K+ Annually</span>
                <span>•</span>
                <span>Audi RS Q8</span>
                <span>•</span>
                <span>Range Rover Autobiography</span>
             </div>
             
             {/* THE BUTTON TO ACCESS TRACKER */}
             <button 
                onClick={scrollToGrid}
                className="group relative px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
             >
                Initialize Protocol
                <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
             </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE HABIT GRID (Liquid Table) --- */}
      <section ref={gridRef} className="min-h-screen flex flex-col p-4 md:p-10 pt-20">
        <div className="max-w-7xl mx-auto w-full space-y-10">
            <div className="flex justify-between items-end px-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Daily Execution Grid</h2>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Status: High Fidelity // March 19 - April 30</p>
                </div>
            </div>

            <div className="liquid-glass rounded-[48px] overflow-hidden border border-white/5 shadow-2xl mb-20">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/[0.04] border-b border-white/5">
                      <th className="sticky left-0 z-30 bg-[#08080a] p-6 text-left text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 min-w-[260px]">Protocol Task</th>
                      {dates.map(date => (
                        <th key={date} className="p-4 text-[10px] font-bold text-zinc-500 border-r border-white/5 min-w-[64px]">
                          <div className="rotate-[-90deg] whitespace-nowrap">{date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {habits.map(habit => (
                      <tr key={habit} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="sticky left-0 z-20 bg-[#08080a] p-6 text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                          {habit}
                        </td>
                        {dates.map(date => {
                          const key = `${habit}-${date}`;
                          return (
                            <td key={key} className="p-0 border-r border-white/5">
                              <button 
                                onClick={() => toggle(habit, date)}
                                className={`w-full h-16 flex items-center justify-center transition-all ${
                                    checkboxes[key] ? 'bg-blue-500/[0.12]' : 'hover:bg-white/[0.04]'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                                  checkboxes[key] ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(10,132,255,0.4)] scale-110' : 'border-zinc-800'
                                }`}>
                                  {checkboxes[key] && <span className="text-white text-[12px] font-black">✓</span>}
                                </div>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        <footer className="py-20 text-center opacity-30 text-[9px] tracking-[0.8em] uppercase font-black">
          Mahlangu QuantOS // End of Protocol
        </footer>
      </section>

      {/* --- CUSTOM LIQUID GLASS CSS --- */}
      <style jsx global>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(60px) saturate(210%);
          -webkit-backdrop-filter: blur(60px) saturate(210%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
        }

        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(10, 132, 255, 0.5); }
      `}</style>
    </main>
  );
}