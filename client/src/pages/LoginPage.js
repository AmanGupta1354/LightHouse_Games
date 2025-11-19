import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (username.length < 3) return setError('Username must be at least 3 characters');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    try {
      const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
      const res = await axios.post(endpoint, { username, password });
      onLogin(res.data.username);
    } catch (err) {
      setError(err.response?.data?.message || "Connection failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E8C1] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full border-4 border-[#8D6E63]">
        <h1 className="text-3xl font-bold text-center mb-1 text-[#1A1A2E]">SAVE THE LIGHTHOUSE</h1>
        <p className="text-center text-gray-600 mb-4 text-sm">The storm rages. The light fails.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><label className="block text-sm font-bold mb-2">Username</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-[#8D6E63] rounded" /></div>
          <div><label className="block text-sm font-bold mb-2">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-[#8D6E63] rounded" /></div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" className="w-full bg-[#B8860B] text-white font-bold py-3 rounded">{isRegister ? 'REGISTER' : 'ENTER'}</button>
          <div className="text-center"><button type="button" onClick={() => setIsRegister(!isRegister)} className="text-sm text-[#4A5F7F] hover:underline">{isRegister ? 'Login' : 'Register'}</button></div>
        </form>
      </motion.div>
    </div>
  );
};
export default LoginPage;