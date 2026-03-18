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

const dailyMessages = [
  "✨ Today is your day — make it legendary!",
  "🔥 Keep pushing — every check counts!",
  "💎 Build habits, build yourself.",
  "🚀 Small steps = giant leaps.",
  "🌟 Believe in the process.",
  "⚡ You are unstoppable!",
  "🌈 Glow with your habits!",
  "💫 Every check is progress!",
];

export default function Home() {
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});
  const [dailyMessage, setDailyMessage] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("mahlanguTracker");
    if (saved) setCheckboxes(JSON.parse(saved));

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    // Set initial daily message randomly
    setMessageIndex(Math.floor(Math.random() * dailyMessages.length));
  }, []);

  useEffect(() => {
    localStorage.setItem("mahlanguTracker", JSON.stringify(checkboxes));
  }, [checkboxes]);

  // Rotate daily message every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % dailyMessages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (habit: string, date: string) => {
    const key = `${habit}-${date}`;
    setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const dailyProgress = (date: string) => {
    const checked = habits.filter(h => checkboxes[`${h}-${date}`]).length;
    return (checked / habits.length) * 100;
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

  return (
    <main className="min-h-screen p-6 font-sans relative overflow-hidden bg-gray-900 text-gray-50">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-500 rounded-full opacity-30 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti on 100% */}
      {overallProgress() === 100 && <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />}

      {/* Vision Board */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-10 glass-panel">
        <h1 className="text-5xl font-bold drop-shadow-lg">Dr. Christopher Mahlangu</h1>
        <div className="space-y-1 text-lg font-semibold text-gray-200">
          <p>BSc in Mathematical Sciences (Wits)</p>
          <p>BSc Honours in Mathematics (Wits)</p>
          <p>MSc Applied Mathematics (Harvard)</p>
          <p>PhD Applied Mathematics: Complex Quantum Stochastic Control Systems (Harvard)</p>
        </div>
        <p className="text-xl mt-3 drop-shadow-md">
          Elite Quantitative Researcher | $600K+ Annually | Audi RS Q8 | Range Rover Autobiography
        </p>
        <p className="text-2xl italic text-pink-400 animate-pulse transition-all duration-1000">{dailyMessages[messageIndex]}</p>
      </div>

      {/* Circular Overall Progress */}
      <div className="relative w-48 h-48 mx-auto mb-10">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r="84" stroke="#444" strokeWidth="15" fill="none" />
          <circle
            cx="96"
            cy="96"
            r="84"
            stroke="url(#gradient)"
            strokeWidth="15"
            fill="none"
            strokeDasharray={2 * Math.PI * 84}
            strokeDashoffset={2 * Math.PI * 84 * (1 - overallProgress() / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold drop-shadow-lg">{overallProgress().toFixed(0)}%</span>
          <span className="text-sm text-gray-300">Overall Progress</span>
        </div>
      </div>

      {/* Habit Tracker Table */}
      <div className="overflow-x-auto w-full max-w-6xl mb-10 relative z-10">
        <table className="border-collapse w-full shadow-lg rounded-3xl overflow-hidden glass-panel">
          <thead className="bg-gray-800 bg-opacity-40">
            <tr>
              <th className="sticky top-0 bg-gray-800 bg-opacity-40 z-10 p-2 text-left text-lg">Habit</th>
              {dates.map(date => (
                <th key={date} className="p-2 text-center text-xs rotate-90 origin-bottom">{date}</th>
              ))}
              <th className="sticky top-0 bg-gray-800 bg-opacity-40 z-10 p-2 text-center text-lg">Progress</th>
              <th className="sticky top-0 bg-gray-800 bg-opacity-40 z-10 p-2 text-center text-lg">Streak 🔥</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit} className="border-b border-gray-700 hover:bg-white hover:bg-opacity-10 transition relative">
                <td className="p-2 font-medium text-lg">{habit}</td>
                {dates.map(date => {
                  const key = `${habit}-${date}`;
                  return (
                    <td key={key} className="p-2 text-center relative">
                      <input
                        type="checkbox"
                        className="neon-checkbox w-6 h-6 cursor-pointer accent-gradient hover:scale-125 transition transform duration-300"
                        checked={!!checkboxes[key]}
                        onChange={() => toggle(habit, date)}
                      />
                      {checkboxes[key] && (
                        <span className="absolute -top-1 -right-1 text-pink-400 animate-pulse">✨</span>
                      )}
                    </td>
                  );
                })}
                <td className="p-2 text-center text-lg font-bold">
                  {(
                    habits.filter(h => dates.some(date => checkboxes[`${h}-${date}`])).length /
                    habits.length *
                    100
                  ).toFixed(0)}
                  %
                </td>
                <td className="p-2 text-center text-lg font-semibold">
                  {habitStreak(habit)} {habitStreak(habit) > 0 && <span className="neon-star">⭐</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Motivational Link */}
      <div className="text-center z-10 relative">
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-semibold"
        >
          Need Motivation? Click Here!
        </a>
      </div>

      {/* --- NEON / GLOSSY CSS --- */}
      <style jsx global>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 1rem;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1),
            0 0 40px rgba(236, 72, 153, 0.2);
          transition: all 0.3s ease;
        }

        .neon-checkbox:checked {
          box-shadow: 0 0 10px #ec4899, 0 0 20px #3b82f6;
        }
        .neon-checkbox:hover {
          transform: scale(1.3);
          box-shadow: 0 0 5px #ec4899, 0 0 15px #3b82f6;
        }

        .neon-star {
          text-shadow: 0 0 5px #facc15, 0 0 10px #fcd34d, 0 0 20px #fbbf24;
          animation: pulseStar 1.5s infinite;
        }
        @keyframes pulseStar {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
        }

        .neon-progress {
          box-shadow: 0 0 8px #3b82f6, 0 0 15px #ec4899;
          border-radius: 9999px;
        }

        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradientBackground {
          background-size: 400% 400%;
          animation: gradientBackground 20s ease infinite;
        }
      `}</style>
    </main>
  );
}