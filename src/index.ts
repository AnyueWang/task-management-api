import { startServer } from "./server";

try {
  startServer();
} catch (error) {
  console.error("Failed to start server: ", error);
}
