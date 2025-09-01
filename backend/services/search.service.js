import "dotenv/config";
import axios from "axios";

export const searchByKeyword = async (query) => {
    const response = await axios.get(`${process.env.NOWORNEVEREV_API_URL}/search?query=${query}`);
    return response.data;
}