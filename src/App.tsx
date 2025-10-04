import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Moon, Sun, Search, Grid3X3, Calendar, Award, Share2, Download, Upload, BarChart3, Sparkles, Target } from 'lucide-react';
import { BucketForm } from './components/BucketForm';
import { TodoList } from './components/TodoList';
import { TodoFilter, FilterType } from './components/TodoFilter';
import { TodoStats } from './components/TodoStats';
import { Todo } from './components/TodoItem';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Progress } from './components/ui/progress';
import { VisionBoard } from './components/VisionBoard';
import { Timeline } from './components/Timeline';
import { Analytics } from './components/Analytics';
import { GoalTemplates } from './components/GoalTemplates';
import { Achievements } from './components/Achievements';
import { DynamicQuotes } from './components/DynamicQuotes';
import { FloatingActions } from './components/FloatingActions';
import { RecentAchievements } from './components/RecentAchievements';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'vision' | 'timeline' | 'analytics'>('list');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          completedDate: todo.completedDate ? new Date(todo.completedDate) : undefined,
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (!savedTheme && systemDark));
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for completed goals today
  const completedToday = todos.filter(todo => {
    if (!todo.completed) return false;
    const today = new Date();
    const todoDate = new Date(todo.createdAt);
    return todoDate.toDateString() === today.toDateString();
  }).length;

  const addGoal = (text: string, category: string, priority: 'low' | 'medium' | 'high', targetAge?: number) => {
    const newGoal: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      category,
      priority,
      targetAge,
    };
    setTodos([newGoal, ...todos]);
  };

  const toggleTodo = (id: string, completedDate?: Date, proofPhoto?: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const wasCompleted = todo.completed;
        const isNowCompleted = !wasCompleted;
        
        return {
          ...todo,
          completed: isNowCompleted,
          completedDate: isNowCompleted ? (completedDate || new Date()) : undefined,
          proofPhoto: isNowCompleted ? proofPhoto : undefined
        };
      }
      return todo;
    }));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Search and filter functionality
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         todo.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Export functionality
  const exportData = () => {
    const data = {
      todos,
      achievements,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `list-hidupku-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import functionality
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.todos && Array.isArray(data.todos)) {
            const importedTodos = data.todos.map((todo: any) => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
            }));
            setTodos(importedTodos);
            if (data.achievements) {
              setAchievements(data.achievements);
            }
          }
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Template handler
  const handleAddTemplate = (template: any) => {
    addGoal(template.title, template.category, template.priority, template.targetAge);
  };

  // Quick actions
  const handleQuickAdd = () => {
    setShowQuickAdd(true);
    // Scroll to form
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  // Count by categories
  const categories = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const counts = { total, active, completed, categories };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/30 dark:to-indigo-950/50">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-30" />
              <Heart className="w-12 h-12 text-primary relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                List Hidupku
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wide">Your Dreams, Your Journey</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Wujudkan impian terbesar Anda dengan perencanaan yang terstruktur dan tracking yang elegan
          </motion.p>
          
          {/* Action Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={toggleTheme} variant="outline" size="sm" className="gap-2 glass border-white/20 hover:bg-white/20">
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </>
                )}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={exportData} variant="outline" size="sm" className="gap-2 glass border-white/20 hover:bg-white/20">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => document.getElementById('import-file')?.click()}
                variant="outline"
                size="sm"
                className="gap-2 glass border-white/20 hover:bg-white/20"
              >
                <Upload className="w-4 h-4" />
                Import Data
              </Button>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </motion.div>
            
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="gap-2 glass border-white/20 hover:bg-white/20">
                    <Share2 className="w-4 h-4" />
                    Share Progress
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Bagikan Pencapaian Anda
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {completed}/{total}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Impian tercapai</p>
                    <div className="flex justify-center">
                      <Progress value={total > 0 ? (completed/total)*100 : 0} className="w-32" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">{achievements.length}</div>
                      <div className="text-xs text-muted-foreground">Achievement</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">{completedToday}</div>
                      <div className="text-xs text-muted-foreground">Hari ini</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Search and Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="p-6 glass border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Cari impian atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/50 dark:bg-slate-800/50 border-white/20 focus:border-primary/50 rounded-xl"
                />
              </div>
              
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
                <TabsList className="grid w-full grid-cols-4 h-12 bg-white/20 dark:bg-slate-800/20">
                  <TabsTrigger value="list" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    <Grid3X3 className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </TabsTrigger>
                  <TabsTrigger value="vision" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    <Target className="w-4 h-4" />
                    <span className="hidden sm:inline">Vision</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline">Timeline</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {viewMode === 'list' && (
              <div className="grid xl:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="xl:col-span-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="p-6 glass border-white/20 shadow-xl">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Grid3X3 className="w-5 h-5 text-primary" />
                        Filter Impian
                      </h3>
                      <TodoFilter
                        currentFilter={filter}
                        onFilterChange={setFilter}
                        counts={counts}
                      />
                    </Card>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <TodoStats
                      total={total}
                      completed={completed}
                      active={active}
                      onClearCompleted={clearCompleted}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <RecentAchievements todos={todos} />
                  </motion.div>
                </div>

                {/* Main Content */}
                <div className="xl:col-span-3 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="p-8 glass border-white/20 shadow-xl">
                      <BucketForm onAddGoal={addGoal} />
                      <div className="mt-8">
                        <TodoList
                          todos={searchQuery ? filteredTodos : todos}
                          filter={filter}
                          onToggle={toggleTodo}
                          onEdit={editTodo}
                          onDelete={deleteTodo}
                        />
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            )}

            {viewMode === 'vision' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <VisionBoard
                  todos={searchQuery ? filteredTodos : todos}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                />
              </motion.div>
            )}

            {viewMode === 'timeline' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Timeline
                  todos={searchQuery ? filteredTodos : todos}
                  onToggle={toggleTodo}
                />
              </motion.div>
            )}

            {viewMode === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="grid gap-8"
              >
                <Analytics todos={todos} />
                <Achievements todos={todos} achievements={achievements} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16"
        >
          <Card className="p-8 glass border-white/20 shadow-xl">
            <GoalTemplates onAddTemplate={handleAddTemplate} />
          </Card>
        </motion.div>

        {/* Inspirational Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <DynamicQuotes />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <Card className="p-8 glass border-white/20 shadow-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Tips Mewujudkan Impian
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Visualisasi Harian</p>
                    <p className="text-xs text-muted-foreground">Bayangkan impian Anda tercapai setiap hari</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Langkah Kecil</p>
                    <p className="text-xs text-muted-foreground">Pecah impian besar menjadi aksi yang realistis</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Deadline Jelas</p>
                    <p className="text-xs text-muted-foreground">Berikan target waktu yang spesifik</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Rayakan Progress</p>
                    <p className="text-xs text-muted-foreground">Apresiasi setiap kemajuan yang Anda buat</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Floating Actions */}
        <FloatingActions
          onQuickAdd={handleQuickAdd}
          onScrollToTop={handleScrollToTop}
          showScrollTop={showScrollTop}
          completedToday={completedToday}
        />
      </div>
    </div>
  );
}