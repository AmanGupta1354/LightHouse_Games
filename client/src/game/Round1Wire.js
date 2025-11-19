import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Round1Wire = ({ onComplete, onFail }) => {
  const wires = ['red', 'blue', 'yellow', 'green', 'black'];
  const [ports, setPorts] = useState([...wires].sort(() => Math.random() - 0.5));
  const [connections, setConnections] = useState({});
  const [dragging, setDragging] = useState(null);
  const [attempts, setAttempts] = useState(3);
  const [shaking, setShaking] = useState(false);
  const [timer, setTimer] = useState(2);

  useEffect(() => {
    if (Object.keys(connections).length === wires.length) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setPorts(current => [...current].sort(() => Math.random() - 0.5));
          return 2;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [connections, wires.length]);

  const handleDrop = (wire, port) => {
    setDragging(null);
    if (wire === port) {
      setConnections(prev => ({ ...prev, [wire]: port }));
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts === 0) onFail();
    }
  };

  useEffect(() => {
    if (Object.keys(connections).length === wires.length) setTimeout(onComplete, 800);
  }, [connections, onComplete, wires.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, x: shaking ? [-10, 10, -10, 10, 0] : 0 }} className="flex flex-col items-center justify-center min-h-screen bg-[#F4E8C1] p-8">
      <h2 className="text-5xl font-bold mb-4 text-[#1A1A2E]">ROUND 1: UNSTABLE GRID</h2>
      <p className="text-xl mb-4 text-center">Connect wires before ports re-route!<br /><span className="text-red-600 font-bold">Re-routing in: {timer}s</span> | <span className="text-red-800 font-bold">Life: {attempts}</span></p>
      <div className="flex gap-32 relative">
        <div className="space-y-6">
          {wires.map(wire => (
            <motion.div key={wire} draggable={!connections[wire]} onDragStart={() => setDragging(wire)} whileHover={{ scale: 1.05 }}
              className={`w-32 h-12 rounded-lg flex items-center justify-center font-bold text-white shadow-md cursor-move border-2 border-black ${connections[wire] ? 'opacity-50' : ''}`}
              style={{ backgroundColor: wire }}>{wire.toUpperCase()}</motion.div>
          ))}
        </div>
        <div className="space-y-6 relative">
          {ports.map(port => {
             const isConnected = Object.values(connections).includes(port);
             return (
              <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} key={port} onDragOver={(e) => e.preventDefault()} onDrop={() => dragging && handleDrop(dragging, port)}
                className="w-32 h-12 rounded-lg flex items-center justify-center font-bold transition-colors duration-300"
                style={{ backgroundColor: isConnected ? port : 'white', border: `4px solid ${port}`, color: isConnected ? 'white' : 'black' }}>
                {isConnected ? 'LOCKED' : port.toUpperCase()}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
export default Round1Wire;