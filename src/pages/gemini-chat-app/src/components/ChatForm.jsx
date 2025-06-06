import React, { useState } from "react";
import { sendMessage } from "../api/geminiApi";

const ChatForm = ({ onMessageSent }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(message);
      onMessageSent(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите ваше сообщение"
        className="flex-grow border rounded-l-lg p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-r-lg p-2">
        Отправить
      </button>
    </form>
  );
};

export default ChatForm;