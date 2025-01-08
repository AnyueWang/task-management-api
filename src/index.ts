import { startServer } from "./server";
import { connect, db } from "./config/db";

try {
  startServer();
} catch (error) {
  console.error("Failed to start server: ", error);
}

async function testDbConnection() {
  await connect();
}

testDbConnection();
