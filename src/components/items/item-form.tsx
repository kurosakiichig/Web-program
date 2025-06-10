"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/lib/constants';
import { enhanceListingDescription, type EnhanceListingDescriptionOutput } from '@/ai/flows/enhance-listing-description';
import AIEnhancementModal from './ai-enhancement-modal';
import { useToast } from "@/hooks/use-toast";
import { Sparkles, UploadCloud } from 'lucide-react';

const itemFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Please select a category." }),
  imageUrls: z.string().optional(), // Simple text input for image URLs for now
  tags: z.array(z.string()).optional(),
});

type ItemFormValues = z.infer<typeof itemFormSchema>;

export default function ItemForm() {
  const { toast } = useToast();
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      imageUrls: '',
      tags: [],
    },
  });

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<EnhanceListingDescriptionOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentDescriptionForModal, setCurrentDescriptionForModal] = useState("");


  const handleEnhanceDescription = async () => {
    const title = form.getValues("title");
    const category = form.getValues("category");
    const description = form.getValues("description");

    if (!title || !category || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in Title, Category, and Description to use AI enhancement.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentDescriptionForModal(description);
    setIsAiLoading(true);
    setIsAiModalOpen(true); // Open modal immediately to show loading state

    try {
      const result = await enhanceListingDescription({ title, category, description });
      setAiSuggestions(result);
    } catch (error) {
      console.error("Error enhancing description:", error);
      toast({
        title: "AI Enhancement Failed",
        description: "Could not generate suggestions. Please try again.",
        variant: "destructive",
      });
      setIsAiModalOpen(false); // Close modal on error if it was opened
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyAiSuggestions = (enhancedDescription: string, suggestedTags: string[]) => {
    form.setValue('description', enhancedDescription, { shouldValidate: true });
    form.setValue('tags', suggestedTags, { shouldValidate: true }); // Assuming you have a way to handle tags
    toast({
      title: "AI Suggestions Applied",
      description: "Description and tags have been updated.",
    });
    setIsAiModalOpen(false);
  };

  async function onSubmit(data: ItemFormValues) {
    // Placeholder for actual submission logic (e.g., API call)
    console.log(data);
    toast({
      title: "Item Listed (Mock)",
      description: "Your item has been successfully listed (simulated).",
    });
    form.reset(); // Reset form after successful submission
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                </FormControl>
                <FormDescription>A clear and concise title helps buyers find your item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item in detail. Include condition, size, material, etc."
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                   <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleEnhanceDescription}
                    disabled={isAiLoading}
                    className="absolute bottom-2 right-2"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isAiLoading ? "Enhancing..." : "Enhance with AI"}
                  </Button>
                </div>
                <FormDescription>Provide all relevant details to attract buyers.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Images</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" multiple disabled /> 
                    </label>
                  </div> 
                </FormControl>
                 <FormDescription>
                  Upload high-quality images of your item. (Currently accepts comma-separated URLs for mock UI: e.g., url1,url2)
                  <Input placeholder="Enter image URLs, separated by commas" {...field} className="mt-2" />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Display suggested tags if available. This is a simple display; a more complex tag input could be used. */}
          {form.getValues('tags') && form.getValues('tags')!.length > 0 && (
            <FormItem>
              <FormLabel>AI Suggested Tags</FormLabel>
              <div className="flex flex-wrap gap-2">
                {form.getValues('tags')!.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <FormDescription>These tags were suggested by AI to improve visibility.</FormDescription>
            </FormItem>
          )}


          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Listing Item..." : "List Your Item"}
          </Button>
        </form>
      </Form>

      <AIEnhancementModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        originalDescription={currentDescriptionForModal}
        suggestions={aiSuggestions}
        onApply={handleApplyAiSuggestions}
        isLoading={isAiLoading}
      />
    </>
  );
}
