"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Heart, MessageCircle, UserCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/items/search', label: 'Browse', icon: Search },
  { href: '/items/new', label: 'List Item', icon: PlusCircle },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/chat', label: 'Messages', icon: MessageCircle },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function MainNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={cn(
            "justify-start text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href || (link.href === '/cart' && pathname.startsWith('/cart')) ? "text-primary" : "text-muted-foreground",
            isMobile ? "w-full py-3 text-base" : ""
          )}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Link href={link.href} className="flex items-center gap-2">
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        </Button>
      ))}
      {isClient && !isUserLoggedIn() && (
         <Button
          variant="ghost"
          asChild
          className={cn(
            "justify-start text-sm font-medium transition-colors hover:text-primary text-muted-foreground",
            isMobile ? "w-full py-3 text-base" : ""
          )}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Link href="/auth/login" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Login/Register
          </Link>
        </Button>
      )}
    </>
  );
  
  // Placeholder for user authentication state
  const isUserLoggedIn = () => false; // Replace with actual auth check

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
        <NavLinksContent />
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-6">
            <div className="flex flex-col space-y-4">
             <NavLinksContent isMobile={true} />
            </div>
             <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
