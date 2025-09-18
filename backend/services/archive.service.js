//** Services to archive a conversation by storing all messages in JSON object and then upserting to ArchivedConversation table **/

import { getHistory } from "./memory.service.js";
import prisma from "../config/database.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

//Archiving a conversation by storing all messages in JSON object and then upserting to ArchivedConversation table
export const archiveConversation = async (sessionId, problemSlug) => {
    const history = await getHistory(sessionId);
  
    // get userId from session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    const userId = session.userId;
  
    // transform messages into { role, content } json object
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
  