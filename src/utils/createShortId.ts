import { customAlphabet } from "nanoid";

export const createShortId = (size?: number): string =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
    size || 7
  )();
