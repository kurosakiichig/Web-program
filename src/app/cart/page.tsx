"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/lib/types';
import { ShoppingCart, Trash2, PlusCircle, MinusCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy data for cart items - replace with actual cart state management
const initialDummyCartItems: CartItem[] = [
  { id: '1', title: 'Vintage Polaroid Camera', price: 75.99, category: 'Electronics', imageUrl: 'https://placehold.co/150x150.png', dataAiHint: "polaroid camera", sellerId: 'userA', createdAt: new Date(), quantity: 1, description: 'A classic camera' },
  { id: '2', title: 'Designer Handbag', price: 250.00, category: 'Fashion', imageUrl: 'https://placehold.co/150x150.png', dataAiHint: "designer handbag", sellerId: 'userB', createdAt: new Date(), quantity: 1, description: 'Stylish leather bag' },
  { id: '3', title: 'Acoustic Guitar', price: 180.00, category: 'Music', imageUrl: 'https://placehold.co/150x150.png', dataAiHint: "acoustic guitar", sellerId: 'userC', createdAt: new Date(), quantity: 2, description: 'Great for beginners' },
];

export default function CartPage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialDummyCartItems);

  // In a real app, these handlers would interact with a cart state (e.g., Context, Zustand, Redux) or backend
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or remove item if 0
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
    });
  };

  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const cartTotal = cartSubtotal + shippingCost;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline flex items-center">
          <ShoppingCart className="mr-3 h-8 w-8 text-primary" /> Your Shopping Cart
        </h1>
        <Button variant="outline" asChild>
          <Link href="/items/search">
            Continue Shopping
          </Link>
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-16 shadow-lg">
          <CardHeader>
            <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground opacity-50" />
          </CardHeader>
          <CardContent>
            <p className="mt-4 text-2xl font-semibold text-muted-foreground">Your cart is empty.</p>
            <p className="mt-2 text-md text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
             <Button asChild size="lg" className="mt-4">
                <Link href="/items/search">Start Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md overflow-hidden">
                <div className="relative w-full sm:w-28 h-28 flex-shrink-0 rounded-md overflow-hidden">
                  <Image src={item.imageUrl || 'https://placehold.co/150x150.png'} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.dataAiHint || 'product'}/>
                </div>
                <div className="flex-grow">
                  <Link href={`/items/${item.id}`} className="hover:text-primary">
                    <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-lg font-semibold text-primary mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end sm:items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={item.quantity} readOnly className="h-8 w-12 text-center" />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                   <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive/90" onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="mr-1.5 h-4 w-4" /> Remove
                  </Button>
                </div>
                <div className="w-full sm:w-auto text-right sm:text-left pt-2 sm:pt-0 border-t sm:border-none mt-2 sm:mt-0">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-semibold">${cartSubtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping (Estimate)</p>
                  <p className="font-semibold">${shippingCost.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-xl">
                  <p className="font-bold">Total</p>
                  <p className="font-bold text-primary">${cartTotal.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button size="lg" className="w-full text-base">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                 <p className="text-xs text-muted-foreground text-center">Taxes and final shipping will be calculated at checkout.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
