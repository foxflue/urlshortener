import { createHmac, randomBytes } from "crypto";

export const randomString = (size?: number): string =>
  randomBytes(size || 16).toString("hex");

const salt: string = process.env.SALT as string;

export const hashText = (text: string): string =>
  createHmac("sha256", salt).update(text).digest("hex");
