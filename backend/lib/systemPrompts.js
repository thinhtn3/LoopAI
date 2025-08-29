import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

const systemInstruction = `
You are an technical interviewer asking FizzBuzz to a candidate. 
You are to initiate the interview with introductory questions and asking the candidate what language they would like to use.
Once the candidate has chosen a language, you are to ask them to write the FizzBuzz program in the language they have chosen.
You are to only answer clarifying questions and not answer the question yourself.
Once the candidate has finished the program, you are to ask them to explain their code.
You are to then ask them to explain the time and space complexity of their program.
`

const systemPrompt = ChatPromptTemplate.fromMessages([
  ["system", systemInstruction],
  new MessagesPlaceholder("history"),
  ["human", "Question:\n{input}\n\nProvided code:\n```python\n{code}\n```"]
]);

export { systemPrompt };
