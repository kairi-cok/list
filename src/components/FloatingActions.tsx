import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Sparkles, Target, Calendar, Award, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FloatingActionsProps {
  onQuickAdd: () => void;
  onScrollToTop: () => void;
  showScrollTop: boolean;
  completedToday: number;
}

export function FloatingActions({ onQuickAdd, onScrollToTop, showScrollTop, completedToday }: FloatingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      id: 'add',
      icon: <Plus className="w-4 h-4" />,
      label: 'Tambah Impian',
      onClick: onQuickAdd,
      color: 'bg-primary hover:bg-primary/90'
    },
    {
      id: 'inspiration',
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Inspirasi Hari Ini',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'achievements',
      icon: <Award className="w-4 h-4" />,
      label: 'Pencapaian',
      onClick: () => {
        // Navigate to achievements view
        const achievementSection = document.querySelector('[data-view="analytics"]');
        if (achievementSection) {
          achievementSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      color: 'bg-yellow-500 hover:bg-yellow-600'
    }
  ];

  return (
    <>
      {/* Main Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
            
            {/* Completion indicator */}
            {completedToday > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
              >
                {completedToday}
              </motion.div>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="p-3 shadow-lg border-border/50 backdrop-blur-sm bg-background/95">
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => {
                        action.onClick();
                        setIsOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-10"
                    >
                      <div className={`p-1.5 rounded-lg ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={onScrollToTop}
                variant="outline"
                className="w-12 h-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Progress Indicator */}
      {completedToday > 0 && (
        <motion.div
          className="fixed top-24 right-6 z-40"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <Card className="p-3 shadow-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-500 rounded-full">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-green-700 dark:text-green-300">
                  {completedToday} impian tercapai hari ini!
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Luar biasa! 🎉
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Background overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}