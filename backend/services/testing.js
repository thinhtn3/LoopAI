// testMemory.mjs
import dotenv from "dotenv";
dotenv.config();

import chainWithMemory from "../lib/chain.js"; // adjust path
const sessionId = "test-user-123";

async function run() {
  const turn1 = await chainWithMemory.invoke(
    { input: "My favorite player is Lebron James" },
    { configurable: { sessionId } }
  );

  const turn2 = await chainWithMemory.invoke(
    { input: "I do not like baseball" },
    { configurable: { sessionId } }
  );

  const turn3 = await chainWithMemory.invoke(
    { input: "I like eggs" },
    { configurable: { sessionId } }
  );

  const turn4 = await chainWithMemory.invoke(
    { input: "What is my least favorite sport and who is my favorite player?" },
    { configurable: { sessionId } }
  );
  console.log("Turn4:", turn4);
}

run().catch(console.error);