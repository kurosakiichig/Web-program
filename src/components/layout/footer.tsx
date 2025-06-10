export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} EasyMarket. All rights reserved.</p>
        <p className="mt-1">
          A friendly and secure platform for your used goods.
        </p>
      </div>
    </footer>
  );
}
