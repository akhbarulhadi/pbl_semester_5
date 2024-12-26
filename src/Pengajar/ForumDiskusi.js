import React, { useState, useEffect } from "react";
import FacebookComments from '../FacebookComments';

const ForumDiskusi = ({ numPosts, width }) => {
  const [courses, setCourses] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [url, setUrl] = useState(''); // State untuk URL dinamis
  const pageUrl = "https://6233-180-252-60-63.ngrok-free.app/pengguna/kursus/"; //! INI URL halaman yang di pengguna
  // const pageUrl = "http://localhost:3000/pengguna/kursus/";
  const appId = "1133575711778198";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('/api/pengajar/courses/list-courses/forum-diskusi', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          // Handle token expiration
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
            response = await fetch('/api/pengajar/courses/list-courses/forum-diskusi', {
              method: 'GET',
              credentials: 'include',
            });
          } else {
            throw new Error('Refresh token failed');
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCourses();
  }, []);

  // Update URL for comments when activeTopic changes
  useEffect(() => {
    if (activeTopic) {
      const newUrl = `${pageUrl}${activeTopic.id_course}`;
      setUrl(newUrl);
    }
  }, [activeTopic]);

  // Handle selecting a course
  const handleSelectTopic = (course) => {
    setActiveTopic(course);
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeTopic) {
      // Logic for sending a message to the topic (you can implement this if required)
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-2xl font-bold p-4 border-b text-gray-800">List Course</h2>
        {courses.map((course) => (
          <div
            key={course.id_course}
            className={`p-4 cursor-pointer ${activeTopic?.id_course === course.id_course ? "bg-gray-200" : ""}`}
            onClick={() => handleSelectTopic(course)}
          >
            <h3 className="text-md font-semibold text-gray-600">{course.course_title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {course.course_description}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {activeTopic ? (
          <>
            <div className="flex-shrink-0 p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">{activeTopic.course_title}</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
              <FacebookComments
                href={url}
                numPosts={numPosts || 10}
                width={width || "100%"}
                appId={appId}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Pilih kursus untuk memulai diskusi
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDiskusi;
