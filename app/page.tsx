"use client";
import useLLM from "usellm";
import { useState } from "react";
import Image from "next/image";
import * as Scroll from "react-scroll";

export default function Home() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState("");
  const scroll = Scroll.animateScroll;

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
    <div className="container_Principal">
      <div className="space-y-28 py-30 max-h-screen">
        <div className="container_text_cta">
          <Image
            className="mr-2"
            src="/logo.png"
            width={30}
            height={30}
            alt="Next Assistant Logo"
          />
          <h1 className="font-logo">Next Assistant AI</h1>

          <p className="font_desc">Discover the power of advanced AI</p>
          <p className="desc">
            Obtain precise and highly relevant answers to all your queries
            within a matter of seconds, revolutionizing the way you seek
            information.
          </p>
          <Image
            alt="call-to-action"
            src="/arrowCta.gif"
            width={45}
            height={45}
            onClick={() => scroll.scrollTo(500)}
            className="ctaGif"
          />
        </div>
      </div>
      <div className="container_form">
        <form
          method="post"
          onSubmit={handleChange}
          className="flex w-full justify-center"
        >
          <input
            id="input-next"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your querie..."
          
          />
          <button
            className="rounded w-24 text-white font-medium bg-black"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-between w-5/6 mt-10">
            <p className="font-semibold">Next Assistant:</p>
            <div
              className="cursor-pointer flex justify-between"
              onClick={handleCopy}
            >
              {copied == result ? "✅" : "📋"}
            </div>
          </div>
        <div className="container_answer">
          <p className="text-left">{result}</p>
        </div>
      </div>
          </div>
  );
}
