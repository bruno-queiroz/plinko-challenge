import { ByteGenerator, byteGenerator } from "./byteGenerator";
import _ from "lodash";

type GenerateFloats = ByteGenerator & { count: number };

// Convert the hash output from the rng byteGenerator to floats
export function generateFloats({
  serverSeed,
  clientSeed,
  nonce,
  cursor,
  count,
}: GenerateFloats) {
  // Random number generator function
  const rng = byteGenerator({ serverSeed, clientSeed, nonce, cursor });
  // Declare bytes as empty array
  const bytes = [];

  // Populate bytes array with sets of 4 from RNG output
  while (bytes.length < count * 4) {
    bytes.push(rng.next().value);
  }

  // Return bytes as floats using lodash reduce function
  return _.chunk(bytes, 4).map((bytesChunk) =>
    bytesChunk.reduce((result, value, i) => {
      const divider = 256 ** (i + 1);
      const partialResult = value! / divider;
      return result! + partialResult;
    }, 0),
  );
}
