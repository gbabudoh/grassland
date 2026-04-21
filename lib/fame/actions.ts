"use server";

import { db } from "@/db";
import { users, activityLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateNewStreak, calculateRank } from "./utils";
import { revalidatePath } from "next/cache";
import { ShippingData, ClaimRewardResult } from "./types";

export async function claimDailyReward(userId: string): Promise<ClaimRewardResult> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) return { error: "User not found" };

    const { newStreak, alreadyActiveToday } = calculateNewStreak(user.lastActive, user.currentStreak);

    if (alreadyActiveToday) {
      return { error: "Already claimed today" };
    }

    // Point logic
    let reward = 5;
    if (newStreak % 30 === 0) reward = 250;
    else if (newStreak % 7 === 0) reward = 50;

    const newTotalPoints = user.famePoints + reward;
    const newRank = calculateRank(newTotalPoints);

    await db.transaction(async (tx) => {
      await tx.update(users).set({
        famePoints: newTotalPoints,
        fameRank: newRank,
        currentStreak: newStreak,
        maxStreak: Math.max(newStreak, user.maxStreak),
        lastActive: new Date(),
        updatedAt: new Date(),
      }).where(eq(users.id, userId));

      await tx.insert(activityLogs).values({
        userId,
        action: "DAILY_CLAIM",
        pointsAwarded: reward,
      });

      // Check for streak badges
      if (newStreak === 7) {
        // Award 'Week 1' badge
        // This assumes badges are pre-populated
      }
    });

    revalidatePath("/fame-network");
    return { success: true, reward, newStreak, newRank };
  } catch (error: unknown) {
    console.error("Error claiming daily reward:", error);
    return { error: "Failed to claim reward" };
  }
}

export async function submitShippingInfo(userId: string, data: ShippingData) {
    try {
        await db.update(users).set({
            address: data.addressLine1 + (data.addressLine2 ? `, ${data.addressLine2}` : ""),
            city: data.city,
            postalCode: data.postcode,
            country: data.country,
            phone: data.phone,
            updatedAt: new Date(),
        }).where(eq(users.id, userId));

        await db.insert(activityLogs).values({
            userId,
            action: "KIT_CLAIMED",
            pointsAwarded: 0,
        });

        revalidatePath("/fame-network/claim-kit");
        return { success: true };
    } catch (error) {
        console.error("Error submitting shipping info:", error);
        return { error: "Failed to submit info" };
    }
}
