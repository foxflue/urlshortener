import { createHash, randomBytes } from "crypto";

export const reandomText = () => randomBytes(64).toString("hex");
export const hashText = async (text: string) =>
  createHash("sha256").update(text).digest("hex");
