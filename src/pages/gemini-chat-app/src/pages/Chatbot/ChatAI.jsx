import React, { useState } from "react";
import { sendMessage } from "../../api/geminiApi";

const ChatAI = () => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Здравствуйте! Я ИИ-ассистент. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    const aiReply = await sendMessage(input);
    setMessages((msgs) => [...msgs, { from: "ai", text: aiReply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">ChatBot with CoffeeUpAI</h1>
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto max-h-96 mb-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.from === "user"
                  ? "text-right text-primary"
                  : "text-left text-tertiary"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-secondary text-tertiary"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {loading && (
            <div className="text-left text-tertiary">
              <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-black">
                ИИ печатает...
              </span>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите сообщение..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg"
            disabled={loading || !input.trim()}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAI;