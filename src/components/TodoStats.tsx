import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Trash2, Target, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ProgressRing } from './ProgressRing';

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
  onClearCompleted: () => void;
}

export function TodoStats({ total, completed, active, onClearCompleted }: TodoStatsProps) {
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Progress Card */}
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Progress Hidup Anda</h3>
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Circle className="w-3 h-3" />
              <span>Total</span>
            </div>
            <motion.span
              className="font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {total}
            </motion.span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
              <Circle className="w-3 h-3" />
              <span>Belum Tercapai</span>
            </div>
            <motion.span
              className="font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {active}
            </motion.span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Tercapai</span>
            </div>
            <motion.span
              className="font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {completed}
            </motion.span>
          </div>
        </div>
      </Card>

      {/* Clear Completed Button */}
      {completed > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={onClearCompleted}
            variant="outline"
            size="sm"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus {completed} Impian Tercapai
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}