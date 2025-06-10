// Placeholder for User Profile Page
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit3, Package, Heart, MessageSquare, LogOut } from "lucide-react";
import ItemCard from "@/components/items/item-card";
import type { Item } from "@/lib/types";

// Dummy data for profile
const user = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  avatarUrl: "https://placehold.co/100x100.png",
  bio: "Vintage collector and part-time seller. Love finding unique items!",
  joinedDate: "Joined March 2023",
};

const userListings: Item[] = [
  { id: '1', title: 'Vintage Polaroid Camera', description: 'Working condition, great for retro photo enthusiasts.', price: 75.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "polaroid camera", sellerId: 'user1', createdAt: new Date() },
  { id: '5', title: 'Retro Gaming Console', description: 'Classic console with 2 controllers and popular games.', price: 150.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "gaming console", sellerId: 'user1', createdAt: new Date() },
];

const userWishlist: Item[] = [
    { id: '2', title: 'Designer Handbag', description: 'Authentic leather handbag, gently used.', price: 250.00, category: 'Fashion', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "designer handbag", sellerId: 'user2', createdAt: new Date() },
];


export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile picture" />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl sm:text-4xl font-headline">{user.name}</CardTitle>
              <CardDescription className="text-base mt-1">{user.email}</CardDescription>
              <p className="text-sm text-muted-foreground mt-2">{user.joinedDate}</p>
              <Button variant="outline" size="sm" className="mt-4">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-muted-foreground whitespace-pre-line">{user.bio || "No bio provided."}</p>
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-2xl font-semibold font-headline mb-6 flex items-center">
              <Package className="mr-3 h-6 w-6 text-primary" /> My Listings ({userListings.length})
            </h3>
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(item => <ItemCard key={item.id} item={item} />)}
              </div>
            ) : (
              <p className="text-muted-foreground">You haven&apos;t listed any items yet.</p>
            )}
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-2xl font-semibold font-headline mb-6 flex items-center">
              <Heart className="mr-3 h-6 w-6 text-primary" /> My Wishlist ({userWishlist.length})
            </h3>
             {userWishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userWishlist.map(item => <ItemCard key={item.id} item={item} />)}
              </div>
            ) : (
              <p className="text-muted-foreground">Your wishlist is empty.</p>
            )}
          </div>
           <Separator className="my-8" />

            <div className="space-y-4">
                <Button variant="outline" className="w-full sm:w-auto justify-start text-left">
                    <MessageSquare className="mr-3 h-5 w-5"/> My Messages
                </Button>
                 <Button variant="destructive" className="w-full sm:w-auto justify-start text-left">
                    <LogOut className="mr-3 h-5 w-5"/> Log Out
                </Button>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
