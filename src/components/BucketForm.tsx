import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface BucketFormProps {
  onAddGoal: (text: string, category: string, priority: 'low' | 'medium' | 'high', targetAge?: number) => void;
}

export function BucketForm({ onAddGoal }: BucketFormProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [targetAge, setTargetAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddGoal(
        text.trim(), 
        category, 
        priority, 
        targetAge ? parseInt(targetAge) : undefined
      );
      setText('');
      setTargetAge('');
    }
  };

  const categories = [
    { value: 'travel', label: '🌍 Travel & Places' },
    { value: 'adventure', label: '🏔️ Adventure & Sports' },
    { value: 'career', label: '💼 Career & Business' },
    { value: 'learning', label: '📚 Learning & Skills' },
    { value: 'personal', label: '❤️ Personal & Relationships' },
    { value: 'achievement', label: '🏆 Achievements & Goals' },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Label htmlFor="goal-text" className="block mb-2">Impian atau Tujuan Hidup</Label>
        <Input
          id="goal-text"
          type="text"
          placeholder="Contoh: Mendaki Gunung Everest, Belajar bahasa baru, Keliling dunia..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-background border-2 border-border focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category" className="block mb-2">Kategori</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority" className="block mb-2">Prioritas</Label>
          <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">🟢 Rendah</SelectItem>
              <SelectItem value="medium">🟡 Sedang</SelectItem>
              <SelectItem value="high">🔴 Tinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="target-age" className="block mb-2">Target Umur (Opsional)</Label>
          <Input
            id="target-age"
            type="number"
            placeholder="30"
            value={targetAge}
            onChange={(e) => setTargetAge(e.target.value)}
            min="1"
            max="120"
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambahkan ke Bucket List
        </Button>
      </motion.div>
    </motion.form>
  );
}