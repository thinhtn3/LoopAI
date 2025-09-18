import { archiveConversation } from "../services/archive.service.js";
import { deleteSession } from "../services/sessions.service.js";
import { deleteCurrentHistory } from "../services/memory.service.js";
import { supabase } from "../lib/supabase.js";
import { getSession } from "../services/sessions.service.js";

export const archiveController = async (req, res) => {
  const { problemSlug } = req.body;
  const token = req.cookies["sb-access-token"];
  const { data, error } = await supabase.auth.getUser(token);
  const userId = data.user.id;
  const session = await getSession(userId, problemSlug);
  const sessionId = session.id;
  const archivedConversation = await archiveConversation(sessionId, problemSlug);
  res.json({ archivedConversation });
};

export const deleteSessionController = async (req, res) => {
  const { problemSlug } = req.query;
  const token = req.cookies["sb-access-token"];
  const { data, error } = await supabase.auth.getUser(token);
  const userId = data.user.id;
  const session = await getSession(userId, problemSlug);
  const sessionId = session.id;
  const deletedCurrentHistory = await deleteCurrentHistory(sessionId);
  const deletedSession = await deleteSession(sessionId);
  res.json({ deletedSession, deletedCurrentHistory });
};