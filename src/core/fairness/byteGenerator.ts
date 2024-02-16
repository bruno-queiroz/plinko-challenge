import { createHmac } from "node:crypto";

export interface ByteGenerator {
  serverSeed: string;
  clientSeed: string;
  nonce: string;
  cursor: number;
}

// Random number generation based on following inputs: serverSeed, clientSeed, nonce and cursor
export function* byteGenerator({
  serverSeed,
  clientSeed,
  nonce,
  cursor,
}: ByteGenerator) {
  // Setup curser variables
  let currentRound = Math.floor(cursor / 32);
  let currentRoundCursor = cursor;
  currentRoundCursor -= currentRound * 32;

  // Generate outputs until cursor requirement fullfilled
  while (true) {
    // HMAC function used to output provided inputs into bytes
    const hmac = createHmac("sha256", serverSeed);
    hmac.update(`${clientSeed}:${nonce}:${currentRound}`);
    const buffer = hmac.digest();

    // Update curser for next iteration of loop
    while (currentRoundCursor < 32) {
      yield Number(buffer[currentRoundCursor]);
      currentRoundCursor += 1;
    }
    currentRoundCursor = 0;
    currentRound += 1;
  }
}
