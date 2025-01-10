import { userModel } from "../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidators } from "../validators/userValidators";

// secret key for JWT token
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error(
    "JWT_SECRET_KEY is not defined in the environment variables."
  );
}

export const userResolvers = {
  Mutation: {
    // user registration
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
      // run validators related to user registration
      registerValidators(name, email, password, password_confirmation);

      // hash password before storing it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return await userModel.register(name, email, hashedPassword);
    },

    // user login
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await userModel.findByEmail(email);

        // password validation
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Password incorrect!");
        }

        //generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
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
