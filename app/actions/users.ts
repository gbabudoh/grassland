"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    return { success: true, data: allUsers };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

interface UpdateUserData {
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "GHF_MEMBER";
  status: string; // "ACTIVE" or "INACTIVE"
  fnNetworkTier?: string;
  fnRank?: number;
}

export async function updateUser(userId: string, data: UpdateUserData) {
  try {
    await db.update(users).set({
      name: data.name,
      email: data.email,
      role: data.role,
      isFnMember: data.role === "GHF_MEMBER", // Auto-set FN member if ROLE is GHF_MEMBER, or use logic
      fnNetworkTier: data.fnNetworkTier,
      fnRank: data.fnRank,
    }).where(eq(users.id, userId));
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
    try {
        await db.delete(users).where(eq(users.id, userId));
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
