import { randomBytes } from "node:crypto";

export const generateSeed = (bytes: number) => {
  const seed = randomBytes(bytes);

  return seed.toString("hex");
};
