import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Edit2, Trash2, X, Save, MapPin, Trophy, GraduationCap, Heart, Briefcase, Plane, Camera, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { CompletionDialog } from './CompletionDialog';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedDate?: Date;
  proofPhoto?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  targetAge?: number;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completedDate?: Date, proofPhoto?: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleToggle = () => {
    if (!todo.completed) {
      // If marking as complete, show completion dialog
      setShowCompletionDialog(true);
    } else {
      // If marking as incomplete, just toggle
      onToggle(todo.id);
    }
  };

  const handleComplete = (completedDate: Date, proofPhoto?: string, note?: string) => {
    onToggle(todo.id, completedDate, proofPhoto);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      travel: <Plane className="w-4 h-4" />,
      adventure: <MapPin className="w-4 h-4" />,
      career: <Briefcase className="w-4 h-4" />,
      learning: <GraduationCap className="w-4 h-4" />,
      personal: <Heart className="w-4 h-4" />,
      achievement: <Trophy className="w-4 h-4" />,
    };
    return icons[category as keyof typeof icons] || <Heart className="w-4 h-4" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className="w-5 h-5"
          />
        </motion.div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                  autoFocus
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    variant="default"
                    className="px-2 bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleCancel}
                    size="sm"
                    variant="outline"
                    className="px-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getCategoryIcon(todo.category)}
                      <span className="text-xs capitalize">{todo.category}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    {todo.targetAge && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        Target: {todo.targetAge} tahun
                      </span>
                    )}
                  </div>
                  <span
                    className={`transition-all duration-200 ${
                      todo.completed
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  {/* Completion details */}
                  {todo.completed && (todo.completedDate || todo.proofPhoto) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-4">
                        {todo.completedDate && (
                          <div className="flex items-center gap-1 text-green-700 dark:text-green-300">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Selesai: {new Date(todo.completedDate).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                        {todo.proofPhoto && (
                          <div className="flex items-center gap-1 text-green-700 dark:text-green-300">
                            <Camera className="w-4 h-4" />
                            <span className="text-sm">Ada foto bukti</span>
                          </div>
                        )}
                      </div>
                      {todo.proofPhoto && (
                        <div className="mt-2">
                          <img 
                            src={todo.proofPhoto} 
                            alt="Bukti pencapaian" 
                            className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                              // Open image in new tab for full view
                              const newWindow = window.open();
                              if (newWindow) {
                                newWindow.document.write(`<img src="${todo.proofPhoto}" style="max-width:100%;max-height:100%;"/>`);
                              }
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setIsEditing(true)}
                      size="sm"
                      variant="ghost"
                      className="px-2 h-8"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => onDelete(todo.id)}
                      size="sm"
                      variant="ghost"
                      className="px-2 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CompletionDialog
        isOpen={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        onComplete={handleComplete}
        goalText={todo.text}
      />
    </motion.div>
  );
}