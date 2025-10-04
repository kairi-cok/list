import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface QuoteData {
  text: string;
  author: string;
  category: string;
}

export function DynamicQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes: QuoteData[] = [
    {
      text: "Hidup ini bukan tentang menemukan diri Anda sendiri. Hidup ini tentang menciptakan diri Anda sendiri.",
      author: "George Bernard Shaw",
      category: "Personal Growth"
    },
    {
      text: "Impian itu tidak memiliki tanggal kedaluwarsa. Tarik napas dalam-dalam dan coba lagi.",
      author: "K.T. Witten",
      category: "Dreams"
    },
    {
      text: "Satu-satunya cara untuk melakukan pekerjaan yang luar biasa adalah dengan mencintai apa yang Anda lakukan.",
      author: "Steve Jobs",
      category: "Career"
    },
    {
      text: "Jangan tunggu sampai besok untuk melakukan sesuatu. Lakukan hari ini, sekarang juga.",
      author: "Paulo Coelho",
      category: "Action"
    },
    {
      text: "Perjalanan seribu mil dimulai dengan satu langkah.",
      author: "Lao Tzu",
      category: "Journey"
    },
    {
      text: "Kebahagiaan bukanlah tujuan, melainkan produk sampingan dari hidup yang bermakna.",
      author: "Eleanor Roosevelt",
      category: "Happiness"
    },
    {
      text: "Jika Anda ingin hidup yang bahagia, kaitkan dengan tujuan, bukan dengan orang atau benda.",
      author: "Albert Einstein",
      category: "Purpose"
    },
    {
      text: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.",
      author: "Eleanor Roosevelt",
      category: "Dreams"
    },
    {
      text: "Jadilah diri Anda sendiri; semua orang lain sudah diambil.",
      author: "Oscar Wilde",
      category: "Authenticity"
    },
    {
      text: "Kesempatan terbaik yang pernah saya miliki, saya ciptakan sendiri.",
      author: "George Matthew Adams",
      category: "Opportunity"
    },
    {
      text: "Hidup adalah 10% apa yang terjadi pada Anda dan 90% bagaimana Anda bereaksi terhadapnya.",
      author: "Charles R. Swindoll",
      category: "Mindset"
    },
    {
      text: "Jangan biarkan kemarin menggunakan terlalu banyak hari ini.",
      author: "Will Rogers",
      category: "Present"
    }
  ];

  // Auto-rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const quote = quotes[currentQuote];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 text-6xl">
            <Quote className="w-16 h-16" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-primary" />
              <h3 className="font-medium">✨ Inspirasi Hari Ini</h3>
            </div>
            
            <Button
              onClick={nextQuote}
              variant="ghost"
              size="sm"
              className="gap-2 text-primary hover:text-primary/80"
            >
              <RefreshCw className="w-4 h-4" />
              Quote Baru
            </Button>
          </div>

          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <blockquote className="text-lg italic text-foreground leading-relaxed">
              "{quote.text}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <cite className="text-sm text-muted-foreground not-italic">
                — {quote.author}
              </cite>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {quote.category}
              </span>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex gap-1 mt-4 justify-center">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentQuote 
                    ? 'bg-primary w-6' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}