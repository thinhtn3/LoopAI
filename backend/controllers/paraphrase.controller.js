import { paraphrase } from "../lib/paraphrase.js";

export const paraphraseController = async (req, res) => {
  const { slug } = req.query;
  //validate slug
  if (!slug) {
    return res.status(400).json({ message: "Slug is required" });
  }
  //clean slug
  const cleanedSlug = slug.toLowerCase().trim();
  //call service
  const question = await paraphrase(cleanedSlug);
  res.json({ question });
};