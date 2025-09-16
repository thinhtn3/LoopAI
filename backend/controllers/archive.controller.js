import { archiveConversation } from "../services/archive.service.js";
import { deleteSession } from "../services/sessions.service.js";
import { deleteCurrentHistory } from "../services/memory.service.js";

export const archiveController = async (req, res) => {
  const { sessionId, problemSlug } = req.body;
  console.log("Archive controller", sessionId);
  const archivedConversation = await archiveConversation(sessionId, problemSlug);
  res.json({ archivedConversation });
};

export const deleteSessionController = async (req, res) => {
  const { sessionId } = req.query;
  const deletedCurrentHistory = await deleteCurrentHistory(sessionId);
  console.log("Delete session controller", req.query);
  console.log("Delete session controller", sessionId);
  const deletedSession = await deleteSession(sessionId);
  res.json({ deletedSession, deletedCurrentHistory });
};