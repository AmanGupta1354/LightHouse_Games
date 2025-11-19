import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../utils/formatTime';

const SuccessScreen = ({ totalTime, onPlayAgain, onViewLeaderboard }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#1A1A2E] flex items-center justify-center z-50 text-center">
    <div>
      <div className="text-9xl mb-8">💡</div>
      <h1 className="text-6xl font-bold text-[#FFB347] mb-4">LIGHTHOUSE SAVED!</h1>
      <p className="text-3xl text-white mb-8">Time: {formatTime(totalTime)}</p>
      <div className="flex gap-4 justify-center">
        <button onClick={onPlayAgain} className="bg-[#B8860B] text-white font-bold py-4 px-8 rounded text-xl">PLAY AGAIN</button>
        <button onClick={onViewLeaderboard} className="bg-[#4A5F7F] text-white font-bold py-4 px-8 rounded text-xl">LEADERBOARD</button>
      </div>
    </div>
  </motion.div>
);
export default SuccessScreen;