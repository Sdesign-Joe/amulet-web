import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata("products", locale, "/products");
}

export default function ProductsPage() {
  const t = useTranslations("products");

  const productsJsonLd = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: t(`items.${product.id}.name`),
    description: t(`items.${product.id}.description`),
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: "AMULET" },
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: product.priceRon,
      availability: "https://schema.org/InStock",
    },
  }));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
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
