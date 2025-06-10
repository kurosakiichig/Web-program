// Placeholder for Chat Page
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Send, Search, Archive } from "lucide-react";
import Link from "next/link";

// Dummy chat data
const chats = [
  { id: 'chat1', userName: 'Jane Doe', lastMessage: "Okay, sounds good! I'll be there.", unreadCount: 2, avatarUrl: 'https://placehold.co/100x100.png?text=JD', itemTitle: "Vintage Polaroid Camera" },
  { id: 'chat2', userName: 'John Smith', lastMessage: "Is the price negotiable?", unreadCount: 0, avatarUrl: 'https://placehold.co/100x100.png?text=JS', itemTitle: "Designer Handbag" },
  { id: 'chat3', userName: 'Alice Brown', lastMessage: "Perfect, thank you!", unreadCount: 0, avatarUrl: 'https://placehold.co/100x100.png?text=AB', itemTitle: "Acoustic Guitar" },
  { id: 'chat4', userName: 'Bob Green', lastMessage: "Can you ship it to my address?", unreadCount: 1, avatarUrl: 'https://placehold.co/100x100.png?text=BG', itemTitle: "Ergonomic Office Chair" },
];

// Dummy active chat (conceptual)
const activeChat = {
  id: 'chat1',
  userName: 'Jane Doe',
  itemTitle: "Vintage Polaroid Camera",
  messages: [
    { id: 'm1', sender: 'Jane Doe', text: "Hi! Is this still available?", time: "10:30 AM" },
    { id: 'm2', sender: 'You', text: "Yes, it is!", time: "10:31 AM" },
    { id: 'm3', sender: 'Jane Doe', text: "Great! Can I pick it up tomorrow?", time: "10:32 AM" },
    { id: 'm4', sender: 'You', text: "Sure, what time works for you?", time: "10:33 AM" },
    { id: 'm5', sender: 'Jane Doe', text: "Around 2 PM?", time: "10:34 AM" },
    { id: 'm6', sender: 'Jane Doe', text: "Okay, sounds good! I'll be there.", time: "10:35 AM" },
  ]
};


export default function ChatPage() {
  return (
    <div className="container mx-auto py-8 px-0 sm:px-4 lg:px-6 h-[calc(100vh-8rem)]"> {/* Adjust height based on header/footer */}
      <Card className="h-full flex flex-col md:flex-row shadow-xl overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r h-1/3 md:h-full flex flex-col">
          <CardHeader className="p-4">
            <CardTitle className="text-2xl font-headline flex items-center justify-between">
              Messages
              <Button variant="ghost" size="icon"><Archive className="h-5 w-5 text-muted-foreground"/></Button>
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-8 h-9" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <div className="p-2 space-y-1">
            {chats.map(chat => (
              <Link key={chat.id} href={`/chat?id=${chat.id}`} passHref> {/* Conceptual linking */}
                <Button variant="ghost" className={`w-full h-auto justify-start p-3 ${chat.id === activeChat.id ? 'bg-muted' : ''}`}>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={chat.avatarUrl} alt={chat.userName} data-ai-hint="user avatar"/>
                    <AvatarFallback>{chat.userName.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow text-left overflow-hidden">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold truncate">{chat.userName}</p>
                      {chat.unreadCount > 0 && <Badge variant="destructive" className="flex-shrink-0">{chat.unreadCount}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.itemTitle}</p>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                  </div>
                </Button>
              </Link>
            ))}
            </div>
          </ScrollArea>
        </div>

        {/* Active Chat Window */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col h-2/3 md:h-full">
          {activeChat ? (
            <>
              <CardHeader className="p-4 border-b flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">{activeChat.userName}</CardTitle>
                  <CardDescription>Regarding: <Link href="#" className="text-primary hover:underline">{activeChat.itemTitle}</Link></CardDescription>
                </div>
                 {/* Placeholder for item image / link */}
              </CardHeader>
              <ScrollArea className="flex-grow p-4 space-y-4 bg-background">
                {activeChat.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <CardFooter className="p-4 border-t bg-background">
                <div className="flex w-full items-center space-x-2">
                  <Input placeholder="Type your message..." className="flex-grow h-10" />
                  <Button size="icon" className="h-10 w-10">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <MessageSquare className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-xl">Select a chat to start messaging</p>
              <p className="text-sm mt-1">Your conversations with buyers and sellers will appear here.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
