import { userModel } from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// secret key for JWT token
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error(
    "JWT_SECRET_KEY is not defined in the environment variables."
  );
}

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

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await userModel.findByEmail(email);

        // password validation
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Email or password wrong!");
        }

        //generate JWT token
        const token = jwt.sign({ email: user.email }, SECRET_KEY, {
          expiresIn: "1h",
        });

        return { user, token };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error login: ", error);
          throw new Error(error.message);
        } else {
          console.error("Error login: ", error);
          throw new Error(`Failed to login`);
        }
      }
    },
  },
};
