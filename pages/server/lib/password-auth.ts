import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: any) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function hashEmail(email: any) {
  const hashedEmail = await hash(email, 12);
  return hashedEmail;
}

export default function _() {}
