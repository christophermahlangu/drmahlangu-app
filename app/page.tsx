"use client";
import { useEffect, useState } from "react";

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

  const dailyProgress = (date: string) => {
    const checked = habits.filter(h => checkboxes[`${h}-${date}`]).length;
    return (checked / habits.length) * 100;
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
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      
      {/* GLOSSY BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      {/* VISION BOARD HEADER */}
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-10 border-b border-white/5 pb-10">
        <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          DR. CHRISTOPHER MAHLANGU
        </h1>
        <p className="text-[10px] md:text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase max-w-4xl mx-auto leading-relaxed">
          🎓 BSc & BScHons Mathematics (Wits) | MSc Applied Mathematics (Harvard) | PhD Applied Mathematics: Complex Quantum Stochastic Control Systems (Harvard)
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-[9px] uppercase tracking-widest text-zinc-400 font-bold italic pt-2">
            <span>💰 $600K+ Annually</span>
            <span>🏎️ Audi RS Q8</span>
            <span>🚙 Range Rover Autobiography</span>
        </div>
        <p className="text-zinc-500 text-xs italic max-w-2xl mx-auto pt-4">
          "Just because it's taking time doesn't mean it's not happening. Building a house brick by brick... layer by hard layer."
        </p>
      </div>

      {/* GRID TRACKER */}
      <div className="max-w-[100vw] overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl">
        <table className="border-collapse w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="sticky left-0 bg-[#070707] z-30 p-4 text-left text-[10px] uppercase tracking-widest text-zinc-500 border-r border-white/10 min-w-[220px]">Habit</th>
              {dates.map(date => (
                <th key={date} className="p-3 text-[10px] font-bold text-zinc-400 border-r border-white/5 min-w-[50px]">
                  <div className="rotate-[-90deg] whitespace-nowrap">{date}</div>
                </th>
              ))}
              <th className="sticky right-0 bg-[#070707] z-30 p-4 text-center text-[10px] uppercase tracking-widest text-cyan-500 border-l border-white/10">Streak 🔥</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {habits.map(habit => (
              <tr key={habit} className="hover:bg-white/[0.03] transition-colors group">
                <td className="sticky left-0 bg-[#070707] z-20 p-4 text-xs font-bold text-zinc-300 border-r border-white/10 group-hover:text-cyan-400 transition-colors">
                  {habit}
                </td>
                {dates.map(date => {
                  const key = `${habit}-${date}`;
                  return (
                    <td key={key} className="p-0 border-r border-white/5">
                        <button 
                          onClick={() => toggle(habit, date)}
                          className={`w-full h-12 flex items-center justify-center transition-all ${
                            checkboxes[key] ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border transition-all ${
                            checkboxes[key] ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'border-zinc-800 bg-transparent'
                          }`}>
                            {checkboxes[key] && <span className="text-black text-[8px] font-black flex items-center justify-center h-full">✓</span>}
                          </div>
                        </button>
                    </td>
                  );
                })}
                <td className="sticky right-0 bg-[#070707] z-20 p-4 text-center font-mono text-cyan-400 text-sm border-l border-white/10">
                    {habitStreak(habit)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-white/5 border-t border-white/10">
            <tr>
              <td className="sticky left-0 bg-[#070707] p-4 text-[10px] font-black uppercase text-zinc-500 border-r border-white/10">Daily Progress</td>
              {dates.map(date => (
                <td key={date} className="p-2 border-r border-white/5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-1.5 bg-zinc-900 rounded-full overflow-hidden flex flex-col justify-end">
                      <div 
                        className="bg-cyan-500 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
                        style={{ height: `${dailyProgress(date)}%` }}
                      ></div>
                    </div>
                    <span className="text-[8px] font-mono text-zinc-500">{dailyProgress(date).toFixed(0)}%</span>
                  </div>
                </td>
              ))}
              <td className="sticky right-0 bg-[#070707] border-l border-white/10"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <footer className="mt-12 text-center text-[8px] text-zinc-700 tracking-[0.5em] uppercase pb-10">
        Quantum Execution Layer // Built for Christopher Mahlangu
      </footer>
    </main>
  );
}