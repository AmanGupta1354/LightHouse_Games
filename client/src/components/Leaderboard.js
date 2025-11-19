import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { formatTime } from '../utils/formatTime';

const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/scores').then(res => setScores(res.data)).catch(console.error);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F4E8C1] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-8 text-[#1A1A2E]">HALL OF FAME</h1>
        <div className="bg-white rounded-lg shadow-xl border-4 border-[#8D6E63] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#B8860B] text-white">
              <tr><th className="p-4 text-left">Rank</th><th className="p-4 text-left">Keeper</th><th className="p-4 text-left">Time</th></tr>
            </thead>
            <tbody>
              {scores.map((score, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold">{i + 1}</td>
                  <td className="p-4">{score.username}</td>
                  <td className="p-4 font-mono">{formatTime(score.totalTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <button onClick={onBack} className="bg-[#B8860B] text-white font-bold py-4 px-12 rounded text-xl">BACK TO GAME</button>
        </div>
      </div>
    </motion.div>
  );
};
export default Leaderboard;