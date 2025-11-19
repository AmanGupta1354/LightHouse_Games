import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Round3Valves = ({ onComplete, onFail }) => {
  const [valves, setValves] = useState([50, 50, 50, 50]);
  const [timeLeft, setTimeLeft] = useState(90);
  const targets = [80, 20, 60]; 
  const tolerance = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { onFail(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onFail]);

  const clamp = (num) => Math.min(100, Math.max(0, num));
  const vA = valves[0] - 50, vB = valves[1] - 50, vC = valves[2] - 50, vD = valves[3] - 50;

  const gauges = [
    clamp(50 + vA - vC + (vD * 0.5)), 
    clamp(50 + vB - (vA * 1.2) + (vD * 0.5)), 
    clamp(50 + vC - (vB * 0.5) - vD)  
  ];

  const allCorrect = gauges.every((level, i) => level >= (targets[i] - tolerance) && level <= (targets[i] + tolerance));

  useEffect(() => {
    if (allCorrect) {
      const checkTimer = setTimeout(onComplete, 1500);
      return () => clearTimeout(checkTimer);
    }
  }, [allCorrect, onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-[#F4E8C1] p-8">
      <h2 className="text-5xl font-bold mb-4 text-[#1A1A2E]">ROUND 3: STABILIZE</h2>
      <p className="text-xl mb-8 text-center">Align water levels with targets.<br /><span className={`font-bold ${timeLeft < 30 ? 'text-red-600' : 'text-gray-700'}`}>Time: {timeLeft}s</span></p>
      <div className="flex gap-8 mb-12">
        {gauges.map((level, i) => {
          const target = targets[i];
          const isCorrect = level >= (target - tolerance) && level <= (target + tolerance);
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="relative h-64 w-24 border-4 border-[#1A1A2E] rounded-b-3xl bg-gray-100 overflow-hidden">
                <div className="absolute w-full h-1 bg-red-600 z-20" style={{ bottom: `${target}%` }}></div>
                <div className="absolute w-full bg-green-100 opacity-40 z-10" style={{ bottom: `${target - tolerance}%`, height: `${tolerance * 2}%` }}></div>
                <motion.div className={`absolute bottom-0 w-full transition-all duration-300 ${isCorrect ? 'bg-green-500' : 'bg-blue-500'}`} animate={{ height: `${level}%` }} />
              </div>
              <div className="font-bold mt-2 text-xl">Tank {i + 1}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-8">
        {valves.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <label className="font-bold mb-2">Valve {String.fromCharCode(65 + i)}</label>
            <input type="range" min="0" max="100" value={val} onChange={(e) => { const n = [...valves]; n[i] = parseInt(e.target.value); setValves(n); }} className="h-48 w-4 bg-gray-300 rounded-lg appearance-none cursor-pointer" style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }} />
            <div className="font-mono mt-2">{val}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default Round3Valves;