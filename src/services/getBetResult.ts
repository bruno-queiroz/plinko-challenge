import { getMultiplier } from "../core/bet/getMultiplier";
import { User } from "../db/schema";

interface ChosenBetOptions {
  bet: number;
  rows: number;
  risk: "low" | "medium" | "high";
}

export const getBetResult = async (chosenBetOptions: ChosenBetOptions) => {
  const user = await User.findOne({ name: "dummy-user" });

  if (!user) throw new Error();

  const currentNonce = user.nonce;
  const randomMultiplier = getMultiplier({
    risk: chosenBetOptions.risk,
    rows: chosenBetOptions.rows,
    serverSeed: user.serverSeed,
    clientSeed: user.clientSeed,
    count: chosenBetOptions.rows + 1,
    cursor: 0,
    nonce: user.nonce,
  });

  user.nonce = user.nonce + 1;
  await user.save();

  return {
    result: chosenBetOptions.bet * randomMultiplier,
    serverSeed: user.serverSeed,
    clientSeed: user.clientSeed,
    nonce: currentNonce,
  };
};
