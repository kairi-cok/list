import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Calendar, Upload, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface CompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (completedDate: Date, proofPhoto?: string, note?: string) => void;
  goalText: string;
}

export function CompletionDialog({ isOpen, onClose, onComplete, goalText }: CompletionDialogProps) {
  const [completedDate, setCompletedDate] = useState(new Date().toISOString().split('T')[0]);
  const [proofPhoto, setProofPhoto] = useState<string>('');
  const [note, setNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProofPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = () => {
    const date = new Date(completedDate);
    onComplete(date, proofPhoto, note);
    onClose();
    // Reset form
    setProofPhoto('');
    setNote('');
    setCompletedDate(new Date().toISOString().split('T')[0]);
  };

  const handleCancel = () => {
    setProofPhoto('');
    setNote('');
    setCompletedDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Selamat! Impian Tercapai! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-accent/50 p-3 rounded-lg">
            <p className="font-medium text-sm text-foreground">{goalText}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="completion-date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Tanggal Penyelesaian
            </Label>
            <Input
              id="completion-date"
              type="date"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Foto Bukti (Opsional)
            </Label>
            
            {proofPhoto ? (
              <div className="relative">
                <img 
                  src={proofPhoto} 
                  alt="Proof" 
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => setProofPhoto('')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop foto atau klik untuk upload
                </p>
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    Pilih Foto
                  </label>
                </Button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="completion-note">
              Catatan Pencapaian (Opsional)
            </Label>
            <Textarea
              id="completion-note"
              placeholder="Ceritakan pengalaman Anda mencapai impian ini..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Batal
            </Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Tandai Selesai
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}