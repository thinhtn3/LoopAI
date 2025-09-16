//Archive a conversation by calling session.service.js to get session then memory.service.js to get history then create a new archived conversation, then delete the session
//after storing the archived conversation, delete the session

import { getHistory } from "./memory.service.js";
import prisma from "../config/database.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid";

export const archiveConversation = async (sessionId, problemSlug) => {
    const history = await getHistory(sessionId);
    //get userId from session
    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
    });
    const userId = session.userId;
    const data = [];
    history.messages.forEach((message) => {
        data.push({
            role: message instanceof HumanMessage ? "user" : "model",
            content: message.content,
        });
    });
    console.log("data", data);

    const archivedConversation = await prisma.archivedConversation.create({
        data: { 
            sessionId,
            userId,
            data,
            problemSlug,
        },
    });
    return archivedConversation;
};