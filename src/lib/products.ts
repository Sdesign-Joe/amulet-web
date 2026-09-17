export type ProductId = "bottle-1-5l" | "bottle-19l";

export type CartLineKey = "bottle-1-5l" | "bottle-19l-exchange" | "bottle-19l-no-exchange";

export interface Product {
  id: ProductId;
  image: string;
  priceRon: number;
  depositRon: number;
  volumeLiters: number;
  /** Number of bottles sold together as one shrink-wrapped unit (e.g. 6 for the 1.5L pack). 1 = sold individually. */
  packSize: number;
}

export const products: Product[] = [
  {
    id: "bottle-1-5l",
    image: "/images/product-1.5l.png",
    priceRon: 3,
    depositRon: 0.5,
    volumeLiters: 1.5,
    packSize: 6,
  },
  {
    id: "bottle-19l",
    image: "/images/product-19l.png",
    priceRon: 35,
    depositRon: 0,
    volumeLiters: 19,
    packSize: 1,
  },
];

export const BOTTLE_19L_NO_EXCHANGE_SURCHARGE_RON = 40;
export const FREE_DELIVERY_THRESHOLD_RON = 150;

export function getProductById(id: ProductId): Product | undefined {
  return products.find((product) => product.id === id);
}

const CART_LINE_TO_PRODUCT: Record<CartLineKey, ProductId> = {
  "bottle-1-5l": "bottle-1-5l",
  "bottle-19l-exchange": "bottle-19l",
  "bottle-19l-no-exchange": "bottle-19l",
};

export function getProductForCartLine(key: CartLineKey): Product {
  const product = getProductById(CART_LINE_TO_PRODUCT[key]);
  if (!product) throw new Error(`Unknown cart line key: ${key}`);
  return product;
}

/** Price for one bottle/unit. Sold and ordered per bottle; packSize is informational only (shown as a "X zsugor" equivalent). */
export function getUnitPriceForCartLine(key: CartLineKey): number {
  const product = getProductForCartLine(key);
  const surcharge =
    key === "bottle-19l-no-exchange" ? BOTTLE_19L_NO_EXCHANGE_SURCHARGE_RON : 0;
  return product.priceRon + product.depositRon + surcharge;
}

/** Breaks a bottle quantity into full packs + remainder, for a "18 db = 3 zsugor" style note. Null when the product isn't sold in packs. */
export function getPackBreakdown(
  quantity: number,
  packSize: number,
): { packs: number; remainder: number } | null {
  if (packSize <= 1) return null;
  return {
    packs: Math.floor(quantity / packSize),
    remainder: quantity % packSize,
  };
}

export function getVariantLabelKey(
  key: CartLineKey,
): "exchangeLabel" | "noExchangeLabel" | null {
  if (key === "bottle-19l-exchange") return "exchangeLabel";
  if (key === "bottle-19l-no-exchange") return "noExchangeLabel";
  return null;
}
