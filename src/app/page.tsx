import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ItemCard from '@/components/items/item-card';
import type { Item } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { Search, ArrowRight } from 'lucide-react';

// Dummy data for featured items
const featuredItems: Item[] = [
  { id: '1', title: 'Vintage Polaroid Camera', description: 'Working condition, great for retro photo enthusiasts.', price: 75.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "polaroid camera", sellerId: 'user1', createdAt: new Date(), tags: ['camera', 'vintage'] },
  { id: '2', title: 'Designer Handbag', description: 'Authentic leather handbag, gently used.', price: 250.00, category: 'Fashion', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "designer handbag", sellerId: 'user2', createdAt: new Date(), tags: ['bag', 'fashion'] },
  { id: '3', title: 'Antique Wooden Chair', description: 'Beautifully carved oak chair, perfect for decor.', price: 120.00, category: 'Home & Garden', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "antique chair", sellerId: 'user3', createdAt: new Date(), tags: ['furniture', 'antique'] },
  { id: '4', title: 'Acoustic Guitar', description: 'Great condition, warm sound. Comes with a soft case.', price: 180.00, category: 'Books, Movies & Music', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "acoustic guitar", sellerId: 'user4', createdAt: new Date(), tags: ['music', 'instrument'] },
];


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6">
            Welcome to <span className="text-primary">EasyMarket</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover unique finds and sell your pre-loved items with ease.
            Your secure and friendly marketplace.
          </p>
          <div className="max-w-xl mx-auto flex items-center space-x-2">
            <Input
              type="search"
              placeholder="What are you looking for?"
              className="h-12 text-base flex-grow"
              aria-label="Search items"
            />
            <Button size="lg" className="h-12">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {CATEGORIES.slice(0, 5).map((category) => ( // Show first 5 categories
              <Link key={category.id} href={`/items/search?category=${category.id}`} passHref>
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col justify-center items-center p-4 sm:p-6">
                  <CardHeader className="p-0 mb-3">
                    {category.icon && <category.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto" />}
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="font-medium text-sm sm:text-base">{category.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
           <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/items/search">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/items/search">
                Explore More Items <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
