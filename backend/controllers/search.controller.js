import "dotenv/config";
import { HTTP_STATUS_CODES } from "../constants/index.js";

import { searchByKeyword } from "../services/search.service.js";


export const searchKeywordController = async (req, res) => {
    const { keyword } = req.query;
    console.log("Searching for keyword:", keyword);
    const problems = await searchByKeyword(keyword.toLowerCase().trim());
    return res.status(HTTP_STATUS_CODES.SUCCESS).json({ problems });
};

