import { HTTP_STATUS_CODES } from "../constants/index.js";
import { createSession, getSession } from "../services/sessions.service.js";
import prisma from "../config/database.js";

const authController = async (req, res) => {
  //validate userId
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "User ID is required" });
  }
  //check if session exist with userId and return session
  const session = await getSession(userId);

  //if session does not exist, create a new session
  if (!session) {
    const newSession = await createSession(userId);
    return res
      .status(HTTP_STATUS_CODES.SUCCESS)
      .json({ session: newSession.id, userId: userId });
  }

  return res
    .status(HTTP_STATUS_CODES.SUCCESS)
    .json({ session: session.id, userId: userId });
};

export default authController;
