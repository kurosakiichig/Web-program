import ItemForm from '@/components/items/item-form';

export default function NewItemPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold font-headline mb-2 text-center">List a New Item</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Fill out the details below to sell your item on EasyMarket.
        </p>
        <ItemForm />
      </div>
    </div>
  );
}
