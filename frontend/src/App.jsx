import React from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:5001");
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    socket.on("sendMessage", (sendedMessage) => {
      setMessages((prev) => [...prev, sendedMessage]);
    });
  }, [socket]);

  const handleMessage = () => {
    if (text !== "") {
      socket.emit("sendMessage", text);
      setText("");
      msgScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imgRef = React.useRef(null);
  const msgScroll = React.useRef(null);

  return (
    <div className="flex flex-col">
      <section className="h-[200px] w-[200px] overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="bg-black text-white">
            {msg}
          </div>
        ))}
        <div ref={msgScroll} />
      </section>

      <section className="fixed bottom-0 left-0 right-0 ">
        <button
          className="bg-red-900 text-white p-4 cursor-pointer"
          onClick={() => imgRef.current.click()}
        >
          Upload Image
        </button>

        <input type="file" accept="image/*" className="hidden" ref={imgRef} />

        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          name="msg"
          className="border-2 border-black p-4 text-lg m-3"
          placeholder="type message..."
        />
        <button
          onClick={handleMessage}
          className="bg-red-800 text-white text-lg p-4"
        >
          Send
        </button>
      </section>
    </div>
  );
};

export default App;
