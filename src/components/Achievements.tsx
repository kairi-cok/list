import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, Trophy, Crown, Target, Calendar, Zap, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Todo } from './TodoItem';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  unlocked: boolean;
  category: 'completion' | 'consistency' | 'diversity' | 'speed' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsProps {
  todos: Todo[];
  achievements: string[];
}

export function Achievements({ todos, achievements }: AchievementsProps) {
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const categories = new Set(todos.map(todo => todo.category)).size;
  const highPriorityCompleted = todos.filter(todo => todo.completed && todo.priority === 'high').length;
  const thisWeekCompleted = todos.filter(todo => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return todo.completed && new Date(todo.createdAt) >= weekAgo;
  }).length;

  const allAchievements: Achievement[] = [
    // Completion Achievements
    {
      id: 'first_goal',
      title: 'Langkah Pertama',
      description: 'Menyelesaikan impian pertama Anda',
      icon: <Star className="w-6 h-6" />,
      requirement: 1,
      current: completed,
      unlocked: completed >= 1,
      category: 'completion',
      rarity: 'common'
    },
    {
      id: 'goal_hunter',
      title: 'Pemburu Impian',
      description: 'Menyelesaikan 5 impian',
      icon: <Target className="w-6 h-6" />,
      requirement: 5,
      current: completed,
      unlocked: completed >= 5,
      category: 'completion',
      rarity: 'common'
    },
    {
      id: 'dream_achiever',
      title: 'Pewujud Mimpi',
      description: 'Menyelesaikan 10 impian',
      icon: <Trophy className="w-6 h-6" />,
      requirement: 10,
      current: completed,
      unlocked: completed >= 10,
      category: 'completion',
      rarity: 'rare'
    },
    {
      id: 'legend',
      title: 'Legenda Hidup',
      description: 'Menyelesaikan 25 impian',
      icon: <Crown className="w-6 h-6" />,
      requirement: 25,
      current: completed,
      unlocked: completed >= 25,
      category: 'completion',
      rarity: 'legendary'
    },

    // Diversity Achievements
    {
      id: 'explorer',
      title: 'Penjelajah',
      description: 'Memiliki impian di 3 kategori berbeda',
      icon: <Award className="w-6 h-6" />,
      requirement: 3,
      current: categories,
      unlocked: categories >= 3,
      category: 'diversity',
      rarity: 'common'
    },
    {
      id: 'renaissance',
      title: 'Renaissance Soul',
      description: 'Memiliki impian di semua 6 kategori',
      icon: <Heart className="w-6 h-6" />,
      requirement: 6,
      current: categories,
      unlocked: categories >= 6,
      category: 'diversity',
      rarity: 'epic'
    },

    // Priority Achievements
    {
      id: 'prioritizer',
      title: 'Fokus Tinggi',
      description: 'Menyelesaikan 3 impian prioritas tinggi',
      icon: <Zap className="w-6 h-6" />,
      requirement: 3,
      current: highPriorityCompleted,
      unlocked: highPriorityCompleted >= 3,
      category: 'milestone',
      rarity: 'rare'
    },

    // Speed Achievements
    {
      id: 'speed_demon',
      title: 'Pelaju Impian',
      description: 'Menyelesaikan 3 impian dalam seminggu',
      icon: <Zap className="w-6 h-6" />,
      requirement: 3,
      current: thisWeekCompleted,
      unlocked: thisWeekCompleted >= 3,
      category: 'speed',
      rarity: 'epic'
    },

    // Milestone Achievements
    {
      id: 'planner',
      title: 'Perencana Ulung',
      description: 'Membuat 10 impian dengan target umur',
      icon: <Calendar className="w-6 h-6" />,
      requirement: 10,
      current: todos.filter(todo => todo.targetAge).length,
      unlocked: todos.filter(todo => todo.targetAge).length >= 10,
      category: 'milestone',
      rarity: 'rare'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityName = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'Umum';
      case 'rare': return 'Langka';
      case 'epic': return 'Epik';
      case 'legendary': return 'Legendaris';
      default: return 'Umum';
    }
  };

  const unlockedAchievements = allAchievements.filter(a => a.unlocked);
  const lockedAchievements = allAchievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Achievements Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Pencapaian & Badge</h2>
        </div>
        <p className="text-muted-foreground">
          Raih pencapaian istimewa dalam perjalanan mewujudkan impian Anda
        </p>
      </motion.div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{unlockedAchievements.length}</div>
          <div className="text-sm text-muted-foreground">Terbuka</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-muted-foreground">{lockedAchievements.length}</div>
          <div className="text-sm text-muted-foreground">Terkunci</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {unlockedAchievements.filter(a => a.rarity === 'epic' || a.rarity === 'legendary').length}
          </div>
          <div className="text-sm text-muted-foreground">Langka</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round((unlockedAchievements.length / allAchievements.length) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">Completion</div>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Pencapaian Terbuka ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-4 relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  {/* Shine effect for legendary */}
                  {achievement.rarity === 'legendary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-pulse" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-primary">{achievement.icon}</div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {getRarityName(achievement.rarity)}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="flex-1 h-2" />
                      <span className="text-xs font-medium text-green-600">
                        ✓ {achievement.current}/{achievement.requirement}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-muted-foreground" />
            Pencapaian Terkunci ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-4 opacity-75 border-dashed">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-muted-foreground">{achievement.icon}</div>
                    <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                      {getRarityName(achievement.rarity)}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium mb-2 text-muted-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(achievement.current / achievement.requirement) * 100} 
                      className="flex-1 h-2" 
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {achievement.current}/{achievement.requirement}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6 bg-gradient-to-r from-accent/50 to-accent/30">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Tips Meraih Pencapaian
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>• <strong>Konsistensi:</strong> Selesaikan impian secara rutin untuk pencapaian speed</li>
              <li>• <strong>Diversitas:</strong> Jelajahi berbagai kategori untuk unlock badge explorer</li>
              <li>• <strong>Prioritas:</strong> Fokus pada impian prioritas tinggi untuk badge khusus</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Perencanaan:</strong> Set target umur untuk achievement planner</li>
              <li>• <strong>Persistence:</strong> Terus tambahkan impian baru untuk milestone</li>
              <li>• <strong>Celebrasi:</strong> Rayakan setiap pencapaian yang Anda dapatkan!</li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}