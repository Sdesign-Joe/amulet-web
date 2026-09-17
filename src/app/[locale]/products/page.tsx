import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const t = useTranslations("products");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
