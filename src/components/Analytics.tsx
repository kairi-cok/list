import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Target, TrendingUp, Calendar, Award, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Todo } from './TodoItem';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsProps {
  todos: Todo[];
}

export function Analytics({ todos }: AnalyticsProps) {
  // Calculate statistics
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  // Category analysis
  const categoryStats = todos.reduce((acc, todo) => {
    const cat = todo.category;
    if (!acc[cat]) {
      acc[cat] = { total: 0, completed: 0 };
    }
    acc[cat].total++;
    if (todo.completed) acc[cat].completed++;
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const categoryData = Object.entries(categoryStats).map(([category, stats]) => ({
    name: category,
    total: stats.total,
    completed: stats.completed,
    rate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
  }));

  // Priority analysis
  const priorityStats = todos.reduce((acc, todo) => {
    const priority = todo.priority;
    if (!acc[priority]) {
      acc[priority] = { total: 0, completed: 0 };
    }
    acc[priority].total++;
    if (todo.completed) acc[priority].completed++;
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const priorityData = [
    { name: 'Tinggi', value: priorityStats.high?.total || 0, color: '#ef4444' },
    { name: 'Sedang', value: priorityStats.medium?.total || 0, color: '#f59e0b' },
    { name: 'Rendah', value: priorityStats.low?.total || 0, color: '#10b981' }
  ];

  // Age target analysis
  const currentAge = 25; // This could be dynamic
  const ageTargets = todos
    .filter(todo => todo.targetAge && !todo.completed)
    .map(todo => ({
      goal: todo.text,
      yearsLeft: todo.targetAge! - currentAge,
      priority: todo.priority,
      category: todo.category
    }))
    .sort((a, b) => a.yearsLeft - b.yearsLeft);

  // Monthly progress (last 6 months)
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const monthCompleted = todos.filter(todo => 
      todo.completed && 
      new Date(todo.createdAt) >= monthStart && 
      new Date(todo.createdAt) <= monthEnd
    ).length;

    monthlyData.push({
      month: date.toLocaleDateString('id-ID', { month: 'short' }),
      completed: monthCompleted
    });
  }

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

  const getCategoryName = (category: string) => {
    const nameMap: Record<string, string> = {
      travel: 'Travel & Places',
      adventure: 'Adventure & Sports',
      career: 'Career & Business',
      learning: 'Learning & Skills',
      personal: 'Personal & Relationships',
      achievement: 'Achievements & Goals'
    };
    return nameMap[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
        </div>
        <p className="text-muted-foreground">
          Analisis mendalam tentang perjalanan mewujudkan impian Anda
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-sm text-muted-foreground">Total Impian</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{completed}</p>
                <p className="text-sm text-muted-foreground">Tercapai</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{completionRate.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Tingkat Completion</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{total - completed}</p>
                <p className="text-sm text-muted-foreground">Dalam Progress</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribusi Prioritas</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, value}) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Progress */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progress 6 Bulan Terakhir</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performa per Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#e2e8f0" name="Total" />
                <Bar dataKey="completed" fill="#10b981" name="Tercapai" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Target Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Target Terdekat
          </h3>
          <div className="space-y-3">
            {ageTargets.slice(0, 5).map((target, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getCategoryEmoji(target.category)}</span>
                  <div>
                    <p className="font-medium line-clamp-1">{target.goal}</p>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryName(target.category)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={target.yearsLeft <= 2 ? 'destructive' : 'secondary'}>
                    {target.yearsLeft <= 0 ? 'Terlambat' : `${target.yearsLeft} tahun lagi`}
                  </Badge>
                </div>
              </div>
            ))}
            {ageTargets.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Belum ada target waktu yang ditetapkan
              </p>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
          <h3 className="text-lg font-semibold mb-4">💡 Insights & Rekomendasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Kategori Favorit:</strong> {categoryData.length > 0 ? getCategoryName(categoryData.reduce((a, b) => a.total > b.total ? a : b).name) : 'Belum ada'}</p>
              <p><strong>Tingkat Completion:</strong> {completionRate >= 70 ? '🎉 Sangat Baik!' : completionRate >= 50 ? '👍 Baik' : '💪 Perlu Ditingkatkan'}</p>
              <p><strong>Fokus Prioritas:</strong> {priorityStats.high?.total > 0 ? `${priorityStats.high.total} impian prioritas tinggi` : 'Tidak ada prioritas tinggi'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Target Terdekat:</strong> {ageTargets.length > 0 ? `${ageTargets[0].yearsLeft} tahun lagi` : 'Belum ada target'}</p>
              <p><strong>Rekomendasi:</strong> {completionRate < 30 ? 'Fokus pada impian prioritas tinggi' : completionRate < 70 ? 'Tingkatkan konsistensi' : 'Pertahankan momentum!'}</p>
              <p><strong>Diversitas:</strong> {Object.keys(categoryStats).length} dari 6 kategori terisi</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}