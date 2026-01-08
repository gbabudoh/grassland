import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: "USER",
      })
      .returning();

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
