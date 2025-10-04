import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, Trophy, Zap } from 'lucide-react';

interface CelebrationEffectsProps {
  trigger: boolean;
  onComplete: () => void;
  type?: 'completion' | 'achievement' | 'milestone';
}

export function CelebrationEffects({ trigger, onComplete, type = 'completion' }: CelebrationEffectsProps) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (trigger) {
      // Generate particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 2,
        icon: [
          <Sparkles key={i} className="w-4 h-4" />,
          <Heart key={i} className="w-4 h-4" />,
          <Star key={i} className="w-4 h-4" />,
          <Trophy key={i} className="w-4 h-4" />,
          <Zap key={i} className="w-4 h-4" />
        ][Math.floor(Math.random() * 5)]
      }));
      
      setParticles(newParticles);

      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
        onComplete();
      }, 3000);
    }
  }, [trigger, onComplete]);

  const getColors = () => {
    switch (type) {
      case 'achievement':
        return ['text-yellow-500', 'text-orange-500', 'text-amber-500'];
      case 'milestone':
        return ['text-purple-500', 'text-pink-500', 'text-indigo-500'];
      default:
        return ['text-green-500', 'text-emerald-500', 'text-teal-500'];
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {trigger && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Main celebration burst */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              {type === 'achievement' ? '🏆' : type === 'milestone' ? '🎉' : '✨'}
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute ${colors[particle.id % colors.length]}`}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0
              }}
              animate={{
                y: particle.y - 200,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}
            >
              {particle.icon}
            </motion.div>
          ))}

          {/* Radial burst effect */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: 100,
                opacity: 0,
                x: Math.cos((i * Math.PI * 2) / 8) * 200,
                y: Math.sin((i * Math.PI * 2) / 8) * 200
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Success message */}
          <motion.div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border text-center">
              <h3 className="font-bold text-lg mb-1">
                {type === 'achievement' ? 'Pencapaian Baru!' : 
                 type === 'milestone' ? 'Milestone Tercapai!' : 
                 'Impian Terwujud!'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {type === 'achievement' ? 'Anda mendapatkan badge baru!' : 
                 type === 'milestone' ? 'Selamat atas pencapaian luar biasa!' : 
                 'Selamat! Satu impian lagi terwujud!'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}