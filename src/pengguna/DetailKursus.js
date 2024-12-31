import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FacebookComments from '../FacebookComments';

const SidebarDetailKursus = () => {
  const { id_course } = useParams();
  const [kursusData, setKursusData] = useState(null);
  const [activeContent, setActiveContent] = useState({ url: null, header: '', type: '' });
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [updatedModules, setUpdatedModules] = useState([]);
  const [hasCompletedCourse, setHasCompletedCourse] = useState(false); // state to track completion
  const [isGenerating, setIsGenerating] = useState(false); // Untuk menandai sedang memproses API
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [taskFile, setTaskFile] = useState(null);
  const pageUrl = "https://6233-180-252-60-63.ngrok-free.app/pengguna/kursus/";
  // const pageUrl = "http://localhost:3000/pengguna/kursus/";
  const appId = "1133575711778198";

  // Muat data dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem(`quiz_answers_${activeContent.moduleId}`)) || {};
    setSelectedAnswers(storedAnswers);
  }, [activeContent.moduleId]);

  // Simpan pilihan jawaban ke state dan localStorage
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [index]: value,
    };
    setSelectedAnswers(updatedAnswers);

    // Simpan ke localStorage
    localStorage.setItem(`quiz_answers_${activeContent.moduleId}`, JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Answers:", selectedAnswers); // Tambahkan log ini

    const moduleId = activeContent.moduleId;

    // Siapkan data quiz
    const quizzes = activeContent.soal.map((soal, index) => ({
      id_quiz: activeContent.id_quiz[index],
      answers: selectedAnswers[index],
    }));

    const requestData = {
      moduleId,
      quizzes,
    };

    const confirm = window.confirm(`
  Klik "OK" untuk mengirimkan jawaban Anda.
  Jika Anda masih ingin memeriksa kembali jawaban Anda, klik "Batal".

  Catatan: Setelah jawaban dikirim, Anda tidak dapat mengubahnya.
    `);

    if (!confirm) return;

    try {
      const response = await fetch(`/api/pengguna/certificate/quiz/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        alert('Jawaban berhasil dikirim!');
        window.location.reload();
      } else {
        console.error(result.error);
        alert('Gagal mengirim jawaban. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('An error occurred while submitting the quiz:', error);
    }
  };


  const handleSubmitTask = async (event) => {
    event.preventDefault();
  
    const moduleId = activeContent.moduleId;
    const kursusId = kursusData.id_course;
  
  
    const confirm = window.confirm(`
  Klik "OK" untuk mengirimkan jawaban Anda.
  Jika Anda masih ingin memeriksa kembali jawaban Anda, klik "Batal".
        
  Catatan: Setelah jawaban dikirim, Anda tidak dapat mengubahnya.
    `);
  
    if (!confirm) return;
  
    try {
      const formData = new FormData();
      formData.append("taskFile", taskFile);
      formData.append("moduleId", moduleId);
      formData.append("kursusId", kursusId);
  
      const response = await fetch(`/api/pengguna/certificate/upload/task`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result);
        alert('Jawaban berhasil dikirim!');
        window.location.reload(); // Refresh halaman jika berhasil
      } else {
        if (result.error === "Anda sudah upload difile ini") {
          alert("Gagal mengirim jawaban: Anda sudah mengunggah tugas untuk file ini sebelumnya.");
        } else {
          alert(`Gagal mengirim jawaban: ${result.error || "Terjadi kesalahan pada server."}`);
        }
      }
    } catch (error) {
      console.error('An error occurred while submitting the task:', error);
      alert('Terjadi kesalahan jaringan atau server. Silakan coba lagi.');
    }
  };
  

  const handleCertificateClick = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
  
    try {
      const response = await fetch(`/api/pengguna/certificate/${id_course}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Pastikan sesi pengguna di-backend terjaga
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        // Cek jika error adalah karena sertifikat sudah ada
        if (response.status === 400 && errorData.error === "Anda sudah memiliki sertifikat ini") {
          alert("Sertifikat sudah ada di database!");
        } else {
          throw new Error(errorData.error || "Gagal mengajukan sertifikat");
        }
      } else {
        // Berhasil menghasilkan sertifikat
        alert("Sertifikat berhasil diajukan!");
      }
    } catch (error) {
      // Menampilkan pesan error untuk kasus lainnya
      setErrorMessage(error.message);
      alert(error.message); // Tampilkan pesan error jika bukan karena sertifikat yang sudah ada
    } finally {
      setIsGenerating(false);
    }
  };
  



// Fungsi sederhana untuk memformat tanggal ke WIB
const formatToWIB = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
};

// Fungsi untuk menghitung status waktu
const calculateDaysLeft = (startDateString, endDateString) => {
  const now = new Date();
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Jika saat ini berada di antara startDate dan endDate
  if (now >= startDate && now <= endDate) {
    return 'Dimulai';
  }

  // Jika saat ini sebelum startDate
  if (now < startDate) {
    const diffInDays = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
    return `${diffInDays} hari lagi`;
  }

  // Jika saat ini setelah endDate
  const diffInDays = Math.ceil((now - endDate) / (1000 * 60 * 60 * 24));
  return `${diffInDays} hari yang lalu`;
};


  const extractYoutubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchKursusData = async () => {
      try {
        const response = await fetch(`/api/pengguna/courses/${id_course}`);
        const data = await response.json();
        setKursusData(data);
        setUpdatedModules(data.modules);

        // Check if course is completed
        const token = document.cookie.match(/token=([^;]*)/)?.[1];
        const completionResponse = await fetch(`/api/pengguna/${id_course}/completion`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const completionData = await completionResponse.json();
        setHasCompletedCourse(completionData.has_completed);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchKursusData();
  }, [id_course]);

  const handleModuleClick = async (module) => {
    let content = { url: null, header: '', type: '' };
    const correctAnswers = module.userQuizData?.correct_answers || 0;
    const wrongAnswers = module.userQuizData?.wrong_answers || 0;
    const totalQuestions = module.userQuizData?.total_questions || 0;
    const submitDate = module.userQuizData?.submit_quiz_date || null;

    if (module.type_link === 'youtube') {
      const videoId = extractYoutubeVideoId(module.link_video_youtube);
      content = videoId ? { 
        url: `https://www.youtube.com/embed/${videoId}`, 
        header: module.header,
        moduleId: module.id_modules,
        can_user_upload: module.can_user_upload, 
        type: 'youtube' } : content;
    } else if (module.type_link === 'zoom') {
      content = { 
        url: module.link_zoom, 
        header: module.header,
        start_date_online_class: module.start_date_online_class, 
        end_date_online_class: module.end_date_online_class, 
        type: 'zoom' };
    } else if (module.type_link === 'pdf') {
      const baseURL = 'http://localhost:5000/api'; // Ganti dengan base URL backend Anda
      content = { 
        url: `${baseURL}${module.file_module}`,
        url_file_task: `${baseURL}${module.uploadedTask}`,
        name_file_task: module.uploadedTask,
        header: module.header,
        moduleId: module.id_modules,
        can_user_upload: module.can_user_upload, 
        type: 'pdf' };
    } else if (module.type_link === 'kuis') {
      const baseURL = 'http://localhost:5000/api'; // Ganti dengan base URL backend Anda
      content = { 
        url: module.quiz.map(q => `${baseURL}${q.foto_soal}`), 
        foto_soal: module.quiz.map(q => q.foto_soal),
        id_quiz: module.quiz.map(q => q.id_quiz), 
        correct_answers: correctAnswers,
        wrong_answers: wrongAnswers,
        total_questions: totalQuestions,
        submit_quiz_date: submitDate,
        moduleId: module.id_modules, 
        header: module.header, 
        soal: module.quiz.map(q => q.soal), 
        a: module.quiz.map(q => q.a), 
        b: module.quiz.map(q => q.b), 
        c: module.quiz.map(q => q.c), 
        d: module.quiz.map(q => q.d), 
        type: 'kuis' 
      };
    }

    setActiveContent(content);

    const token = document.cookie.match(/token=([^;]*)/)?.[1];

    try {
      const response = await fetch(`/api/pengguna/courses/${id_course}/open-module/${module.id_modules}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);

        const updatedResponse = await fetch(`/api/pengguna/courses/${id_course}`);
        const updatedData = await updatedResponse.json();
        setUpdatedModules(updatedData.modules);
      }
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className="bg-gray-50 mt-9 min-h-screen font-poppins">
      {kursusData ? (
        <div className="">
          {/* Bagian Atas: Informasi Kursus */}
          <section className="relative w-full px-4 py-16 md:px-8 md:py-20 bg-[#E6EFDF]">
            <div className="flex items-start">
              <img
                src={`/api/${kursusData.image_url}`}
                alt={kursusData.course_title}
                className="w-90 h-64 object-cover rounded-lg mr-8"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{kursusData.course_title}</h1>
                <p className="text-gray-600 mb-6">{kursusData.course_description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">
                    <span className="font-semibold">Peserta:</span>{' '}
                    {kursusData.joinCount ? `${kursusData.joinCount} orang` : '0 orang'}
                  </p>
                  {!kursusData.online && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Tanggal Mulai:</span>{' '}
                      {kursusData.start_date
                        ? new Date(kursusData.start_date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Belum tersedia'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tombol Sertifikat */}
            <div className="absolute bottom-4 left-4">
              {updatedModules.every(module => module.isOpened) ? (
                <button
                onClick={handleCertificateClick}
                disabled={isGenerating}
                className={`py-3 px-6 font-semibold rounded-lg ${
                  isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
            {isGenerating ? "Sedang Memproses..." : "Ajukan Sertifikat"}
                </button>
              ) : (
                <a
                  href="#"
                  className="py-3 px-6 bg-gray-400 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                >
                  Selesaikan Pelatihan untuk Mendapatkan Sertifikat
                </a>
              )}
            </div>

            {/* Tombol Forum Diskusi */}
            <button
              // onClick={() => window.location.href = '/forum-diskusi'}
              onClick={()=>document.getElementById('forum_diskusi').showModal()}
              className="absolute bottom-4 right-4 bg-[#84D68E] text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Forum Diskusi
            </button>
            <dialog id="forum_diskusi" className="modal">
              <div className="modal-box w-11/12 max-w-5xl max-h-screen overflow-y-auto">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Forum Diskusi</h3>
                {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                <div className='text-center py-4'>
                  <FacebookComments href={`${pageUrl}${kursusData.id_course}`} numPosts={5} width="900" appId={appId} />
                </div>
              </div>
            </dialog>
          </section>

          {/* Bagian Konten: Video dan Tahapan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-start">
            {/* Sidebar Modul */}
            <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-6">
              <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Trailler</h2>
                <button
                  onClick={() => {
                    const videoId = extractYoutubeVideoId(kursusData.trailer_video_youtube);
                    const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                    setActiveContent({ url: videoUrl, header: 'Trailer Kelas', type: 'youtube' });
                  }}
                  className="w-full text-left py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 mb-3"
                >
                Trailer Kelas
                </button>                
              </div>
              {kursusData.modules && kursusData.modules.some(module => module.type_module === 'live_class_online') && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Class</h2>
                  <div>
                    {updatedModules
                      .filter(module => module.type_module === 'live_class_online') // Menambahkan filter untuk hanya modul dengan type_module 'live_class_online'
                      .map((module, index) => (
                        <button
                          key={module.id_modules}
                          onClick={() => handleModuleClick(module)}
                          className={`w-full text-left py-3 px-4 rounded-lg ${module.isOpened ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'} mb-3`}
                          disabled={index > 0 && !updatedModules[index - 1].isOpened}
                        >
                          {module.header}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {kursusData.modules && kursusData.modules.some(module => module.type_module === 'modul') && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Modul</h2>
                  <div>
                    {updatedModules
                      .filter(module => module.type_module === 'modul') // Filter hanya modul dengan type_module 'modul'
                      .map((module, index) => (
                        <button
                          key={module.id_modules}
                          onClick={() => handleModuleClick(module)}
                          className={`w-full text-left py-3 px-4 rounded-lg ${module.isOpened ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'} mb-3`}
                          disabled={
                            index > 0 && !updatedModules.filter(m => m.type_module === 'modul')[index - 1].isOpened
                          }
                        >
                          {module.header}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {kursusData.modules && kursusData.modules.some(module => ['kuis', 'essay'].includes(module.type_module)) && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz & Essay</h2>
                  <div>
                    {updatedModules
                      .filter(module => ['kuis', 'essay'].includes(module.type_module)) // Filter modul dengan type_module 'kuis' atau 'essay'
                      .map((module, index) => (
                        <button
                          key={module.id_modules}
                          onClick={() => handleModuleClick(module)}
                          className={`w-full text-left py-3 px-4 rounded-lg ${module.isOpened ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'} mb-3`}
                          disabled={
                            !updatedModules.filter(m => m.type_module === 'modul').every(m => m.isOpened) || // Pastikan semua modul dengan type_module 'modul' telah dibuka
                            (index > 0 && !updatedModules.filter(m => ['kuis', 'essay'].includes(m.type_module))[index - 1].isOpened)
                          }
                        >
                          {module.header}
                        </button>
                      ))}
                  </div>
                </div>
              )}

            </div>

            {/* Konten Video / Zoom / PDF */}
            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
              {activeContent.type === 'youtube' ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeContent.header}</h3>
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={activeContent.url}
                      title="Video Player"
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  {activeContent.can_user_upload && (
                    <form  onSubmit={handleSubmitTask}>
                        <>
                        <p className="text-gray-700 mt-6">Upload Tugas Anda Disini!</p>
                        <input 
                        type="file"
                        name="taskFile"
                        onChange={(e) => setTaskFile(e.target.files[0])}
                        class="file-input file-input-bordered file-input-md w-full max-w-xs" 
                        required
                        />
                          {/* Tombol hitung dan masukkan nilai */}
                          <div className="mt-6 text-right">
                              <button
                              type="submit"
                              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            >
                              Submit
                            </button>
                          </div>  
                        </>
                    </form>
                  )}
                  </>
              ) : activeContent.type === 'zoom' ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeContent.header}</h3>
                  <a
                    href={activeContent.url}
                    className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Masuk Zoom
                  </a>
                  {/* <p className="font-bold text-gray-800 mt-1">{formatToWIB(new Date())}</p> */}

                  <p className="text-gray-600 mt-6">Kelas Dimulai:</p>
                  <p className="font-bold text-gray-800 mt-1">{formatToWIB(activeContent.start_date_online_class)}</p>
                  <p className="text-gray-600 mt-6">Sampai:</p>
                  <p className="font-bold text-gray-800 mt-1">{formatToWIB(activeContent.end_date_online_class)}</p>
                  <p className="text-gray-600 mt-2">
                    {calculateDaysLeft(activeContent.start_date_online_class, activeContent.end_date_online_class)}
                  </p>
                  <iframe
                    src={activeContent.url}
                    className="w-full h-96 rounded-lg shadow-lg"
                    frameBorder="0"
                  ></iframe>
                </>
              ) : activeContent.type === 'pdf' ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeContent.header}</h3>
                  <div className="mt-4">
                    <a
                      href={activeContent.url}
                      download={activeContent.url} // Nama file yang akan diunduh
                      className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Download PDF
                    </a>
                  </div>
                  <iframe
                    src={activeContent.url}
                    className="w-full h-96 rounded-lg shadow-lg"
                    frameBorder="0"
                  ></iframe>
                  {activeContent.can_user_upload && (
                    <form  onSubmit={handleSubmitTask}>
                        <>
                        <p className="text-gray-700 mt-6">Upload Tugas Anda Disini!</p>
                        <div>
                        <input 
                          type="file"
                          name="taskFile"
                          onChange={(e) => setTaskFile(e.target.files[0])}
                          class="file-input file-input-bordered file-input-md w-full max-w-xs" 
                          required
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                          PDF (MAX. 50MB).
                        </p>               
                        </div>
                        <div>
                        {activeContent.name_file_task && (
                        <a
                          href={activeContent.url_file_task}
                          download={activeContent.url_file_task}
                          className="text-black hover:text-blue-600"
                        >
                          {activeContent.name_file_task}
                        </a>
                        )}                       
                        </div>

                          {/* Tombol hitung dan masukkan nilai */}
                          <div className="mt-6 text-right">
                              <button
                              type="submit"
                              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            >
                              Submit
                            </button>
                          </div>  
                        </>
                    </form>
                  )}
                </>
              ) : activeContent.type === 'kuis' ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeContent.header}</h3>
                  <div className="relative w-full h-full">
                  {activeContent.correct_answers ? (
                    <table className="w-small table-auto text-md border-collapse rounded-lg shadow-md overflow-hidden">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-left">
                          <th className="h-[40px] px-5 text-lg font-semibold text-center">Keterangan</th>
                          <th className="h-[40px] px-5 text-lg font-semibold text-center">Nilai</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#F9FAFB] hover:bg-blue-50 transition duration-300">
                          <td className="py-4 px-6 text-gray-700 font-medium text-center">Jawaban Benar</td>
                          <td className="py-4 px-6 text-gray-900 font-bold text-center">{activeContent.correct_answers}</td>
                        </tr>
                        <tr className="bg-white hover:bg-blue-50 transition duration-300">
                          <td className="py-4 px-6 text-gray-700 font-medium text-center">Jawaban Salah</td>
                          <td className="py-4 px-6 text-gray-900 font-bold text-center">{activeContent.wrong_answers}</td>
                        </tr>
                        <tr className="bg-[#F9FAFB] hover:bg-blue-50 transition duration-300">
                          <td className="py-4 px-6 text-gray-700 font-medium text-center">Total Pertanyaan</td>
                          <td className="py-4 px-6 text-gray-900 font-bold text-center">{activeContent.total_questions}</td>
                        </tr>
                        <tr className="bg-[#F9FAFB] hover:bg-blue-50 transition duration-300">
                          <td className="py-4 px-6 text-gray-700 font-medium text-center">Tanggal Submit</td>
                          <td className="py-4 px-6 text-gray-900 font-bold text-center">
                            {formatToWIB(activeContent.submit_quiz_date)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <form  onSubmit={handleSubmit}>
                      {/* buatkan tampilan soalnya disini */}
                      {activeContent.soal.map((soal, index) => (
                        <div key={index} className="mb-4">
                              <p className="font-bold">{soal}</p>
                              <p className="font-bold">{activeContent.id_quiz[index]}</p>
                          {/* Cek apakah ada URL gambar */}
                          {activeContent.foto_soal[index] && (
                            <img
                              src={activeContent.url[index]}
                              alt={activeContent.url[index]}
                              className="w-90 h-64 object-cover rounded-lg mr-8"
                            />
                          )}
                          {/* Pilihan jawaban */}
                          <div className="flex items-center mt-4 mb-4">
                            <input 
                              id={`radio-${index}-a`} 
                              type="radio" 
                              value="a" 
                              name={`radio-${index}`}
                              checked={selectedAnswers[index] === 'a'}
                              onChange={() => handleAnswerChange(index, 'a')}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            <label htmlFor={`radio-${index}-a`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">A. {activeContent.a[index]}</label>
                          </div>
                          <div className="flex items-center mb-4">
                            <input 
                              id={`radio-${index}-b`} 
                              type="radio" 
                              value="b" 
                              name={`radio-${index}`} 
                              checked={selectedAnswers[index] === 'b'}
                              onChange={() => handleAnswerChange(index, 'b')}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            <label htmlFor={`radio-${index}-b`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">B. {activeContent.b[index]}</label>
                          </div>
                          <div className="flex items-center mb-4">
                            <input 
                              id={`radio-${index}-c`} 
                              type="radio" 
                              value="c" 
                              name={`radio-${index}`}
                              checked={selectedAnswers[index] === 'c'}
                              onChange={() => handleAnswerChange(index, 'c')}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            <label htmlFor={`radio-${index}-c`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">C. {activeContent.c[index]}</label>
                          </div>
                          <div className="flex items-center mb-6">
                            <input 
                              id={`radio-${index}-d`} 
                              type="radio" 
                              value="d" 
                              name={`radio-${index}`}
                              checked={selectedAnswers[index] === 'd'}
                              onChange={() => handleAnswerChange(index, 'd')}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            <label htmlFor={`radio-${index}-d`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">D. {activeContent.d[index]}</label>
                          </div>
                        </div>
                      ))}
                      {/* Tombol hitung dan masukkan nilai */}
                      <div className="mt-6 text-right">
                          <button
                          type="submit"
                          className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </div>                      
                    </form>
                  )}
                  </div>
                </>

              ) : (
              <div className="">
                <p className="text-gray-500 text-xl">
                {kursusData.online 
                  ? 'Pilih modul untuk mulai belajar.' 
                  : (
                    <>
                      <span>lokasi: {kursusData.location_offline}</span>
                      <br />
                      <span>Tanggal Mulai: {formatToWIB(kursusData.preorder_offline_date)}</span>
                    </>
                  )
                }                  
                </p>
              </div>
              )}
            </div>
          </div>

          {/* Tombol Sertifikat */}
          {/* <div className="mt-6 text-center">
            {hasCompletedCourse ? (
              <a
                href={`/api/pengguna/courses/${id_course}/certificate`}
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Lihat Sertifikat
              </a>
            ) : (
              <>
                <a
                  href="#"
                  className="py-3 px-6 bg-gray-400 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                >
                  Selesaikan Pelatihan untuk Mendapatkan Sertifikat
                </a>
              </>
            )}
          </div> */}



        </div>
      ) : (
        <p className="text-center text-red-500 text-xl font-bold py-20">Kursus tidak ditemukan.</p>
      )}
    </div>
  );
};

export default SidebarDetailKursus;
