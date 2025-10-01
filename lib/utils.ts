import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedString(value: string) {
  const wallet = value +  process.env.NEXT_PUBLIC_STRING_KEY;
  const encode = Buffer.from(wallet.toLowerCase()).toString("hex");
  return encode;
}

export function decodedString(value: string) {
  const encode = Buffer.from(value, "hex").toString();
  const wallet = encode.substring(0, encode.length - 4);
  return wallet;
}
