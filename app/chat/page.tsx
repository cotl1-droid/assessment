"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket: any;

export default function Chat() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on("chat message", (msg: { user: string; text: string }) => {
      setMessages(prev => [...prev, msg]);
    });

    // Check subscription
    axios.get("/api/user/me").then(res => {
      setCanSend(res.data.subscription === "pro");
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (canSend && input.trim()) {
      socket.emit("chat message", { user: "Me", text: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-2">Global Chat</h1>
      <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((m, i) => (
          <div key={i}><strong>{m.user}: </strong>{m.text}</div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2"
          placeholder={canSend ? "Type a message..." : "Upgrade to Pro to chat"}
          disabled={!canSend}
        />
        <button onClick={sendMessage} disabled={!canSend} className="bg-blue-500 text-white p-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
}
