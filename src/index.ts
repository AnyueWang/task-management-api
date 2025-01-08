import { startServer } from "./server";
import { connect } from "./config/db";

try {
  startServer();
} catch (error) {
  console.error("Failed to start server: ", error);
}
