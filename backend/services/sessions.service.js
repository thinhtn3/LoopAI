import { supabase } from "../lib/supabase.js";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/database.js";

export async function createSession(userId) {
    const newSession = await prisma.session.create({
        data: {
            id: uuidv4(),
            title: "New Session",
            model: "gemini-2.5-flash",
            userId,
        },
    });
    return newSession;
}

//get session by userId and return session
export async function getSession(userId) {
    const session = await prisma.session.findUnique({
        where: { userId },
    });
    return session;
}

