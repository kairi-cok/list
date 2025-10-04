import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Plus, Star, Heart, Globe, Trophy } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface GoalTemplate {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  targetAge?: number;
  description: string;
  icon: string;
  tags: string[];
}

interface GoalTemplatesProps {
  onAddTemplate: (template: GoalTemplate) => void;
}

export function GoalTemplates({ onAddTemplate }: GoalTemplatesProps) {
  const templates: GoalTemplate[] = [
    // Travel & Places
    {
      id: '1',
      title: 'Keliling 7 Benua',
      category: 'travel',
      priority: 'high',
      targetAge: 40,
      description: 'Mengunjungi setiap benua dan merasakan kebudayaan yang berbeda',
      icon: '🌍',
      tags: ['adventure', 'culture', 'long-term']
    },
    {
      id: '2',
      title: 'Backpacking ke Asia Tenggara',
      category: 'travel',
      priority: 'medium',
      targetAge: 30,
      description: 'Menjelajahi negara-negara ASEAN dengan budget backpacker',
      icon: '🎒',
      tags: ['budget-friendly', 'culture', 'adventure']
    },
    {
      id: '3',
      title: 'Melihat Aurora Borealis',
      category: 'travel',
      priority: 'medium',
      targetAge: 35,
      description: 'Menyaksikan keajaiban cahaya aurora di langit malam',
      icon: '🌌',
      tags: ['nature', 'bucket-list', 'seasonal']
    },

    // Adventure & Sports
    {
      id: '4',
      title: 'Mendaki Gunung Everest',
      category: 'adventure',
      priority: 'high',
      targetAge: 35,
      description: 'Mencapai puncak tertinggi dunia dan mengatasi tantangan fisik terbesar',
      icon: '🏔️',
      tags: ['extreme', 'physical', 'challenge']
    },
    {
      id: '5',
      title: 'Lari Marathon',
      category: 'adventure',
      priority: 'medium',
      targetAge: 28,
      description: 'Menyelesaikan lari marathon 42km untuk pertama kali',
      icon: '🏃‍♂️',
      tags: ['fitness', 'achievement', 'health']
    },
    {
      id: '6',
      title: 'Belajar Menyelam',
      category: 'adventure',
      priority: 'low',
      targetAge: 30,
      description: 'Mendapat sertifikat diving dan mengeksplorasi dunia bawah laut',
      icon: '🤿',
      tags: ['skill', 'nature', 'certification']
    },

    // Career & Business
    {
      id: '7',
      title: 'Memulai Bisnis Sendiri',
      category: 'career',
      priority: 'high',
      targetAge: 32,
      description: 'Membangun startup atau bisnis yang memberikan dampak positif',
      icon: '🚀',
      tags: ['entrepreneurship', 'financial', 'impact']
    },
    {
      id: '8',
      title: 'Menjadi Expert di Bidang IT',
      category: 'career',
      priority: 'high',
      targetAge: 30,
      description: 'Mencapai level senior/expert dalam teknologi dan programming',
      icon: '💻',
      tags: ['professional', 'skill', 'technology']
    },
    {
      id: '9',
      title: 'Menulis Buku Bestseller',
      category: 'career',
      priority: 'medium',
      targetAge: 40,
      description: 'Menerbitkan buku yang menginspirasi banyak orang',
      icon: '📖',
      tags: ['creative', 'impact', 'legacy']
    },

    // Learning & Skills
    {
      id: '10',
      title: 'Menguasai 5 Bahasa',
      category: 'learning',
      priority: 'medium',
      targetAge: 35,
      description: 'Berbicara lancar dalam 5 bahasa yang berbeda',
      icon: '🗣️',
      tags: ['language', 'communication', 'culture']
    },
    {
      id: '11',
      title: 'Belajar Memainkan Piano',
      category: 'learning',
      priority: 'low',
      targetAge: 28,
      description: 'Mahir memainkan piano klasik dan lagu-lagu favorit',
      icon: '🎹',
      tags: ['music', 'hobby', 'creative']
    },
    {
      id: '12',
      title: 'Belajar Memasak Masakan Dunia',
      category: 'learning',
      priority: 'low',
      targetAge: 30,
      description: 'Menguasai teknik memasak dari berbagai negara',
      icon: '👨‍🍳',
      tags: ['culinary', 'skill', 'culture']
    },

    // Personal & Relationships
    {
      id: '13',
      title: 'Menikah dengan Pasangan Hidup',
      category: 'personal',
      priority: 'high',
      targetAge: 30,
      description: 'Membangun keluarga bahagia dengan orang yang tepat',
      icon: '💍',
      tags: ['relationship', 'milestone', 'family']
    },
    {
      id: '14',
      title: 'Memiliki Rumah Sendiri',
      category: 'personal',
      priority: 'high',
      targetAge: 35,
      description: 'Membeli rumah impian untuk keluarga',
      icon: '🏠',
      tags: ['financial', 'milestone', 'stability']
    },
    {
      id: '15',
      title: 'Volunteer untuk Amal',
      category: 'personal',
      priority: 'medium',
      targetAge: 25,
      description: 'Memberikan kontribusi nyata untuk masyarakat yang membutuhkan',
      icon: '🤝',
      tags: ['charity', 'impact', 'giving-back']
    },

    // Achievements & Goals
    {
      id: '16',
      title: 'Mencapai Financial Freedom',
      category: 'achievement',
      priority: 'high',
      targetAge: 40,
      description: 'Memiliki passive income yang cukup untuk hidup nyaman',
      icon: '💰',
      tags: ['financial', 'investment', 'retirement']
    },
    {
      id: '17',
      title: 'Menurunkan Berat Badan Ideal',
      category: 'achievement',
      priority: 'medium',
      targetAge: 27,
      description: 'Mencapai berat badan dan bentuk tubuh yang sehat',
      icon: '⚖️',
      tags: ['health', 'fitness', 'lifestyle']
    },
    {
      id: '18',
      title: 'Membuat Film Dokumenter',
      category: 'achievement',
      priority: 'low',
      targetAge: 35,
      description: 'Memproduksi dokumenter tentang topik yang bermakna',
      icon: '🎬',
      tags: ['creative', 'impact', 'storytelling']
    }
  ];

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      travel: <Globe className="w-5 h-5" />,
      adventure: <Star className="w-5 h-5" />,
      career: <Trophy className="w-5 h-5" />,
      learning: <Lightbulb className="w-5 h-5" />,
      personal: <Heart className="w-5 h-5" />,
      achievement: <Trophy className="w-5 h-5" />
    };
    return iconMap[category] || <Lightbulb className="w-5 h-5" />;
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

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="space-y-6">
      {/* Templates Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Template Impian</h2>
        </div>
        <p className="text-muted-foreground">
          Inspirasi dan ide untuk memulai perjalanan mewujudkan impian Anda
        </p>
      </motion.div>

      {/* Category Sections */}
      {categories.map(category => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categories.indexOf(category) * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            {getCategoryIcon(category)}
            <h3 className="text-lg font-semibold">{getCategoryName(category)}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter(template => template.category === category)
              .map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-4 h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{template.icon}</span>
                    <Badge variant={getPriorityColor(template.priority)} className="text-xs">
                      {template.priority === 'high' ? 'Tinggi' : 
                       template.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </Badge>
                  </div>

                  <h4 className="font-medium mb-2 line-clamp-2">{template.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {template.targetAge && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Target: Umur {template.targetAge}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onAddTemplate(template)}
                    className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambahkan
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Custom Template Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 text-center">
          <Lightbulb className="w-8 h-8 mx-auto mb-3 text-primary" />
          <h3 className="font-medium mb-2">Punya Impian Unik?</h3>
          <p className="text-muted-foreground mb-4">
            Template ini hanya permulaan. Buat impian Anda sendiri yang lebih personal dan bermakna!
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Buat Impian Custom
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}