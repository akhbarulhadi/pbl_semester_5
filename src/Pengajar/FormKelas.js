import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const FormKelas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOn, setIsOn] = useState(false);
  const [modules, setModules] = useState([
    { file_module: "", linkVideoYoutube: "", soal: "", header: "", inputType: "youtube" },
  ]);
  const [quiz, setQuiz] = useState([
    { question: "", a: "", b: "", c: "", d: "", answer: "a", file: null },
  ]); 
  const [benefit, setBenefit] = useState([
    { benefit: "" },
  ]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    price: "",
    paid: false,
    trailerVideoYoutube: "",
    statusCourse: "Pending",
    online: false,
    locationOffline: "",
    preOrderOfflineDate: "",
    category: "Iphone",
  });
  const [quizTitle, setQuizTitle] = useState("");
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsQuizVisible(e.target.checked);
  };
  const handleQuizChange = (index, key, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index][key] = value;
    setQuiz(updatedQuiz);
  };
  
  const addQuiz = () => {
    setQuiz([...quiz, { question: "", a: "", b: "", c: "", d: "", answer: "a", file: null }]);
  };
  
  const removeQuiz = (index) => {
    setQuiz(quiz.filter((_, i) => i !== index));
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileModule, setSelectedFileModule] = useState(null);

  // Set nilai paid otomatis berdasarkan input harga (price)
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      paid: prevFormData.price !== "", // Jika price terisi, set paid true, jika kosong, set paid false
    }));
  }, [formData.price]);

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedModules = localStorage.getItem("modules");
    const savedIsOn = localStorage.getItem("isOn"); 
    const savedBenefit = localStorage.getItem("benefit");
    const savedQuiz = localStorage.getItem("quiz");
    const savedQuizTitle = localStorage.getItem("quizTitle");

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedBenefit) {
      setBenefit(JSON.parse(savedBenefit));
    }
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    }
    if (savedQuiz) {
      setQuiz(JSON.parse(savedQuiz));
    }
    if (savedQuizTitle) {
      setQuizTitle(JSON.parse(savedQuizTitle));
    }
    if (savedIsOn !== null) {
      setIsOn(JSON.parse(savedIsOn));
    }
  }, []);

  // Save data to localStorage whenever the form data or modules change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("benefit", JSON.stringify(benefit));
    localStorage.setItem("modules", JSON.stringify(modules));
    localStorage.setItem("quiz", JSON.stringify(quiz));
    localStorage.setItem("quizTitle", JSON.stringify(quizTitle));
    localStorage.setItem("isOn", JSON.stringify(isOn));
  }, [formData, modules, benefit, quiz, quizTitle, isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
    setFormData({ ...formData, online: !isOn });
  };

  const handleModuleChange = (index, key, value) => {
    const updatedModules = [...modules];

    // Hapus linkVideoYoutube dari localStorage jika memilih File Upload
    if (key === "inputType" && value === "file") {
      const youtubeLinkKey = `linkVideoYoutube_${index}`; // Key sesuai dengan struktur yang diinginkan
      localStorage.removeItem(youtubeLinkKey);
      updatedModules[index].linkVideoYoutube = ""; // Reset di state juga
    }

    updatedModules[index][key] = value;
    setModules(updatedModules);
  };

  const handleBenefitChange = (index, key, value) => {
    const updatedBenefit = [...benefit];
    updatedBenefit[index][key] = value;
    setBenefit(updatedBenefit);
  };

  const addModule = () => {
    setModules([...modules, { linkVideoYoutube: "", header: "", inputType: "youtube", }]);
  };

  const addBenefit = () => {
    setBenefit([...benefit, { benefit: "" }]);
    console.log("Benefit added:", benefit); // Debug panjang array setelah ditambahkan
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const removeBenefit = (index) => {
    setBenefit(benefit.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileModuleChange = (e, index) => {
    const file = e.target.files[0];
    const updatedModules = [...modules];
    updatedModules[index] = {
      ...updatedModules[index],
      file_module: file, // Simpan objek file asli
    };
    setModules(updatedModules);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Membuat objek FormData untuk multipart
    formDataToSend.append("courseTitle", formData.courseTitle);
    formDataToSend.append("courseDescription", formData.courseDescription);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("paid", formData.paid);
    formDataToSend.append("trailerVideoYoutube", formData.trailerVideoYoutube);
    formDataToSend.append("statusCourse", formData.statusCourse);
    formDataToSend.append("online", formData.online);
    formDataToSend.append("locationOffline", formData.locationOffline);
    formDataToSend.append("preOrderOfflineDate", formData.preOrderOfflineDate);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("quizTitle", quizTitle);

    if (selectedFile) {
      formDataToSend.append("file", selectedFile); // Menambahkan file foto
    }

    if (selectedFileModule) {
      formDataToSend.append("file_module_${index}", selectedFileModule); // Menambahkan file foto
    }

    // Menambahkan file untuk setiap modul
    modules.forEach((module, index) => {
      if (module.file_module && module.file_module instanceof File) {
        formDataToSend.append(`file_module_${index}`, module.file_module);
      }
    });
  
    // Menambahkan modul jika ada
    if (modules.length > 0) {
      formDataToSend.append("modules", JSON.stringify(modules));
    }

    if (benefit.length > 0) {
      formDataToSend.append("benefit", JSON.stringify(benefit));
    }

    if (quiz.length > 0) {
      formDataToSend.append("quiz", JSON.stringify(quiz));
    }  

    const confirm = window.confirm(
      "Apakah anda yakin ingin memasukkan data nya!, Direkomendasikan untuk melihat ulang!"
    );
    if (!confirm) return;

    try {
      const response = await fetch("/api/pengajar/courses", {
        method: "POST",
        body: formDataToSend, // Mengirim FormData
      });
      const result = await response.json();
      if (response.ok) {
        alert("Berhasil!");
        localStorage.removeItem("formData");
        localStorage.removeItem("benefit");
        localStorage.removeItem("modules");
        localStorage.removeItem("quiz");
        localStorage.removeItem("quizTitle");
        localStorage.removeItem("isOn");
        navigate("/pengajar/kelas");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error adding course and modules", error);
    }
  };

  return (
    <section>
      <div className="overflow-x-auto p-4">
      <div className="text-center mb-2">
        <Link
          to="/pengajar/kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/pengajar/kelas"
              ? "bg-gray-200 rounded-lg"
              : "hover:bg-gray-600"
          }`}
        >
          List Kelas
        </Link>

        <Link
          to="/pengajar/form-kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/pengajar/form-kelas"
              ? "bg-gray-200 rounded-lg"
              : "hover:bg-gray-600"
          }`}
        >
          Tambah Kelas
        </Link>
      </div>
      <form
        className="max-w-2xl mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <p className="text-4xl text-gray-900 font-extralight dark:text-white">
          Form Tambah Kelas
        </p>

        {/* Toggle Online */}
        <label className="inline-flex items-center mb-5 mt-6 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={formData.online}
            onChange={handleToggle}
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Kelas Online
          </span>
        </label>

        {/* Course Fields */}
        <div className="mb-6">
          <label className="block text-gray-500">Nama Kelas</label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-500">Deskripsi Kelas</label>
          <input
            type="text"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Foto Kelas
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            onChange={handleFileChange} // Tambahkan handler untuk file input
            id="file_input"
            type="file"
            name="file"
            required
          />
          <p
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-500">Trailer Video</label>
          <input
            placeholder="Link Youtube"
            type="text"
            name="trailerVideoYoutube"
            value={formData.trailerVideoYoutube}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-500">Harga</label>
          <input
            placeholder="Jika tidak di isi maka gratis"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-6">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Kategori Kelas</label>
          <select 
          id="categories"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >       
            <option value="Iphone">IPhone</option>
            <option value="Macbook">Macbook</option>
            <option value="Imac">IMac</option>
            <option value="Iwatch">IWatch</option>
            <option value="Ipad">IPad</option>
            <option value="Airpods">Airpods</option>
          </select>
        </div>
        {benefit.map((benefits, index) => (
              <div key={index} className="mb-6">
                <p>Benefit {index + 1}</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={benefits.benefit}
                    onChange={(e) =>
                      handleBenefitChange(index, "benefit", e.target.value)
                    }
                    placeholder="Benefit"
                    className="border p-2 rounded-lg w-1/2"
                    required
                  />
                </div>
                {benefit.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-500"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
            <div className="mb-6">
              <button
                type="button"
                onClick={addBenefit}
                className="text-blue-500 hover:text-blue-700 mb-6"
              >
                Tambah
              </button>
            </div>

        {/* Input that appears when isOn is false */}
        {!isOn && (
          <>
            <div className="mb-6">
              <label className="block text-gray-500">Lokasi Kelas</label>
              <input
                type="text"
                name="locationOffline"
                value={formData.locationOffline}
                onChange={handleInputChange}
                placeholder="Enter the location of the offline class"
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500">
                Tanggal Kelas Dimulai
              </label>
              <input
                type="date"
                name="preOrderOfflineDate"
                value={formData.preOrderOfflineDate}
                onChange={handleInputChange}
                placeholder="Enter the location of the offline class"
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          </>
        )}

        {/* Module Fields */}
        {isOn && (
          <>
        <p className="text-xl text-gray-900 font-extralight dark:text-white">
          Pilih Modul atau Latihan
        </p>
        {modules.map((module, index) => (
            <div key={index} className="mb-6 mt-4">
                
              {/* Tombol Pilihan Input */}
              <div className="flex space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    handleModuleChange(index, "inputType", "youtube")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    module.inputType === "youtube" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  <img src="https://img.icons8.com/fluency/2x/youtube.png" width="32px" height="32px"></img>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleModuleChange(index, "inputType", "file")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    module.inputType === "file" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  <img src="https://img.icons8.com/fluency/2x/pdf.png" width="32px" height="32px"></img>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleModuleChange(index, "inputType", "essay")
                  }
                  className={`px-4 py-2 rounded-lg ${
                    module.inputType === "essay" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  <img src="https://img.icons8.com/?size=100&id=s9Kx8COBW2pl&format=png&color=000000" width="32px" height="32px"></img>
                </button>
              </div>
                
              {/* Input Berdasarkan Pilihan */}
              {module.inputType === "youtube" && (
                <div className="mt-4">
                  <p className="text-xl text-gray-900 mb-2 font-extralight dark:text-white">
                    Modul Video
                  </p>
                  <p>Judul Modul {index + 1}</p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={module.header}
                      onChange={(e) =>
                        handleModuleChange(index, "header", e.target.value)
                      }
                      placeholder="Judul Module"
                      className="border p-2 rounded-lg w-full"
                      required
                    />
                  </div>
                  <p>Module {index + 1}</p>
                  <input
                    type="text"
                    value={module.linkVideoYoutube}
                    onChange={(e) =>
                      handleModuleChange(index, "linkVideoYoutube", e.target.value)
                    }
                    placeholder="Link Video YouTube"
                    className="border p-2 rounded-lg w-full"
                    required
                  />
                </div>
              )} 
              {module.inputType === "file" && (
                <div className="mt-4">
                  <p className="text-xl text-gray-900 mb-2 font-extralight dark:text-white">
                    Modul PDF
                  </p>
                  <p>Judul Modul {index + 1}</p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={module.header}
                      onChange={(e) =>
                        handleModuleChange(index, "header", e.target.value)
                      }
                      placeholder="Judul Module"
                      className="border p-2 rounded-lg w-full"
                      required
                    />
                  </div>
                  <p>Modul PDF {index + 1}</p>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    onChange={(e) => handleFileModuleChange(e, index)}
                    type="file"
                    name={`file_module_${index}`} // Pastikan name sesuai dengan format yang diharapkan
                    required
                  />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      PDF (MAX. 50MB).
                    </p>
                </div>
              )}
              {module.inputType === "essay" && (
                <div className="mt-4">
                  <p className="text-xl text-gray-900 mb-2 font-extralight dark:text-white">
                    Tugas Latihan PDF
                  </p>
                  <p>Judul Tugas {index + 1}</p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={module.header}
                      onChange={(e) =>
                        handleModuleChange(index, "header", e.target.value)
                      }
                      placeholder="Judul Tugas"
                      className="border p-2 rounded-lg w-full"
                      required
                    />
                  </div>
                  <p>Tugas PDF {index + 1}</p>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    onChange={(e) => handleFileModuleChange(e, index)}
                    type="file"
                    name={`file_module_${index}`} // Pastikan name sesuai dengan format yang diharapkan
                    required
                  />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  PDF (MAX. 50MB).
                </p>
              </div>
              )}
              {/* Tombol Hapus Module */}
              {modules.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  className="text-red-500 mt-4"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <div className="mb-6">
            <button
              type="button"
              onClick={addModule}
              className="text-blue-500 hover:text-blue-700 mb-6"
            >
              Tambah
            </button>
          </div>

        {/* ini unutk kuis */}
        <div>
            {/* Checkbox untuk menampilkan quiz */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isQuizVisible}
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2 text-gray-700">Tampilkan Quiz</span>
              </label>
            </div>
            {isQuizVisible && (
            <div>
              <p className="text-xl text-gray-900 font-extralight dark:text-white">
                Quiz
              </p>
              <p>Judul</p>
                  {/* ini masuknya ke tabel modules dengan kolom header */}
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Masukkan Judul"
                    className="border p-2 rounded-lg w-full mb-4"
                    required
                  />
              {quiz.map((item, index) => (
                <div key={index} className="mb-6 mt-4">
                  {/* Input untuk Quiz */}
                    <div className="mt-4">
                  {/* ini masuk nya ke tabel quiz dengan kolom soal,foto_soal, a,b,c,d,true_answer */}
                    <textarea
                        value={item.question}
                        onChange={(e) => handleQuizChange(index, "question", e.target.value)}
                        placeholder="Masukkan Soal"
                        className="border p-2 rounded-lg w-full mb-4"
                        required
                      />
                      {/* Upload Foto */}
                      {/* <p className="mt-1 text-sm text-gray-500 mb-1 dark:text-gray-300">Gambar Soal Jika Ada</p>
                      <input
                        type="file"
                        onChange=""
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      />
                      <p className="mt-1 text-sm text-gray-500 mb-4 dark:text-gray-300">
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p> */}
                      {/* Input untuk Pilihan Jawaban */}
                      <div className="flex space-x-4">
                        <label className="mt-2">A.</label>
                        <input
                          type="text"
                          value={item.a}
                          onChange={(e) => handleQuizChange(index, "a", e.target.value)}
                          placeholder="Pilihan A"
                          className="border p-2 rounded-lg w-full mb-2"
                          required
                        />                        
                      </div>
                      <div className="flex space-x-4">
                        <label className="mt-2">B.</label>
                        <input
                          type="text"
                          value={item.b}
                          onChange={(e) => handleQuizChange(index, "b", e.target.value)}
                          placeholder="Pilihan B"
                          className="border p-2 rounded-lg w-full mb-2"
                          required
                        />
                      </div>
                      <div className="flex space-x-4">
                        <label className="mt-2">C.</label>
                        <input
                          type="text"
                          value={item.c}
                          onChange={(e) => handleQuizChange(index, "c", e.target.value)}
                          placeholder="Pilihan C"
                          className="border p-2 rounded-lg w-full mb-2"
                          required
                        />                      
                      </div>
                      <div className="flex space-x-4">
                        <label className="mt-2">D.</label>
                        <input
                          type="text"
                          value={item.d}
                          onChange={(e) => handleQuizChange(index, "d", e.target.value)}
                          placeholder="Pilihan D"
                          className="border p-2 rounded-lg w-full mb-2"
                          required
                        />
                      </div>

                      {/* Input untuk Jawaban Benar */}
                      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Jawaban Benar</label>
                      <select 
                        id="categories"
                        name="category"
                        value={item.answer}
                        onChange={(e) => handleQuizChange(index, "answer", e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >       
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                      </select>
                    </div>
                  {/* Tombol Hapus */}
                  {quiz.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuiz(index)}
                      className="text-red-500 mt-4"
                    >
                      Hapus Soal
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addQuiz}
                className="text-blue-500 hover:text-blue-700 mb-6"
              >
                Tambah Soal
              </button>
            </div>
            )}
        </div>
        </>
        )}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </section>
  );
};

export default FormKelas;
