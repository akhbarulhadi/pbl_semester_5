import React, { useState } from 'react';

const ForumDiskusi = () => {
  // State for managing new message input
  const [newMessage, setNewMessage] = useState('');
  // State for managing replies
  const [replyState, setReplyState] = useState({});
  // State for tracking which message is being replied to
  const [replyTo, setReplyTo] = useState(null);

  // Handler for new message submission
  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Process new message (e.g., send to server or update state)
      alert(`New message: ${newMessage}`);
      setNewMessage(''); // Clear the input after submission
    }
  };

  // Handler for showing reply input
  const handleReplyClick = (index) => {
    setReplyTo(index);
  };

  // Handler for reply submission
  const handleReplySubmit = (e, index) => {
    e.preventDefault();
    const replyText = replyState[index];
    if (replyText?.trim()) {
      // Process the reply (e.g., send to server or update state)
      alert(`Reply to message ${index}: ${replyText}`);
      setReplyState((prev) => ({ ...prev, [index]: '' })); // Clear the reply input after submission
      setReplyTo(null); // Hide the reply input field
    }
  };

  return (
    <div>
      {/* Forum Diskusi Section */}
        <div className="w-full px-4 py-16 md:px-8 md:py-20">
          {/* Intro Text */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold font-poppins text-[#030712] mb-4">
              Forum Diskusi
            </h1>
            <p className="text-xl text-[#3f3f46] font-poppins">
              Fitur forum diskusi ini dirancang untuk memberikan Anda platform yang mudah diakses<br />
              untuk mengajukan pertanyaan, berbagi pemikiran, dan berdiskusi tentang berbagai topik.<br />
              Apakah Anda memiliki pertanyaan tentang modul pelatihan kami? Inilah tempatnya.
            </p>
          </div>

          {/* Chat-like Testimonials Heading */}
          <div className="mx-auto mb-6 flex max-w-3xl flex-col text-center md:mb-10 lg:mb-12">
            <h2 className="text-3xl font-bold md:text-5xl">
              Apa yang dikatakan klien kami?
            </h2>
          </div>

          {/* Testimonials Content */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Testimonial Item */}
            {[...Array(6).keys()].map((index) => (
              <div key={index} className={`relative bg-white p-4 rounded-lg shadow-md transition-transform duration-300 transform ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'} hover:scale-105`}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-transparent rounded-lg -z-10"></div>
                <div className="flex flex-col">
                  <div className="mb-4 bg-white p-4 rounded-lg shadow-inner">
                    <p className="text-base">
                      “Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis”
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                      alt="Client Avatar"
                      className="mr-4 h-12 w-12 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-base font-bold">Laila Bahar</h6>
                      <p className="text-sm text-gray-500">Designer</p>
                    </div>
                  </div>
                </div>
                {/* Reply Button */}
                <button
                  className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleReplyClick(index)}
                >
                  Reply
                </button>
                {/* Reply Input */}
                {replyTo === index && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, index)}
                    className="mt-4 bg-white p-4 rounded-lg shadow-md"
                  >
                    <textarea
                      rows="2"
                      value={replyState[index] || ''}
                      onChange={(e) => setReplyState((prev) => ({ ...prev, [index]: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                      placeholder="Tulis balasan Anda di sini..."
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      Kirim Balasan
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>

          {/* New Message Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold font-poppins text-[#030712] mb-4">
              Mulai Pesan Baru
            </h3>
            <form onSubmit={handleNewMessageSubmit} className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                placeholder="Tulis pesan Anda di sini..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default ForumDiskusi;
