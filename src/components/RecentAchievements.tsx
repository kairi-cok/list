import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, Camera } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Todo } from './TodoItem';

interface RecentAchievementsProps {
  todos: Todo[];
}

export function RecentAchievements({ todos }: RecentAchievementsProps) {
  // Get completed todos sorted by completion date (most recent first)
  const recentAchievements = todos
    .filter(todo => todo.completed && todo.completedDate)
    .sort((a, b) => {
      const dateA = a.completedDate ? new Date(a.completedDate).getTime() : 0;
      const dateB = b.completedDate ? new Date(b.completedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5); // Show only last 5 achievements

  if (recentAchievements.length === 0) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      travel: 'bg-blue-500',
      adventure: 'bg-orange-500',
      career: 'bg-purple-500',
      learning: 'bg-green-500',
      personal: 'bg-pink-500',
      achievement: 'bg-yellow-500',
    };
    return colors[category as keyof typeof colors] || colors.achievement;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-medium">Pencapaian Terbaru</h3>
        </div>
        
        <div className="space-y-3">
          {recentAchievements.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${getCategoryColor(todo.category)}`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {todo.text}
                </p>
                
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {todo.category}
                  </Badge>
                  
                  {todo.completedDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(todo.completedDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  
                  {todo.proofPhoto && (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <Camera className="w-3 h-3" />
                      <span>Foto</span>
                    </div>
                  )}
                </div>
              </div>
              
              {todo.proofPhoto && (
                <img 
                  src={todo.proofPhoto} 
                  alt="Achievement proof" 
                  className="w-10 h-10 object-cover rounded border flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    const newWindow = window.open();
                    if (newWindow) {
                      newWindow.document.write(`<img src="${todo.proofPhoto}" style="max-width:100%;max-height:100%;"/>`);
                    }
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {todos.filter(todo => todo.completed).length > 5 && (
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              Dan {todos.filter(todo => todo.completed).length - 5} pencapaian lainnya...
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}