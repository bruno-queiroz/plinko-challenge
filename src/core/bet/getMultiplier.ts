import { generateFloats } from "../fairness/generateFloats";
import { options } from "./options";

type RowAmount = (typeof options)["low"];

interface GetMultiplier {
  rows: number;
  risk: "low" | "medium" | "high";
  serverSeed: string;
  clientSeed: string;
  nonce: string;
  cursor: number;
  count: number;
}

export const getMultiplier = ({
  risk,
  rows,
  clientSeed,
  count,
  cursor,
  nonce,
  serverSeed,
}: GetMultiplier) => {
  const multiplierAmount = rows + 1;
  let right = 0;
  let left = 0;

  const randomFloatValues = generateFloats({
    clientSeed,
    count,
    cursor,
    nonce,
    serverSeed,
  });

  randomFloatValues.forEach((float) => {
    const direction = Math.floor(float! * 2);

    if (direction === 0) return left++;
    if (direction === 1) return right++;
  });
  let multiplierIndex: keyof number[] = -1;

  if (right > left) {
    multiplierIndex = multiplierAmount - left;
  } else {
    multiplierIndex = 0 + right;
  }

  return options[risk][rows as keyof RowAmount][multiplierIndex];
};
