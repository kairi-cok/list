import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-background border-2 border-border focus:border-primary transition-colors duration-200"
        />
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.form>
  );
}