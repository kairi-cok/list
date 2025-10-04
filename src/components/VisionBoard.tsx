import React from 'react';
import { motion } from 'motion/react';
import { Plus, Eye, Target, Calendar, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Todo } from './TodoItem';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VisionBoardProps {
  todos: Todo[];
  onToggle: (id: string, completedDate?: Date, proofPhoto?: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function VisionBoard({ todos, onToggle, onEdit, onDelete }: VisionBoardProps) {
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

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="space-y-6">
      {/* Vision Board Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Eye className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Papan Visi Hidupku</h2>
        </div>
        <p className="text-muted-foreground">
          Visualisasikan impian Anda untuk motivasi yang lebih kuat
        </p>
      </motion.div>

      {/* Dreams Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Impian yang Belum Tercapai ({incompleteTodos.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incompleteTodos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-4 h-48 relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
                
                {/* Category Icon */}
                <div className="absolute top-3 left-3">
                  <span className="text-3xl">{getCategoryEmoji(todo.category)}</span>
                </div>

                {/* Priority Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant={getPriorityColor(todo.priority)} className="text-xs">
                    {todo.priority === 'high' ? 'Prioritas Tinggi' : 
                     todo.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                  </Badge>
                </div>

                {/* Goal Text */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <p className="font-medium text-center px-2 line-clamp-3">
                    {todo.text}
                  </p>
                  
                  {/* Target Age */}
                  {todo.targetAge && (
                    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Target Umur: {todo.targetAge}
                    </div>
                  )}
                </div>

                {/* Actions on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => onToggle(todo.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ✓ Selesai
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {/* Add New Goal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: incompleteTodos.length * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-4 h-48 border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all duration-300 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p>Tambah Impian Baru</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Achievements Section */}
      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Impian yang Sudah Tercapai ({completedTodos.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {completedTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getCategoryEmoji(todo.category)}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Tercapai
                    </Badge>
                  </div>
                  <p className="text-sm font-medium line-clamp-2">{todo.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Diselesaikan • {todo.createdAt.toLocaleDateString('id-ID')}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}