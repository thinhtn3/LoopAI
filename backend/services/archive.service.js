//Archive a conversation by calling session.service.js to get session then memory.service.js to get history then create a new archived conversation, then delete the session
//after storing the archived conversation, delete the session

import { getHistory } from "./memory.service.js";
import prisma from "../config/database.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid";

export const archiveConversation = async (sessionId, problemSlug) => {
    const history = await getHistory(sessionId);
  
    // get userId from session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    const userId = session.userId;
  
    // transform messages into { role, content }
    const data = history.messages.map((message) => ({
      role: message instanceof HumanMessage ? "user" : "model",
      content: message.content,
    }));
  
    // Use upsert to avoid unique constraint crash
    const archivedConversation = await prisma.archivedConversation.upsert({
      where: { sessionId }, // unique constraint
      update: {
        data,         // update stored messages if already exists
        problemSlug,  // optional: keep slug updated
      },
      create: {
        sessionId,
        userId,
        data,
        problemSlug,
      },
    });
  
    return archivedConversation;
  };
  