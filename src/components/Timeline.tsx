import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle, Circle, Calendar, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Todo } from './TodoItem';

interface TimelineProps {
  todos: Todo[];
  onToggle: (id: string) => void;
}

export function Timeline({ todos, onToggle }: TimelineProps) {
  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      travel: '🌍',
      adventure: '🏔️', 
      career: '💼',
      learning: '📚',
      personal: '❤️',
      achievement: '🏆'
    };
    return emojiMap[category] || '🎯';
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  // Sort todos by target age, then by creation date
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.targetAge && b.targetAge) {
      return a.targetAge - b.targetAge;
    }
    if (a.targetAge && !b.targetAge) return -1;
    if (!a.targetAge && b.targetAge) return 1;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const currentYear = new Date().getFullYear();
  const currentAge = 25; // This could be dynamic based on user profile

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Timeline Perjalanan Hidup</h2>
        </div>
        <p className="text-muted-foreground">
          Lihat perkembangan impian Anda sepanjang waktu
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-6">
          {sortedTodos.map((todo, index) => {
            const isCompleted = todo.completed;
            const targetYear = todo.targetAge ? currentYear + (todo.targetAge - currentAge) : undefined;
            const isPast = targetYear ? targetYear < currentYear : false;
            const isNear = targetYear ? targetYear <= currentYear + 2 : false;

            return (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500' 
                      : isNear 
                        ? 'bg-yellow-500 border-yellow-500'
                        : 'bg-background border-border'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <Card className={`flex-1 p-4 ${isCompleted ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getCategoryEmoji(todo.category)}</span>
                        <Badge variant={getPriorityColor(todo.priority)} className="text-xs">
                          {todo.priority === 'high' ? 'Tinggi' : 
                           todo.priority === 'medium' ? 'Sedang' : 'Rendah'}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            ✓ Tercapai
                          </Badge>
                        )}
                        {isNear && !isCompleted && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                            ⚠️ Segera
                          </Badge>
                        )}
                      </div>

                      <h3 className={`font-medium mb-2 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.text}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {todo.targetAge ? (
                            <span>Target: Umur {todo.targetAge} ({targetYear})</span>
                          ) : (
                            <span>Tanpa target waktu</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span className="capitalize">{todo.category}</span>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      {todo.targetAge && !isCompleted && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress menuju target</span>
                            <span>{Math.max(0, Math.min(100, ((currentAge - 20) / (todo.targetAge - 20)) * 100)).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                isNear ? 'bg-yellow-500' : 'bg-primary'
                              }`}
                              style={{ 
                                width: `${Math.max(0, Math.min(100, ((currentAge - 20) / (todo.targetAge - 20)) * 100))}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isCompleted && (
                      <Button
                        size="sm"
                        onClick={() => onToggle(todo.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        ✓ Tandai Selesai
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Future milestone marker */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: sortedTodos.length * 0.1 }}
          className="relative flex items-start gap-6 mt-8"
        >
          <div className="relative z-10 flex-shrink-0">
            <div className="w-8 h-8 rounded-full border-4 border-dashed border-primary bg-background flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
          </div>
          <Card className="flex-1 p-4 border-dashed border-primary/50">
            <div className="text-center">
              <h3 className="font-medium text-primary">Impian Masa Depan</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tempat untuk impian-impian baru yang akan datang...
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}