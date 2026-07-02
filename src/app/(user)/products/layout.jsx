export default function ProductsLayout({
  children,
}) {
  return (
    <main className="bg-[#f5f5f5] min-h-screen pb-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {children}
      </div>
    </main>
  );
}