
//** Services to create, get and delete from Session table **/

import { v4 as uuidv4 } from "uuid";
import prisma from "../config/database.js";
//Create or update a session if exist in Session table
export async function createSession(userId, problemSlug) {
  //upsert = update or insert
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

//Get session from Session table by userId and problemSlug
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

//Delete a session from Session table
export async function deleteSession(sessionId) {
  const deletedSession = await prisma.session.delete({
    where: { id: sessionId },
  });
  return deletedSession;
}
