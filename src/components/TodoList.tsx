import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TodoItem, Todo } from './TodoItem';
import { FilterType } from './TodoFilter';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string, completedDate?: Date, proofPhoto?: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, filter, onToggle, onEdit, onDelete }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (['travel', 'adventure', 'career', 'learning', 'personal', 'achievement'].includes(filter)) {
      return todo.category === filter;
    }
    return true;
  });

  if (filteredTodos.length === 0) {
    const emptyMessages: Record<FilterType, string> = {
      all: 'Belum ada impian dalam bucket list. Mulai tambahkan impian pertama Anda!',
      active: 'Semua impian sudah tercapai! Waktunya menambah impian baru! 🎉',
      completed: 'Belum ada impian yang tercapai. Terus semangat!',
      travel: 'Belum ada impian travel. Dunia menunggu Anda! 🌍',
      adventure: 'Belum ada petualangan yang diimpikan. Saatnya berani! 🏔️',
      career: 'Belum ada target karier. Wujudkan ambisi profesional Anda! 💼',
      learning: 'Belum ada target pembelajaran. Pengetahuan adalah kekuatan! 📚',
      personal: 'Belum ada goal personal. Investasi terbaik adalah pada diri sendiri! ❤️',
      achievement: 'Belum ada target pencapaian. Raih prestasi impian Anda! 🏆',
    };

    const emptyIcons: Record<FilterType, string> = {
      all: '✨',
      active: '🎯',
      completed: '🏆',
      travel: '🌍',
      adventure: '🏔️',
      career: '💼',
      learning: '📚',
      personal: '❤️',
      achievement: '🏆',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {emptyIcons[filter]}
        </motion.div>
        <p className="text-muted-foreground text-lg">
          {emptyMessages[filter]}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTodos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ 
              duration: 0.2,
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
            layout
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}