import React from 'react';
import { motion } from 'framer-motion';

const DeathScreen = ({ round, onRestart }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#1A1A2E] flex items-center justify-center z-50 text-center">
    <div>
      <div className="text-9xl mb-8">💀</div>
      <h1 className="text-6xl font-bold text-red-600 mb-4">THE LIGHT HAS FAILED</h1>
      <p className="text-2xl text-gray-300 mb-8">Defeated in Round {round}</p>
      <button onClick={onRestart} className="bg-[#B8860B] text-white font-bold py-4 px-12 rounded text-xl">TRY AGAIN</button>
    </div>
  </motion.div>
);
export default DeathScreen;