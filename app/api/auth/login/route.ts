import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { getRequestKey, isRateLimited } from "@/lib/rate-limit";
import { normalizeEmail, validEmail, validatePassword } from "@/lib/validation";

export async function POST(request: Request) {
  if (isRateLimited(getRequestKey(request, "login"))) return NextResponse.json({ error: "Too many attempts. Please try again shortly." }, { status: 429 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const email = normalizeEmail(body.email);
    const password = body.password;
    if (!validEmail(email) || !validatePassword(password)) return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email } });
    const passwordMatches = user ? await bcrypt.compare(password as string, user.passwordHash) : false;
    if (!user || !passwordMatches) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch {
    console.error("login_failed");
    return NextResponse.json({ error: "We could not sign you in right now." }, { status: 500 });
  }
}
