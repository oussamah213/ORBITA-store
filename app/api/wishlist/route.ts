import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getWishlistProductIds } from "@/lib/wishlist";
import { parseProductId } from "@/lib/validation";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  try { return NextResponse.json({ productIds: await getWishlistProductIds(user.id) }); }
  catch { console.error("wishlist_read_failed"); return NextResponse.json({ error: "We could not load your wishlist." }, { status: 503 }); }
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const productId = parseProductId(body.productId);
  if (productId === null || !products.some((product) => product.id === productId)) return NextResponse.json({ error: "That product is not available." }, { status: 400 });
  try {
    const wishlist = await prisma.wishlist.upsert({ where: { userId: user.id }, create: { userId: user.id }, update: {}, select: { id: true } });
    await prisma.wishlistItem.create({ data: { wishlistId: wishlist.id, productId } });
  } catch (error) {
    if (!isUniqueConstraintError(error)) { console.error("wishlist_add_failed"); return NextResponse.json({ error: "We could not save that item." }, { status: 503 }); }
  }
  return NextResponse.json({ productIds: await getWishlistProductIds(user.id) });
}

function isUniqueConstraintError(error: unknown): error is { code: "P2002" } { return typeof error === "object" && error !== null && "code" in error && error.code === "P2002"; }

export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const productId = parseProductId(body.productId);
  if (productId === null || !products.some((product) => product.id === productId)) return NextResponse.json({ error: "That product is not available." }, { status: 400 });
  try {
    const wishlist = await prisma.wishlist.findUnique({ where: { userId: user.id }, select: { id: true } });
    if (wishlist) await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id, productId } });
    return NextResponse.json({ productIds: await getWishlistProductIds(user.id) });
  } catch { console.error("wishlist_remove_failed"); return NextResponse.json({ error: "We could not update your wishlist." }, { status: 503 }); }
}
