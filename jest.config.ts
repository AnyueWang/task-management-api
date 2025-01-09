import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.ts"],
  setupFiles: ["dotenv/config"], // Automatically loads .env.test
};

export default config;
