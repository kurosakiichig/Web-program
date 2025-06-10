// Placeholder for Wishlist Page
import ItemCard from '@/components/items/item-card';
import type { Item } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

// Dummy data for wishlist items
const wishlistItems: Item[] = [
  { id: '2', title: 'Designer Handbag', description: 'Authentic leather handbag, gently used.', price: 250.00, category: 'Fashion', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "designer handbag", sellerId: 'user2', createdAt: new Date() },
  { id: '3', title: 'Antique Wooden Chair', description: 'Beautifully carved oak chair, perfect for decor.', price: 120.00, category: 'Home & Garden', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "antique chair", sellerId: 'user3', createdAt: new Date() },
  { id: '7', title: 'Mountain Bike - Large Frame', description: 'Used but in good condition, recently serviced.', price: 350.00, category: 'Sports & Outdoors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "mountain bike", sellerId: 'user6', createdAt: new Date() },
];

export default function WishlistPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline flex items-center">
          <Heart className="mr-3 h-8 w-8 text-primary" /> My Wishlist
        </h1>
        <span className="text-lg text-muted-foreground">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
          <Heart className="mx-auto h-20 w-20 text-muted-foreground opacity-30" />
          <p className="mt-6 text-2xl font-semibold text-muted-foreground">Your wishlist is empty.</p>
          <p className="mt-2 text-md text-muted-foreground">
            Start exploring and add items you love!
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/items/search">Browse Items</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
