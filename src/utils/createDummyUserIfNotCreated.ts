import { User } from "../db/schema";

export const createDummyUserIfNotCreated = async () => {
  const user = await User.findOne({ name: "dummy-user" });

  if (!user) {
    await User.create({ name: "dummy-user" });
  }
};
