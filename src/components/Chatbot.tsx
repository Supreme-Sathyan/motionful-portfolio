import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Copy, Check, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`;

const SUGGESTED_PROMPTS = [
  "Summarize your resume",
  "Tell me about your projects",
  "What are your hackathon achievements?",
  "What tech stack do you use?",
  "How can I contact you?",
];

const INTRO_MESSAGE: Message = {
  id: "intro",
  role: "assistant",
  content:
    "Hi, I'm Sathyan's portfolio assistant. Ask me about projects, research, or achievements.",
  timestamp: new Date(),
};

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (resp.status === 429) {
      onError("Rate limit exceeded. Please wait a moment and try again.");
      return;
    }
    if (resp.status === 402) {
      onError("AI service temporarily unavailable. Please try again later.");
      return;
    }
    if (!resp.ok || !resp.body) {
      onError("Failed to connect to assistant. Please try again.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as
            | string
            | undefined;

          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;

        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as
            | string
            | undefined;

          if (content) onDelta(content);
        } catch {
          /* ignore */
        }
      }
    }

    onDone();
  } catch {
    onError("Connection error. Please check your network and try again.");
  }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-secondary/60"
      aria-label="Copy response"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-primary" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];

const messageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    transition: { duration: 0.35, ease: EASE_SMOOTH },
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Typing effect queue
  const typingQueueRef = useRef<string>("");
  const typingIntervalRef = useRef<number | null>(null);

  // Cursor blink state
  const [cursorVisible, setCursorVisible] = useState(true);

  // Sync typing dots
  const [isTyping, setIsTyping] = useState(false);

  // Smooth scroll
  const scrollToBottomSmooth = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottomSmooth();
  }, [messages, scrollToBottomSmooth]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cursor blinking logic
  useEffect(() => {
    if (!isTyping) return;

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [isTyping]);

  // Cleanup typing interval
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const historyForAPI = [...messages.filter((m) => m.id !== "intro"), userMsg].map(
      (m) => ({
        role: m.role,
        content: m.content,
      })
    );

    let assistantSoFar = "";
    const assistantId = crypto.randomUUID();

    const getPauseDelay = (char: string) => {
      if (char === ".") return 250;
      if (char === ",") return 120;
      if (char === "?" || char === "!") return 300;
      if (char === "\n") return 150;
      return 0;
    };

    const startTyping = () => {
      if (typingIntervalRef.current) return;

      setIsTyping(true);

      typingIntervalRef.current = window.setInterval(() => {
        if (!typingQueueRef.current.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }

          setIsTyping(false);
          setCursorVisible(false);
          return;
        }

        // Dynamic typing speed
        const queueLen = typingQueueRef.current.length;
        const speed = queueLen > 250 ? 8 : queueLen > 100 ? 4 : 1;

        const nextText = typingQueueRef.current.slice(0, speed);
        typingQueueRef.current = typingQueueRef.current.slice(speed);

        assistantSoFar += nextText;

        setMessages((prev) => {
          const exists = prev.some((m) => m.id === assistantId);

          if (exists) {
            return prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: assistantSoFar,
                  }
                : m
            );
          }

          return [
            ...prev,
            {
              id: assistantId,
              role: "assistant",
              content: assistantSoFar,
              timestamp: new Date(),
            },
          ];
        });

        // Pause after punctuation
        const lastChar = nextText[nextText.length - 1];
        const delay = getPauseDelay(lastChar);

        if (delay > 0 && typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;

          setTimeout(() => {
            startTyping();
          }, delay);
        }
      }, 18); // base typing speed
    };

    const upsertAssistant = (chunk: string) => {
      typingQueueRef.current += chunk;
      startTyping();
    };

    await streamChat({
      messages: historyForAPI,
      onDelta: (chunk) => upsertAssistant(chunk),
      onDone: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: error,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        setIsTyping(false);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([INTRO_MESSAGE]);
    setInput("");
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2.5 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            aria-label="Open chat assistant"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span className="text-sm font-medium tracking-tight">
              Ask about me
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed z-[9998] flex flex-col overflow-hidden",
              "border border-border/50 shadow-2xl",
              "bg-card/95 backdrop-blur-xl",
              "bottom-6 right-6 w-[400px] h-[560px] rounded-2xl",
              "max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:h-[85vh] max-sm:rounded-t-2xl max-sm:rounded-b-none"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Portfolio Assistant
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-md hover:bg-secondary/60 transition-colors duration-200"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-secondary/60 transition-colors duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => {
                  const isLast = idx === messages.length - 1;
                  const showCursor =
                    msg.role === "assistant" && isLast && isTyping;

                  return (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed group relative",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-secondary/60 text-foreground rounded-bl-sm"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5">
                            <ReactMarkdown>
                              {msg.content + (showCursor && cursorVisible ? "|" : "")}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}

                        {msg.role === "assistant" && msg.id !== "intro" && (
                          <div className="absolute -bottom-1 right-0 translate-y-full pt-1">
                            <CopyButton text={msg.content} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing indicator synced */}
              {(isLoading || isTyping) &&
                messages[messages.length - 1]?.role === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary/60 rounded-xl rounded-bl-sm px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground font-mono tracking-wide">
                          Typing
                        </span>
                        <span className="flex gap-0.5">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1 h-1 rounded-full bg-primary/60"
                              style={{
                                animation: `pulse 1.4s ease-in-out ${
                                  i * 0.2
                                }s infinite`,
                              }}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>

            {/* Suggested prompts */}
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.4,
                  ease: EASE_SMOOTH,
                }}
                className="px-4 pb-2 flex flex-wrap gap-1.5"
              >
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={isLoading}
                    className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input area */}
            <div className="px-4 pb-4 pt-2 border-t border-border/40">
              <div className="flex items-end gap-2 bg-secondary/40 rounded-xl px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none max-h-24 leading-relaxed disabled:opacity-50"
                  style={{ minHeight: "24px" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors duration-200 disabled:opacity-30 disabled:hover:bg-transparent flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
