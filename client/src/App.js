import React, { useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

// Import Components (The UI Screens)
import LoginPage from './pages/LoginPage';
import IntroCinematic from './components/IntroCinematic';
import DeathScreen from './components/DeathScreen';
import SuccessScreen from './components/SuccessScreen';
import Leaderboard from './components/Leaderboard';

// Import Games (The Puzzles)
import Round1Wire from './game/Round1Wire';
import Round2Caesar from './game/Round2Caesar';
import Round3Valves from './game/Round3Valves';
import Round4Lock from './game/Round4Lock';

export default function LighthouseGame() {
  // --- Game State ---
  const [screen, setScreen] = useState('login'); // 'login', 'intro', 'game', 'death', 'success', 'leaderboard'
  const [username, setUsername] = useState('');
  const [round, setRound] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(null);
  const [roundTimes, setRoundTimes] = useState([]);
  const [failedRound, setFailedRound] = useState(null);

  // --- Actions ---

  const startGame = () => { 
    setScreen('intro'); 
    setRound(0); 
    setRoundTimes([]); 
  };

  const handleIntroComplete = () => { 
    setRoundStartTime(Date.now()); 
    setRound(1); 
    setScreen('game'); 
  };

  const completeRound = () => {
    const now = Date.now();
    const roundTime = (now - roundStartTime) / 1000;
    const newRoundTimes = [...roundTimes, roundTime];
    setRoundTimes(newRoundTimes);
    setRoundStartTime(now);

    if (round === 4) {
      // Game Finished! Save to Backend
      const totalTime = newRoundTimes.reduce((a, b) => a + b, 0);
      
      // Send data to your Node.js server
      axios.post('http://localhost:5000/api/scores', { 
        username, 
        totalTime, 
        roundTimes: newRoundTimes 
      }).catch(console.error);

      setScreen('success');
    } else {
      // Next Round
      setRound(round + 1);
    }
  };

  const failRound = () => { 
    setFailedRound(round); 
    setScreen('death'); 
  };

  const restart = () => { 
    setRound(0); 
    setRoundTimes([]); 
    setFailedRound(null); 
    startGame(); 
  };

  const totalTime = roundTimes.reduce((sum, t) => sum + t, 0);

  // --- Render ---
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        
        {screen === 'login' && (
          <LoginPage key="login" onLogin={(user) => { setUsername(user); startGame(); }} />
        )}

        {screen === 'intro' && (
          <IntroCinematic key="intro" onComplete={handleIntroComplete} />
        )}

        {screen === 'game' && (
          <React.Fragment key={`game-${round}`}>
            {round === 1 && <Round1Wire onComplete={completeRound} onFail={failRound} />}
            {round === 2 && <Round2Caesar onComplete={completeRound} onFail={failRound} />}
            {round === 3 && <Round3Valves onComplete={completeRound} onFail={failRound} />}
            {round === 4 && <Round4Lock onComplete={completeRound} onFail={failRound} />}
          </React.Fragment>
        )}

        {screen === 'death' && (
          <DeathScreen key="death" round={failedRound} onRestart={restart} />
        )}

        {screen === 'success' && (
          <SuccessScreen 
            key="success" 
            totalTime={totalTime} 
            onPlayAgain={restart} 
            onViewLeaderboard={() => setScreen('leaderboard')} 
          />
        )}

        {screen === 'leaderboard' && (
          <Leaderboard key="leaderboard" onBack={() => setScreen('login')} />
        )}

      </AnimatePresence>
    </div>
  );
}