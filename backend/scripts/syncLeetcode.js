import "dotenv/config";
import axios from "axios";
import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();
const graphql = `https://leetcode.com/graphql`;
const queryProblemSet = `
    query problemsetQuestionListV2(
        $categorySlug: String, 
        $skip: Int, 
        $limit: Int
        ) {
            problemsetQuestionListV2(categorySlug: $categorySlug, skip: $skip, limit: $limit) {
                hasMore
                questions {
                title
                titleSlug
                difficulty
                paidOnly
                questionFrontendId
                topicTags { name slug }
        }
    }
    }
`;

const fetchPage = async (limit, skip) => {
  const headers = {
    "content-type": "application/json",
    "user-agent": "Mozilla/5.0",
    origin: "https://leetcode.com",
    referer: "https://leetcode.com/",
    "x-csrftoken": process.env.LEETCODE_CSRF_TOKEN,
    cookie: `LEETCODE_SESSION=${process.env.LEETCODE_SESSION}; csrftoken=${process.env.LEETCODE_CSRF_TOKEN};`,
  };
  const response = await axios.post(
    graphql,
    {
      query: queryProblemSet,
      variables: {
        categorySlug: "",
        limit: limit,
        skip: skip,
      },
    },
    { headers }
  );
  const page = response.data.data.problemsetQuestionListV2.questions;
  return page;
};

const uploadFirstPage = async () => {
    const firstPage = await fetchPage(50, 0);

    for (const question of firstPage) {
        //Upsert problem to DB
        await prisma.problem.upsert({
            where: { slug: question.titleSlug}, //unique identifier
            // if the problem already exists, update it
            update: {
                title: question.title,
                url: `https://leetcode.com/problems/${question.titleSlug}`,
                difficulty: question.difficulty,
                //Since problem and tag have many-to-many relationship, use connectOrCreate to check if tag exists in tag table then link
                //This lets us know to look at the tag table before linking
                tags: {
                    //connectOrCreate: if tag does not exist, create it then link
                    connectOrCreate: question.topicTags.map((tag) => ({ where: { name: tag.name }, create: { name: tag.name } })),
                },
                frontendId: question.questionFrontendId,
            },
            
            // if the problem does not exist, create it
            create: {
                slug: question.titleSlug,
                title: question.title,
                url: `https://leetcode.com/problems/${question.titleSlug}`,
                difficulty: question.difficulty,
                //where should be unique
                tags: {
                    connectOrCreate: question.topicTags.map((tag) => ({ where: { name: tag.name }, create: { name: tag.name } })),
                },
                frontendId: question.questionFrontendId,
            },
        });
    }
    console.log("Uploaded first page");
}

const p = async () => {
    return prisma.problem.findUnique({
        where: { slug: "two-sum" },
    });
}

//Search problem by tag
const rows = await prisma.problem.findMany({
    where: { tags: { some: { name: { in: ['Dynamic Programming'] } } } },
  });

console.log(rows);