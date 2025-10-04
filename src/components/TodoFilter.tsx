import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export type FilterType = 'all' | 'active' | 'completed' | 'travel' | 'adventure' | 'career' | 'learning' | 'personal' | 'achievement';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    total: number;
    active: number;
    completed: number;
    categories: Record<string, number>;
  };
}

export function TodoFilter({ currentFilter, onFilterChange, counts }: TodoFilterProps) {
  const statusFilters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'Semua', count: counts.total },
    { key: 'active', label: 'Belum Tercapai', count: counts.active },
    { key: 'completed', label: 'Tercapai', count: counts.completed },
  ];

  const categoryFilters: { key: FilterType; label: string; emoji: string; count: number }[] = [
    { key: 'travel', label: 'Travel', emoji: '🌍', count: counts.categories.travel || 0 },
    { key: 'adventure', label: 'Adventure', emoji: '🏔️', count: counts.categories.adventure || 0 },
    { key: 'career', label: 'Career', emoji: '💼', count: counts.categories.career || 0 },
    { key: 'learning', label: 'Learning', emoji: '📚', count: counts.categories.learning || 0 },
    { key: 'personal', label: 'Personal', emoji: '❤️', count: counts.categories.personal || 0 },
    { key: 'achievement', label: 'Achievement', emoji: '🏆', count: counts.categories.achievement || 0 },
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Status Filters */}
      <div>
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Status</h4>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          {statusFilters.map((filter) => (
            <motion.div
              key={filter.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                onClick={() => onFilterChange(filter.key)}
                variant={currentFilter === filter.key ? 'default' : 'ghost'}
                size="sm"
                className={`relative transition-all duration-200 ${
                  currentFilter === filter.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-accent'
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 px-1.5 py-0.5 bg-background/20 rounded-full text-xs"
                  >
                    {filter.count}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Kategori</h4>
        <div className="grid grid-cols-2 gap-2">
          {categoryFilters.map((filter) => (
            <motion.div
              key={filter.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => onFilterChange(filter.key)}
                variant={currentFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                className={`w-full justify-start transition-all duration-200 ${
                  currentFilter === filter.key
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <span className="mr-2">{filter.emoji}</span>
                {filter.label}
                {filter.count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto px-1.5 py-0.5 bg-background/20 rounded-full text-xs"
                  >
                    {filter.count}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}