import type { Category } from './types';
import { Smartphone, Shirt, Home, BookOpen, Bike, ToyBrick, Car, Package } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'home-garden', name: 'Home & Garden', icon: Home },
  { id: 'books-movies-music', name: 'Books, Movies & Music', icon: BookOpen },
  { id: 'sports-outdoors', name: 'Sports & Outdoors', icon: Bike },
  { id: 'toys-hobbies', name: 'Toys & Hobbies', icon: ToyBrick },
  { id: 'vehicles', name: 'Vehicles', icon: Car },
  { id: 'other', name: 'Other', icon: Package },
];
