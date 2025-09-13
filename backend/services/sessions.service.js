import { supabase } from "../lib/supabase.js";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/database.js";

export async function createSession(userId, problemSlug) {
  console.log(problemSlug, "POOO");
  const newSession = await prisma.session.upsert({
    where: {
      userId_problemSlug: {
        userId,
        problemSlug,
      },
    },
    update: {
      model: "gemini-2.5-flash",
    },
    create: {
      id: uuidv4(),
      userId,
      problemSlug,
      model: "gemini-2.5-flash", // if it doesn't exist, create this new row
    },
  });
  return newSession;
}

//get session by userId and return session
export async function getSession(userId, problemSlug) {
  const session = await prisma.session.findUnique({
    where: {
      userId_problemSlug: {
        userId: userId,
        problemSlug: problemSlug,
      },
    },
  });

  return session;
}
