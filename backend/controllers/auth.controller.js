import { HTTP_STATUS_CODES } from "../constants/index.js";
import { createSession, getSession } from "../services/sessions.service.js";
import { supabase } from "../lib/supabase.js";

//Create or return session for a user (a session is a conversation with a problem)
export const authController = async (req, res) => {

  const { problemSlug } = req.body;
  const token = req.cookies["sb-access-token"];
  if (!token) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "User ID is required" });
  }
  const { data, error } = await supabase.auth.getUser(token);
  const userId = data.user.id;
  //check if session exist with userId and return session
  const session = await getSession(userId, problemSlug);

  if (!session) {
    await createSession(userId, problemSlug);
    return res.status(HTTP_STATUS_CODES.SUCCESS);
  }

  return res
    .status(HTTP_STATUS_CODES.SUCCESS);
};

//Sign in a user with email and password, then set cookies
export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: error.message });
  }
  //set cookies: store access token in cookies to authenticate user and prevent CSRF attacks
  res.cookie("sb-access-token", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });

  res.cookie("sb-refresh-token", data.session.refresh_token, {
    httpOnly: true,
  });

  //return user data to client
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ user: data.user });
};

//Logout a user by clearing cookies
export const logoutController = async (req, res) => {
  const { data, error } = await supabase.auth.signOut();
  if (error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: error.message });
  }
  res.clearCookie("sb-access-token");
  res.clearCookie("sb-refresh-token");
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: "Logged out" });
};

//Get user data from cookies
export const meController = async (req, res) => {
  const token = req.cookies["sb-access-token"];
  if (!token) {
    console.log("No token found");
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "User ID is required" });
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: error.message });
  }
  return res.status(HTTP_STATUS_CODES.SUCCESS).json({ user: data.user });
};