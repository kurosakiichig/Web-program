// Placeholder for Search Results Page
import ItemCard from '@/components/items/item-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/lib/constants';
import type { Item } from '@/lib/types';
import { Filter, ListFilter, SearchIcon, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';


// Dummy data for search results
const searchResults: Item[] = [
  { id: '1', title: 'Vintage Polaroid Camera', description: 'Working condition.', price: 75.00, category: 'Electronics', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "polaroid camera", sellerId: 'user1', createdAt: new Date() },
  { id: '6', title: 'Ergonomic Office Chair', description: 'Like new, adjustable height and lumbar support.', price: 120.00, category: 'Home & Garden', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "office chair", sellerId: 'user5', createdAt: new Date() },
  { id: '7', title: 'Mountain Bike - Large Frame', description: 'Used but in good condition, recently serviced.', price: 350.00, category: 'Sports & Outdoors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "mountain bike", sellerId: 'user6', createdAt: new Date() },
  { id: '8', title: 'Leather Messenger Bag', description: 'Stylish and durable, perfect for work or travel.', price: 90.00, category: 'Fashion', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: "leather bag", sellerId: 'user7', createdAt: new Date() },
];

export default function SearchPage({ searchParams }: { searchParams?: { query?: string; category?: string } }) {
  const query = searchParams?.query || '';
  const selectedCategory = searchParams?.category || 'all';

  // Filter logic would go here based on query and selectedCategory
  const filteredItems = searchResults.filter(item => {
    const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCategory = selectedCategory !== 'all' ? item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory : true;
    return matchesQuery && matchesCategory;
  });


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 p-6 bg-muted/30 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input
            type="search"
            defaultValue={query}
            placeholder="Search items..."
            className="h-11 text-base flex-grow"
            aria-label="Search items"
          />
          <Select defaultValue={selectedCategory}>
            <SelectTrigger className="h-11 w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="lg" className="h-11 w-full md:w-auto">
            <SearchIcon className="mr-2 h-5 w-5" /> Search
          </Button>
          <Button variant="outline" size="lg" className="h-11 w-full md:w-auto">
             <ListFilter className="mr-2 h-5 w-5" /> Filters
          </Button>
        </div>
      </div>

      {/* Filters Sidebar (Conceptual - could be a Sheet or Collapsible) */}
      {/* <div className="w-full md:w-1/4 lg:w-1/5 p-4 border rounded-lg shadow mb-6 md:mb-0 md:mr-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center"><Filter className="mr-2 h-5 w-5"/>Advanced Filters</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-base">Price Range</Label>
            <Slider defaultValue={[50]} max={1000} step={10} className="my-3"/>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
          <div>
            <Label className="text-base">Condition</Label>
            <div className="space-y-1 mt-2">
              {['New', 'Like New', 'Good', 'Fair'].map(cond => (
                <div key={cond} className="flex items-center space-x-2">
                  <Checkbox id={`cond-${cond}`} />
                  <Label htmlFor={`cond-${cond}`} className="font-normal">{cond}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full">Apply Filters</Button>
          <Button variant="ghost" className="w-full">Clear Filters</Button>
        </div>
      </div> */}


      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">
          {query ? `Results for "${query}"` : 'Browse All Items'}
          {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c=>c.id === selectedCategory)?.name || ''}`}
        </h1>
        <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
          <p className="mt-4 text-xl text-muted-foreground">No items found matching your criteria.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="link" className="mt-4" onClick={() => { /* Clear filters action */ }}>
            Clear Search & Filters
          </Button>
        </div>
      )}

      {/* Pagination (Conceptual) */}
      {filteredItems.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
}
