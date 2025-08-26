import axios from "axios";

export async function runPython(code, stdin = "") {
  console.log(code);
  const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: "python",
    version: "3.10.0",
    files: [{ content: code }],
    stdin,
  });
  return res.data;
}
