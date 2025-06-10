"use client";

import type { EnhanceListingDescriptionOutput } from '@/ai/flows/enhance-listing-description';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface AIEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  suggestions: EnhanceListingDescriptionOutput | null;
  onApply: (enhancedDescription: string, suggestedTags: string[]) => void;
  isLoading: boolean;
}

export default function AIEnhancementModal({
  isOpen,
  onClose,
  originalDescription,
  suggestions,
  onApply,
  isLoading,
}: AIEnhancementModalProps) {
  if (!isOpen) return null;

  const handleApply = () => {
    if (suggestions) {
      onApply(suggestions.enhancedDescription, suggestions.suggestedTags);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            AI Listing Enhancement
          </DialogTitle>
          <DialogDescription>
            Let AI help you improve your item's description and suggest relevant tags.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="py-10 flex justify-center items-center">
            <Sparkles className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Generating suggestions...</p>
          </div>
        )}

        {!isLoading && suggestions && (
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Original Description:</h3>
                <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">{originalDescription || "No description provided."}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg text-primary">AI Suggested Description:</h3>
                <p className="text-sm bg-primary/10 p-3 rounded-md whitespace-pre-wrap">{suggestions.enhancedDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg text-primary">Suggested Tags:</h3>
                {suggestions.suggestedTags && suggestions.suggestedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No tags suggested.</p>
                )}
              </div>
            </div>
          </ScrollArea>
        )}
        
        {!isLoading && !suggestions && !originalDescription && (
             <div className="py-10 text-center text-muted-foreground">
                <p>Please provide an item title, category, and description to get AI suggestions.</p>
             </div>
        )}


        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleApply} disabled={!suggestions || isLoading}>
            Apply Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
