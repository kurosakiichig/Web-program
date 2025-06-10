import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
      <ShoppingCart className="h-8 w-8" />
      <span className="font-headline">EasyMarket</span>
    </Link>
  );
}
