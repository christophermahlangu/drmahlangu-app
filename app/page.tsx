"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const habits = [
  "🗣️ 45 mins Morning Affirmations",
  "🚫 No porn",
  "🚫 No masturbation",
  "🧠 No daydreaming",
  "🔢 6 hours Mathematics",
  "⚛️ 6 hours Physical Science",
  "💧 Drink 3 liters water",
  "🥗 Avoid oily food",
  "🍬 Avoid sugar",
  "🧘‍♂️ 30 mins meditation",
  "📱 No Instagram",
  "🐦 No Twitter",
  "▶️ No YouTube shorts",
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("mahlanguTracker");
    if (saved) setCheckboxes(JSON.parse(saved));
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
    <main className="min-h-screen bg-[#000] text-white p-4 md:p-10 font-sans selection:bg-blue-500/30 relative overflow-x-hidden antialiased">
      
      {/* --- APPLE VIBRANT BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 bg-[#020205]">
        <div className="absolute top-[-25%] left-[-10%] w-[90%] h-[80%] rounded-full bg-blue-600/15 blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      {/* Confetti on 100% */}
      {overallProgress() === 100 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- IDENTITY HEADER (Liquid Glass Style) --- */}
        <header className="liquid-glass p-10 md:p-16 text-center shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 pb-4">
            Dr. Christopher Mahlangu
          </h1>
          
          <div className="space-y-2 text-sm md:text-base font-semibold text-zinc-300 max-w-4xl mx-auto leading-relaxed">
            <p>BSc in Mathematical Sciences (Wits)</p>
            <p>BSc Honours in Mathematics (Wits)</p>
            <p>MSc Applied Mathematics (Harvard)</p>
            <p className="text-blue-400">PhD Applied Mathematics: Complex Quantum Stochastic Control Systems (Harvard)</p>
          </div>
          
          <div className="h-[1px] w-32 bg-white/10 mx-auto my-8" />
          
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-medium tracking-[0.15em] text-zinc-400 uppercase">
             <span>Elite Quantitative Researcher</span>
             <span className="text-zinc-700">|</span>
             <span className="text-white font-bold">$600K+ Annually</span>
             <span className="text-zinc-700">|</span>
             <span>Audi RS Q8</span>
             <span className="text-zinc-700">|</span>
             <span>Range Rover Autobiography</span>
          </div>
        </header>

        {/* --- LIQUID PROGRESS RING --- */}
        <div className="flex justify-center">
            <div className="liquid-glass p-8 flex flex-col items-center gap-4 rounded-full w-60 h-60 justify-center relative shadow-inner shadow-white/5">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="120" cy="120" r="102" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="none" />
                    <circle
                        cx="120" cy="120" r="102"
                        stroke="url(#liquid-blue)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 102}
                        strokeDashoffset={2 * Math.PI * 102 * (1 - overallProgress() / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                    />
                    <defs>
                        <linearGradient id="liquid-blue" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0A84FF" />
                            <stop offset="100%" stopColor="#5E5CE6" />
                        </linearGradient>
                    </defs>
                </svg>
                <span className="text-5xl font-black tracking-tighter">{overallProgress().toFixed(0)}%</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">Execution</span>
            </div>
        </div>

        {/* --- THE GRID (Apple Table style) --- */}
        <div className="liquid-glass rounded-[48px] overflow-hidden border border-white/5 shadow-2xl mb-20">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/5">
                  <th className="sticky left-0 z-30 bg-[#111115] p-6 text-left text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 min-w-[260px]">Protocol</th>
                  {dates.map(date => (
                    <th key={date} className="p-4 text-[10px] font-bold text-zinc-500 border-r border-white/5 min-w-[64px]">
                      <div className="rotate-[-90deg] whitespace-nowrap">{date}</div>
                    </th>
                  ))}
                  <th className="sticky right-0 z-30 bg-[#111115] p-6 text-center text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Streak</th>
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
                                checkboxes[key] ? 'bg-blue-500/[0.08]' : 'hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                              checkboxes[key] ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(10,132,255,0.5)] scale-110' : 'border-zinc-800'
                            }`}>
                              {checkboxes[key] && <span className="text-white text-[12px] font-black">✓</span>}
                            </div>
                          </button>
                        </td>
                      );
                    })}
                    <td className="sticky right-0 z-20 bg-[#08080a] p-6 text-center font-mono text-blue-400 text-sm font-bold border-l border-white/5">
                      {habitStreak(habit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="py-16 text-center space-y-4">
            <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
            <p className="text-[9px] text-zinc-700 tracking-[0.8em] uppercase font-black">
              Mahlangu QuantumOS // High Fidelity Execution
            </p>
        </footer>
      </div>

      {/* --- LIQUID GLASS ENHANCEMENT --- */}
      <style jsx global>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(50px) saturate(200%);
          -webkit-backdrop-filter: blur(50px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 48px;
        }

        /* Apple Style Scrollbar */
        ::-webkit-scrollbar {
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(10, 132, 255, 0.4);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
      `}</style>
    </main>
  );
}