import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const FormKelas = () => {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [modules, setModules] = useState([{ linkVideoYoutube: "", header: "" }]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    price: "",
    paid: false,
    trailerVideoYoutube: "",
    statusCourse: "Pending",
    online: false,
    benefit: "",
    locationOffline: "",
    preOrderOfflineDate: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

    // Set nilai paid otomatis berdasarkan input harga (price)
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      paid: prevFormData.price !== ""  // Jika price terisi, set paid true, jika kosong, set paid false
    }));
  }, [formData.price]);

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedModules = localStorage.getItem("modules");
    const savedIsOn = localStorage.getItem("isOn"); // Tambahkan untuk isOn


    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    }
    if (savedIsOn !== null) {
      setIsOn(JSON.parse(savedIsOn));
    }
  }, []);

  // Save data to localStorage whenever the form data or modules change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("modules", JSON.stringify(modules));
    localStorage.setItem("isOn", JSON.stringify(isOn)); 

  }, [formData, modules, isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
    setFormData({ ...formData, online: !isOn });
  };

  const handleModuleChange = (index, key, value) => {
    const updatedModules = [...modules];
    updatedModules[index][key] = value;
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { linkVideoYoutube: "", header: "" }]);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = new FormData();
    
    // Tambahkan field ke FormData
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });
  
    // Tambahkan file ke FormData
    if (selectedFile) {
      payload.append('file', selectedFile);
    }
  
    modules.forEach((module, index) => {
      payload.append(`modules[${index}][linkVideoYoutube]`, module.linkVideoYoutube);
      payload.append(`modules[${index}][header]`, module.header);
    });
  
    const confirm = window.confirm("Apakah anda yakin ingin memasukkan data nya?, Direkomendasikan untuk melihat ulang!");
    if (!confirm) return;
  
    try {
      const response = await fetch("/api/pengajar/courses", {
        method: "POST",
        // Hilangkan 'Content-Type' agar browser bisa secara otomatis menetapkan multipart/form-data
        body: payload, 
      });
      const result = await response.json();
      if (response.ok) {
        alert("Course and modules added successfully");
        localStorage.removeItem("formData");
        localStorage.removeItem("modules");
        navigate('/pengajar/kelas');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error adding course and modules", error);
    }
  };
  

  return (
    <form
      className="max-w-2xl mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800"
      onSubmit={handleSubmit}
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
        />
      </div>
      <div className="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Foto Kelas</label>
        <input 
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        aria-describedby="file_input_help"
        onChange={handleFileChange}  // Tambahkan handler untuk file input
        id="file_input" 
        type="file" 
        required />
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
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
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-500">Benefit</label>
        <input
          type="text"
          name="benefit"
          value={formData.benefit}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2"
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
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-500">Tanggal Kelas Dimulai</label>
          <input
            type="date"
            name="preOrderOfflineDate"
            value={formData.preOrderOfflineDate}
            onChange={handleInputChange}
            placeholder="Enter the location of the offline class"
            className="w-full border rounded-lg p-2"
          />
      </div>
      </>
      )}


      {/* Module Fields */}
      {isOn && (
      <>
      {modules.map((module, index) => (
        <div key={index} className="mb-6">
          <p>Module {index + 1}</p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={module.header}
              onChange={(e) =>
                handleModuleChange(index, "header", e.target.value)
              }
              placeholder="Judul Module"
              className="border p-2 rounded-lg w-1/2"
            />
            <input
              type="text"
              value={module.linkVideoYoutube}
              onChange={(e) =>
                handleModuleChange(index, "linkVideoYoutube", e.target.value)
              }
              placeholder="Link Video Youtube"
              className="border p-2 rounded-lg w-1/2"
            />
          </div>
          {modules.length > 1 && (
            <button
              type="button"
              onClick={() => removeModule(index)}
              className="text-red-500"
            >
              Hapus Module
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
          Tambah Module
        </button>
      </div>
      </>
      )}
      
      <div className="mb-6">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2"
          >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormKelas;
