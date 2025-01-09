import { userModel } from "../../models/userModel";
import bcrypt from "bcrypt";

export const userResolvers = {
  Mutation: {
    register: async (
      _: any,
      {
        name,
        email,
        password,
        password_confirmation,
      }: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
      }
    ) => {
      // throw error if password not matching
      if (password !== password_confirmation) {
        throw new Error("Passwords do not match!");
      }

      // hash password before storing it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return await userModel.register(name, email, hashedPassword);
    },
  },
};
