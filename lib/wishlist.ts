import { prisma } from "@/lib/prisma";

export async function getWishlistProductIds(userId: string) {
  const wishlist = await prisma.wishlist.findUnique({ where: { userId }, select: { items: { select: { productId: true }, orderBy: { createdAt: "desc" } } } });
  return wishlist?.items.map((item: { productId: number }) => item.productId) ?? [];
}
