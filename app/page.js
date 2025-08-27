"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SimpleChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollerRef = useRef(null);

  // Auto-scroll when new message
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  // Send message
  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const yourMsg = { id: crypto.randomUUID(), who: "you", text: trimmed, at: t };
    setMessages((m) => [...m, yourMsg]);
    setInput("");

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();

      const botMsg = { id: crypto.randomUUID(), who: "bot", text: data.text, at: t };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          who: "bot",
          text: "⚠️ Sorry, I couldn't fetch a response.",
          at: t,
        },
      ]);
    }
  };

  // Enter key support
  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B10] text-white grid place-items-center py-10 px-6">
      <main className="w-full max-w-[900px]">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
          Simple Chat
        </h1>

        {/* Chat Box */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-black/40">
          {/* Messages */}
          <div
            ref={scrollerRef}
            className="h-[520px] overflow-y-auto px-5 sm:px-8 pt-6 pb-28 space-y-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            {messages.map((m) => (
              <Message key={m.id} m={m} />
            ))}
          </div>

          {/* Input */}
          <div className="sticky bottom-0 w-full px-4 sm:px-6 pb-5">
            <div className="mx-auto flex max-w-[880px] items-center gap-3 rounded-2xl bg-[#14121A] px-4 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none placeholder:text-slate-400 text-lg"
              />
              <button
                onClick={send}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-700 hover:bg-indigo-600 active:scale-95 transition"
                aria-label="Send"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Message Bubble
function Message({ m }) {
  const isYou = m.who === "you";

  return (
    <div className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] ${isYou ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`${
            isYou ? "bg-indigo-700 text-white" : "bg-[#1E1E2E] text-slate-200"
          } rounded-2xl px-5 py-4 shadow-sm`}
        >
          <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    p({ node, children, ...props }) {
      return <div {...props}>{children}</div>;
    },
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match?.[1] || "text"}
          PreTag="div"
          className="rounded-lg mb-2"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-slate-700 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {m.text}
</ReactMarkdown>

        </div>
        <div className={`mt-1 text-xs ${isYou ? "text-indigo-300" : "text-slate-400"}`}>
          {m.at}
        </div>
      </div>
    </div>
  );
}







