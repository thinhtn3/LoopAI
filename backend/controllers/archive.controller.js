import { archiveConversation } from "../services/archive.service.js";
import { deleteSession, getSession } from "../services/sessions.service.js";
import { deleteCurrentHistory } from "../services/memory.service.js";
import { supabase } from "../lib/supabase.js";

//Helper function to verify and find sessionId
const verifySessionId = async (req, res, problemSlug) => {
  const token = req.cookies["sb-access-token"];
  const { data, error } = await supabase.auth.getUser(token);
  const userId = data.user.id;
  const session = await getSession(userId, problemSlug);
  const sessionId = session.id;
  return { sessionId, problemSlug };
};
//Archive a conversation
export const archiveController = async (req, res) => {
  const { problemSlug } = req.body;
  const { sessionId } = await verifySessionId(req, res, problemSlug);
  const archivedConversation = await archiveConversation(
    sessionId,
    problemSlug
  );
  res.json({ archivedConversation });
};

//Delete a session
export const deleteSessionController = async (req, res) => {
  const { problemSlug } = req.query;
  const { sessionId } = await verifySessionId(req, res, problemSlug);
  const deletedCurrentHistory = await deleteCurrentHistory(sessionId);
  const deletedSession = await deleteSession(sessionId);
  res.json({ deletedSession, deletedCurrentHistory });
};
