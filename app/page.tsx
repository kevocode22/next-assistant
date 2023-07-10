"use client";
import useLLM from "usellm";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState("");

  async function handleChange(e: any) {
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

  const handleCopy = () => {
    setCopied(result);
    navigator.clipboard.writeText(result);
    setTimeout(() => setCopied("false"), 3000);
  };

  return (
    <div className="my-8 max-w-screen flex justify-center items-center flex-col">
      <div className="space-y-28 py-30">
        <div className="flex justify-center items-center flex-col w-full">
          <Image
            className="mr-2"
            src="/logo.png"
            width={30}
            height={30}
            alt="Next Assistant Logo"
          />
          <h1 className="font-logo">Next Assistant AI</h1>

          <p className="font_title">Discover the power of advanced AI</p>
          <p className="desc">
            Obtain precise and relevant answers to your queries within seconds
          </p>

          <p className="desc"></p>
        </div>
        <div className="flex justify-center items-center">
          <form method="post" onSubmit={handleChange} className="flex w-full">
            <input
              id="input-next"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your querie..."
              className="rounded border-black p-2 mr-2 text-black w-full shadow-2xl "
            />
            <button
              className="rounded w-24 text-white font-medium bg-black"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 whitespace-pre-wrap w-7/12">

        <div className="cursor-pointer flex justify-between" onClick={handleCopy}>
          <p className="font-semibold pl-30">Next Assistant:</p>
          {copied == result ? "✅" : "📋" }
        
        </div>
        <p className="text-center">{result}</p>
      </div>
    </div>
  );
}
