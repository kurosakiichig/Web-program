mport Image from 'next/image';
import Link from 'next/link';
import type { Item } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col h-full">
      <Link href={`/items/${item.id}`} className="block">
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={item.imageUrl || 'https://placehold.co/400x300.png'}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint || 'product photo'}
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <Link href={`/items/${item.id}`} className="hover:text-primary transition-colors">
          <CardTitle className="text-lg font-headline truncate" title={item.title}>{item.title}</CardTitle>
        </Link>
        {item.category && <Badge variant="secondary" className="mt-1 w-fit">{item.category}</Badge>}
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-2xl font-semibold text-primary">
          ${item.price.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex justify-between items-center w-full">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/items/${item.id}`}>
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Add to wishlist">
            <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
