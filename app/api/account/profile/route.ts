import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { validateName } from "@/lib/validation";

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    if (!validateName(firstName) || !validateName(lastName)) return NextResponse.json({ error: "Please enter a valid first and last name." }, { status: 400 });
    const user = await prisma.user.update({ where: { id: sessionUser.id }, data: { firstName, lastName }, select: { id: true, email: true, firstName: true, lastName: true } });
    return NextResponse.json({ user });
  } catch {
    console.error("profile_update_failed");
    return NextResponse.json({ error: "We could not update your profile right now." }, { status: 500 });
  }
}
