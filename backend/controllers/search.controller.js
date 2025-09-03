import "dotenv/config";
import { HTTP_STATUS_CODES } from "../constants/index.js";

import { searchByKeyword } from "../services/search.service.js";


export const searchKeywordController = async (req, res) => {
    //validate
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Keyword is required" });
    }
    //clean
    const cleanedKeyword = keyword.toLowerCase().trim();
    //call service
    const problems = await searchByKeyword(cleanedKeyword);
    //return response
    return res.status(HTTP_STATUS_CODES.SUCCESS).json({ problems });
};

