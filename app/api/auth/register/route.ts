import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { getRequestKey, isRateLimited } from "@/lib/rate-limit";
import { normalizeEmail, validEmail, validateName, validatePassword } from "@/lib/validation";

export async function POST(request: Request) {
  if (isRateLimited(getRequestKey(request, "register"))) return NextResponse.json({ error: "Too many attempts. Please try again shortly." }, { status: 429 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const email = normalizeEmail(body.email);
    const password = body.password;
    if (!validateName(firstName) || !validateName(lastName)) return NextResponse.json({ error: "Please enter a valid first and last name." }, { status: 400 });
    if (!validEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!validatePassword(password)) return NextResponse.json({ error: "Password must be between 8 and 128 characters." }, { status: 400 });
    const passwordHash = await bcrypt.hash(password as string, 12);
    const user = await prisma.user.create({ data: { firstName, lastName, email, passwordHash, wishlist: { create: {} } }, select: { id: true, email: true, firstName: true, lastName: true } });
    await createSession(user.id);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (isUniqueConstraintError(error)) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    console.error("register_failed");
    return NextResponse.json({ error: "We could not create your account right now." }, { status: 500 });
  }
}

function isUniqueConstraintError(error: unknown): error is { code: "P2002" } { return typeof error === "object" && error !== null && "code" in error && error.code === "P2002"; }
