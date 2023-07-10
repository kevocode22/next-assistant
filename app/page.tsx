"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function Home() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  async function handleChange(e) {
    e.preventDefault();
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: ``,
          },
          { role: "user", content: `Chat: ${prompt}` },
        ],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
    setPrompt("");
  }
  return (
    <div className="min-h-screen mx-auto my-8 max-w-4xl">
      <h1 className="text-center mb-4 text-2xl">Next Assistant AI</h1>
      <div className="flex justify-center items-center">
        <form method="post" onSubmit={handleChange}>
          <input
            id="input-next"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="rounded border p-2 mr-2 text-black w-full"
          />
          <button
            className="rounded border border-black dark:border-white p-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4 whitespace-pre-wrap">{result}</div>
    </div>
  );
}
