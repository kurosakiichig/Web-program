// Placeholder for Item Details Page
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, ShoppingCartIcon, Share2 } from 'lucide-react';
import type { Item } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

// Dummy data for a single item
const item: Item = {
  id: '1',
  title: 'Vintage Polaroid Camera OneStep SX-70',
  description: "A classic Polaroid OneStep SX-70 Land Camera in good working condition. This iconic camera is known for its instant prints and retro charm. Perfect for collectors, photography enthusiasts, or anyone looking to capture memories with a vintage flair. Shows some signs of wear consistent with its age, but overall well-maintained. Tested and functional. Film not included.\n\nFeatures:\n- Instant film camera\n- Fixed focus lens\n- Automatic exposure control\n- Uses SX-70 film (readily available online)",
  price: 75.99,
  category: 'Electronics',
  imageUrl: 'https://placehold.co/600x400.png',
  dataAiHint: "vintage camera",
  sellerId: 'user123',
  sellerName: 'Retro Finds Co.',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  tags: ['polaroid', 'vintage camera', 'instant film', 'retro', 'photography'],
};

const categoryDetails = CATEGORIES.find(c => c.id === item.category);

export default function ItemDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, fetch item by params.id
  // For now, using dummy item.
  // We'll also assume the current user is 'currentUser' and not 'user123' (the seller)
  const currentUserId = 'currentUser'; 
  const isOwner = item.sellerId === currentUserId;


  if (!item) {
    return <div className="container mx-auto py-8 px-4 text-center">Item not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="md:sticky md:top-24 self-start">
          <Card className="overflow-hidden shadow-lg">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={item.imageUrl || 'https://placehold.co/600x400.png'}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                data-ai-hint={item.dataAiHint || "product main"}
              />
            </div>
          </Card>
        </div>

        {/* Item Info */}
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-3xl lg:text-4xl font-bold font-headline">{item.title}</CardTitle>
                <Button variant="ghost" size="icon" className="ml-4 flex-shrink-0">
                  <Heart className="h-6 w-6 text-muted-foreground hover:text-destructive" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
              {categoryDetails && (
                <Link href={`/items/search?category=${categoryDetails.id}`} className="inline-block mt-2">
                  <Badge variant="secondary" className="text-sm py-1 px-3 hover:bg-accent transition-colors">
                    {categoryDetails.icon && <categoryDetails.icon className="mr-2 h-4 w-4"/>}
                    {categoryDetails.name}
                  </Badge>
                </Link>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-primary my-4">${item.price.toFixed(2)}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{item.description}</p>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-6">
                Listed on: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3 p-6 border-t">
              {!isOwner && (
                <>
                <Button variant="outline" size="lg" className="w-full text-base">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat with Seller
                </Button>
                </>
              )}
               <Button size="lg" className="w-full text-base">
                <ShoppingCartIcon className="mr-2 h-5 w-5" /> Add to Cart (Placeholder)
              </Button>
            </CardFooter>
          </Card>

          {/* Seller Info Card */}
          <Card className="mt-6 shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://placehold.co/100x100.png" alt={item.sellerName} data-ai-hint="seller avatar" />
                <AvatarFallback>{item.sellerName?.substring(0,1) || 'S'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.sellerName || 'Anonymous Seller'}</p>
                <Link href={`/profile/${item.sellerId}`} className="text-sm text-primary hover:underline">
                  View Profile
                </Link>
              </div>
            </CardHeader>
          </Card>
           <div className="mt-6 flex justify-end">
                <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4"/> Share
                </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
