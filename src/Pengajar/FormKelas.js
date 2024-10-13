import React, { useState } from "react";

const FormKelas = () => {
  const [isOn, setIsOn] = useState(false);
  const [learningPhases, setLearningPhases] = useState({
    phase1: [],
    phase2: [],
    phase3: [],
  });
  const [newSubPhases, setNewSubPhases] = useState({
    phase1: "",
    phase2: "",
    phase3: "",
  });

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleInputChange = (phaseKey, value) => {
    setNewSubPhases((prev) => ({ ...prev, [phaseKey]: value }));
  };

  const addSubPhase = (phaseKey) => {
    if (newSubPhases[phaseKey]) {
      setLearningPhases((prev) => ({
        ...prev,
        [phaseKey]: [...prev[phaseKey], newSubPhases[phaseKey]],
      }));
      setNewSubPhases((prev) => ({ ...prev, [phaseKey]: "" }));
    }
  };

  const removeSubPhase = (phaseKey, index) => {
    setLearningPhases((prev) => ({
      ...prev,
      [phaseKey]: prev[phaseKey].filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="max-w-2xl mx-auto relative z-10 mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <p className="text-4xl text-gray-900 font-extralight dark:text-white">
        Form Tambah Kelas
      </p>

      {/* Input for Class Name */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="kelas_nama"
          id="kelas_nama"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_nama"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nama Kelas
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="deskripsi_kelas"
          id="deskripsi"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_nama"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Deskripsi Kelas
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="benefit_kelas"
          id="benefit_kelas"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_nama"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Benefit Kelas
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="sertifikasi"
          id="sertifikasi"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_nama"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Sertifikasi
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="materi"
          id="materi"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_nama"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Materi 
        </label>
      </div>

      {/* Toggle On/Off */}
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
        />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Off/On</span>
      </label>

      {/* Learning Phases Form */}
      {isOn && (
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tahapan Pembelajaran</p>

          {/* Phase 1: Tonton Video/Learning Materi */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium dark:text-gray-300">Tonton Video/Learning Materi</span>
              <div className="flex">
                <input
                  type="text"
                  value={newSubPhases.phase1}
                  onChange={(e) => handleInputChange("phase1", e.target.value)}
                  placeholder="Tambah Tahapan"
                  className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => addSubPhase("phase1")}
                  className="text-green-500 hover:text-green-700"
                >
                  Tambah
                </button>
              </div>
            </div>
            {learningPhases.phase1.map((subPhase, index) => (
              <div key={index} className="ml-4 flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-400">{subPhase}</span>
                <button
                  type="button"
                  onClick={() => removeSubPhase("phase1", index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Phase 2: Tugas */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium dark:text-gray-300">Tugas</span>
              <div className="flex">
                <input
                  type="text"
                  value={newSubPhases.phase2}
                  onChange={(e) => handleInputChange("phase2", e.target.value)}
                  placeholder="Tambah Tahapan"
                  className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => addSubPhase("phase2")}
                  className="text-green-500 hover:text-green-700"
                >
                  Tambah
                </button>
              </div>
            </div>
            {learningPhases.phase2.map((subPhase, index) => (
              <div key={index} className="ml-4 flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-400">{subPhase}</span>
                <button
                  type="button"
                  onClick={() => removeSubPhase("phase2", index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Phase 3: Praktek */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium dark:text-gray-300">Praktek</span>
              <div className="flex">
                <input
                  type="text"
                  value={newSubPhases.phase3}
                  onChange={(e) => handleInputChange("phase3", e.target.value)}
                  placeholder="Tambah Tahapan"
                  className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => addSubPhase("phase3")}
                  className="text-green-500 hover:text-green-700"
                >
                  Tambah
                </button>
              </div>
            </div>
            {learningPhases.phase3.map((subPhase, index) => (
              <div key={index} className="ml-4 flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-400">{subPhase}</span>
                <button
                  type="button"
                  onClick={() => removeSubPhase("phase3", index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="kelas_lokasi"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
      
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Jumlah pertemuan Pembelajaran Off
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="harga_kelas"
          id="harga_kelas"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="kelas_lokasi"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Harga Kelas
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default FormKelas;
