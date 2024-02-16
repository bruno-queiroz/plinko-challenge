import { Request, Response } from "express";
import { betSchema } from "../validators/betSchema";
import { getBetResult } from "../services/getBetResult";

export const getBet = async (req: Request, res: Response) => {
  try {
    const betOptions = betSchema.parse(req.query);

    const { result, clientSeed, serverSeed, nonce } =
      await getBetResult(betOptions);

    res.status(200).json({
      data: {
        options: req.query,
        result,
        fairness: {
          serverSeed,
          clientSeed,
          nonce,
        },
      },
      msg: "The bet was made successfully.",
      isOk: true,
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      msg: "Something went wrong with your bet.",
      isOk: false,
    });
  }
};
