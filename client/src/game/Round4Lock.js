import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Round4Lock = ({ onComplete, onFail }) => {
  const [code, setCode] = useState([0, 0, 0, 0]);
  const [attempts, setAttempts] = useState(3);
  
  const handleSubmit = () => {
    if (JSON.stringify(code) === JSON.stringify([3, 6, 3, 3])) onComplete();
    else {
      setAttempts(prev => {
        const newAttempts = prev - 1;
        if (newAttempts === 0) onFail();
        return newAttempts;
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-[#F4E8C1] p-8">
      <h2 className="text-5xl font-bold mb-4 text-[#1A1A2E]">ROUND 4: UNLOCK</h2>
      <p className="text-xl mb-8 text-center">Solve the clues<br /><span className="text-red-600 font-bold">Attempts left: {attempts}</span></p>
      <div className="bg-white p-8 rounded-lg shadow-xl border-4 border-[#8D6E63] max-w-2xl">
        <div className="mb-8 bg-[#F4E8C1] p-6 rounded border-2 border-[#8D6E63]">
          <p className="mb-2">• First digit is prime and less than 5</p>
          <p className="mb-2">• Second digit is double the third</p>
          <p className="mb-2">• All digits sum to 15</p>
          <p className="mb-2">• Last digit is odd</p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {code.map((digit, i) => (
            <input key={i} type="number" min="0" max="9" value={digit} onChange={(e) => { const n = [...code]; n[i] = parseInt(e.target.value) || 0; setCode(n); }} className="w-20 h-20 text-center text-4xl font-bold border-4 border-[#8D6E63] rounded" />
          ))}
        </div>
        <button onClick={handleSubmit} className="w-full bg-[#B8860B] hover:bg-[#8D6E63] text-white font-bold py-4 rounded text-xl">UNLOCK</button>
      </div>
    </motion.div>
  );
};

export default Round4Lock;