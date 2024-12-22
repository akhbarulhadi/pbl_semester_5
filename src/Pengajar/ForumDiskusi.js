import React, { useState } from "react";

const ForumDiskusi = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Tips Memperbaiki iPhone",
      content: [
        { text: "Bagaimana cara mengganti layar iPhone X?", sender: "User 1" },
        { text: "Pastikan Anda menggunakan alat khusus.", sender: "User 2" },
      ],
    },
    {
      id: 2,
      title: "Masalah dengan MacBook",
      content: [
        { text: "MacBook saya tidak mau menyala, apa solusinya?", sender: "User 2" },
        { text: "Coba reset SMC dan PRAM telebih dahulu.", sender: "User 1" },
      ],
    },
  ]);

  const [activeTopic, setActiveTopic] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSelectTopic = (topic) => {
    setActiveTopic(topic);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeTopic) {
      const updatedTopics = topics.map((topic) =>
        topic.id === activeTopic.id
          ? {
              ...topic,
              content: [
                ...topic.content,
                { text: newMessage, sender: "Me" },
              ],
            }
          : topic
      );
      setTopics(updatedTopics);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-2xl font-bold p-4 border-b text-gray-800">Topik Diskusi</h2>
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-4 cursor-pointer ${
              activeTopic?.id === topic.id ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSelectTopic(topic)}
          >
            <h3 className="text-md font-semibold text-gray-600">{topic.title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {topic.content[topic.content.length - 1]?.text}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {activeTopic ? (
          <>
            <div className="flex-shrink-0 p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">{activeTopic.title}</h3>
              {/* <p className="text-sm text-gray-500">Oleh: {activeTopic.author}</p> */}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
              {activeTopic.content.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.sender === "Me" ? "items-end" : "items-start"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      message.sender === "Me" ? "text-blue-500" : "text-green-500"
                    }`}
                  >
                    {message.sender}
                  </span>
                  <div
                    className={`px-4 py-2 rounded-lg max-2-xs ${
                      message.sender === "Me"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className="flex items-center p-4 border-t bg-gray-50"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-400 text-gray-800"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Kirim
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Pilih topik diskusi untuk memulai percakapan
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDiskusi;