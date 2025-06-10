import Link from 'next/link';
import Logo from '@/components/shared/logo';
import MainNav from '@/components/layout/main-nav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Input type="search" placeholder="Search items..." className="h-9 md:w-[200px] lg:w-[300px]" />
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <MainNav />
        </div>
      </div>
    </header>
  );
}
