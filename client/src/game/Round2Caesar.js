import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Round2Caesar = ({ onComplete, onFail }) => {
  const targetMessage = "SIGNAL RECEIVED";
  const solutionShifts = [4, 12, 19, 7, 23]; 
  const [bands, setBands] = useState([0, 0, 0, 0, 0]);
  const [attempts, setAttempts] = useState(3);
  const [isSolved, setIsSolved] = useState(false);

  const shiftChar = (char, amount) => {
    if (char === ' ') return ' ';
    const code = char.charCodeAt(0);
    return String.fromCharCode(((code - 65 + amount) % 26) + 65);
  };

  const displayedText = targetMessage.split('').map((char, index) => {
    if (char === ' ') return ' ';
    const bandIndex = index % 5;
    const currentShift = solutionShifts[bandIndex] - bands[bandIndex];
    return shiftChar(char, currentShift + 26);
  }).join('');

  const handleSubmit = () => {
    if (displayedText === targetMessage) {
      setIsSolved(true);
      setTimeout(onComplete, 1500);
    } else {
      setAttempts(prev => {
        const newAttempts = prev - 1;
        if (newAttempts === 0) onFail();
        return newAttempts;
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-[#F4E8C1] p-8">
      <h2 className="text-5xl font-bold mb-4 text-[#1A1A2E]">ROUND 2: PENTA-BAND SIGNAL</h2>
      <p className="text-xl mb-8 text-center">Tune 5 bands to clear the signal.<br /><span className="text-red-600 font-bold">Attempts left: {attempts}</span></p>
      <div className="bg-white p-8 rounded-lg shadow-xl border-4 border-[#8D6E63] max-w-5xl w-full">
        <div className="bg-[#1A1A2E] p-6 rounded-lg mb-8 text-center border-4 border-gray-500 relative overflow-hidden min-h-[120px] flex items-center justify-center">
          <div className="font-mono text-4xl tracking-[0.2em] font-bold flex flex-wrap justify-center gap-1 z-0">
            {displayedText.split('').map((char, i) => {
              const isCorrect = char === targetMessage[i];
              return (
                <motion.span key={i} animate={{ color: isCorrect ? '#4ade80' : '#15803d', filter: isCorrect ? 'blur(0px)' : 'blur(4px)', opacity: isCorrect ? 1 : 0.5 }} transition={{ duration: 0.2 }}>
                  {char}
                </motion.span>
              );
            })}
          </div>
        </div>
        <div className="flex gap-6 justify-center mb-8">
          {bands.map((val, i) => (
            <div key={i} className="flex flex-col items-center w-20">
              <label className="font-bold mb-2 text-[#1A1A2E] bg-gray-200 px-2 rounded text-xs">BAND {i + 1}</label>
              <div className="h-40 bg-gray-200 rounded-full p-2 border-2 border-[#8D6E63] w-12">
                <input type="range" min="0" max="25" value={val} onChange={(e) => { const newBands = [...bands]; newBands[i] = parseInt(e.target.value); setBands(newBands); }} className="h-full appearance-none bg-transparent cursor-pointer" style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', width: '100%' }} />
              </div>
              <div className="font-mono font-bold mt-2 text-xl">{val}</div>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className={`w-full font-bold py-4 rounded text-xl text-white ${isSolved ? 'bg-green-600' : 'bg-[#B8860B]'}`}>{isSolved ? 'LOCKED' : 'ESTABLISH CONNECTION'}</button>
      </div>
    </motion.div>
  );
};
export default Round2Caesar;