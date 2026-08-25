export type AuthInput = { email: string; password: string };

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateName(value: unknown) {
  return typeof value === "string" && value.trim().length >= 2 && value.trim().length <= 60;
}

export function validatePassword(value: unknown) {
  return typeof value === "string" && value.length >= 8 && value.length <= 128;
}

export function parseProductId(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return null;
}
