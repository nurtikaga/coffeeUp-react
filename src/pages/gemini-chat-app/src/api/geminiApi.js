import axios from "axios";

const API_KEY = "AIzaSyARFEggOYCPOqdxoW6mpd66IQY5eBhHIfA"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
//https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: message }] }],
    });
    // Ответ Gemini приходит в response.data.candidates[0].content.parts[0].text
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Нет ответа от ИИ"
    );
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return "Ошибка при обращении к ИИ";
  }
};