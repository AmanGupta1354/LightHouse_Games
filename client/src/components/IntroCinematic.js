import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroCinematic = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#1A1A2E] flex items-center justify-center z-50">
      <div className="text-center max-w-2xl px-8">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-9xl mb-8">💡</motion.div>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-4xl font-bold text-[#FFB347] mb-4">THE LIGHTHOUSE KEEPER'S FINAL NIGHT</motion.h1>
      </div>
    </motion.div>
  );
};
export default IntroCinematic;