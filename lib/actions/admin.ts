import { db } from "../../db";
import { productAuthenticity, products, homepageAssets } from "../../db/schema";
import { eq } from "drizzle-orm";

/**
 * Generate unique serial numbers and QR hashes for a batch of products.
 * Uses a database transaction to ensure atomicity.
 */
export async function generateProductSerials(productId: string, count: number) {
  return await db.transaction(async (tx) => {
    // 1. Verify product exists and get its name or prefix
    const product = await tx.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const serials = [];
    for (let i = 0; i < count; i++) {
       // Generate a unique serial: GRSLND-[RANDOM_STRING]
      const rawSerial = `GRSLND-${Math.random().toString(36).toUpperCase().substring(2, 10)}-${Date.now().toString(36).slice(-4)}`;
      
      // Simplify hashing for demonstration; in production use a more robust approach
      const qrHash = btoa(rawSerial + (process.env.AUTH_SECRET || "default_secret")); 

      const [newSerial] = await tx.insert(productAuthenticity).values({
        productId,
        serialNumber: rawSerial,
        qrHash: qrHash,
        isAuthentic: true,
      }).returning();

      serials.push(newSerial);
    }

    return serials;
  });
}

/**
 * Toggle homepage features or update active marketing campaigns.
 */
export async function updateHomepageAsset(key: string, value: string, isActive: boolean = true) {
  return await db.insert(homepageAssets)
    .values({ key, value, isActive, type: 'CAMPAIGN' })
    .onConflictDoUpdate({
      target: homepageAssets.key,
      set: { value, isActive, updatedAt: new Date() }
    })
    .returning();
}
