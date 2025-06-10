export interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  // Add other user fields as needed
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string; // For simplicity, one image. Can be string[] for multiple.
  dataAiHint?: string; // Hint for AI image search
  sellerId: string;
  sellerName?: string; // Denormalized for display
  createdAt: Date;
  tags?: string[];
  // Add other item fields like status, location, etc.
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ElementType; // For Lucide icons
}

export interface CartItem extends Item {
  quantity: number;
}

export interface OrderItem extends Item {
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  userId: string; // ID of the user who placed the order
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentIntentId?: string; // To store Stripe Payment Intent ID
}
