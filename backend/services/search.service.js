import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchByKeyword = async (query) => {
  const problems = await prisma.problem.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive", //make case insensitive
      },
    },
    include: {
        tags: true, //include tags in the response
      },
  });
  return problems;
};
