import React from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() !== "") {
      socket.emit("newMessage", text);
      setText("");
    }
  };

  const inputRef = React.useRef(null);

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <h1 className="text-center">Simple Chat Application</h1>

      <section className="flex-1 overflow-y-auto">
        {messages.length > 0 ? (
          <div className="bg-black text-white p-4 ">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
        ) : null}
        <div ref={inputRef} />
      </section>

      <div className="flex p-3 gap-3 fixed bottom-0 left-0 right-0 bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="type your message..."
          className="border border-black w-full h-10"
        />

        <button
          ref={inputRef.current.click()}
          onClick={() => {
            sendMessage();
            inputRef.current.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-red-700 text-white px-10"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
