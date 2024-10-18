// Sertifikat.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sertifikat = () => {
  const [allRequirementsMet, setAllRequirementsMet] = useState(false);

  // Example function to check if all requirements are met
  const checkRequirements = () => {
    // Replace with actual logic to check requirements
    // For demonstration, we'll assume all requirements are met
    setAllRequirementsMet(true);
  };

  return (
      <div className="w-full px-4 py-16 md:px-8 md:py-20">
        {/* Intro Text */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-poppins text-[#030712] mb-4">
            Sertifikat
          </h1>
          <p className="text-xl text-[#3f3f46] font-poppins">
            Fitur sertifikat ini dirancang untuk memberikan Anda akses mudah<br />
            untuk melihat dan mengelola sertifikat yang telah Anda peroleh.<br />
            Pastikan untuk memeriksa sertifikat Anda dan memvalidasi keasliannya di sini.
          </p>
        </div>

        {/* Card Container */}
        <div className="relative bg-gray dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Card Body with Table */}
          <div className="relative overflow-x-auto p-8">
            <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Requirement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 text-lg">
                    Complete training module
                  </td>
                  <td className="px-6 py-4 text-lg">
                    {/* You can dynamically set the status based on logic */}
                    <span className="text-green-500">Completed</span>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 text-lg">
                    Pass the final exam
                  </td>
                  <td className="px-6 py-4 text-lg">
                    <span className="text-red-500">Pending</span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 text-lg">
                    Submit required documentation
                  </td>
                  <td className="px-6 py-4 text-lg">
                    <span className="text-green-500">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Button to View Certificate */}
            <div className="flex justify-end mt-4">
              <button
                onClick={checkRequirements}
                className={`px-6 py-3 text-sm text-white rounded-lg ${allRequirementsMet ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
                disabled={!allRequirementsMet}
              >
                {allRequirementsMet ? (
                  <Link to="/certificate-view">View Certificate</Link>
                ) : (
                  'Complete All Requirements'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sertifikat;
