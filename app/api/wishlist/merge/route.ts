import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getWishlistProductIds } from "@/lib/wishlist";
import { parseProductId } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  try {
    const body = await request.json() as { productIds?: unknown };
    const requested = Array.isArray(body.productIds) ? body.productIds : [];
    const productIds = Array.from(new Set(requested.map(parseProductId).filter((id): id is number => id !== null && products.some((product) => product.id === id)))).slice(0, 100);
    const wishlist = await prisma.wishlist.upsert({ where: { userId: user.id }, create: { userId: user.id }, update: {}, select: { id: true } });
    if (productIds.length) await prisma.wishlistItem.createMany({ data: productIds.map((productId) => ({ wishlistId: wishlist.id, productId })), skipDuplicates: true });
    return NextResponse.json({ productIds: await getWishlistProductIds(user.id) });
  } catch { console.error("wishlist_merge_failed"); return NextResponse.json({ error: "We could not merge your wishlist right now." }, { status: 503 }); }
}
