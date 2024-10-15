import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const listPengajar = [
  {
    namaPengajar: "Akhbarul Hadi",
    jumlahPengikut: 150,
    jumlahKelas: 3,
    rating: 90, //Persentase
  },
  {
    namaPengajar: "Tiyo Saputra",
    jumlahPengikut: 200,
    jumlahKelas: 4,
    rating: 85, //Persentase
  },
  // Tambahkan lebih banyak data sesuai kebutuhan
];

// Setting bintang pada rating
const renderStars = (rating) => {
  const fullStars = Math.floor(rating / 20); // Satu bintang mewakili 20% rating
  const halfStar = rating % 20>= 10 ? 1 : 0; // Jika sisa rating >= 10, tambahkan setengah bintang
  const emptyStars = 5 - fullStars - halfStar; // Total bintang harus 5

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-300" />
      ))}
      {halfStar === 1 && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-300" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faEmptyStar} className="text-gray-300" />
      ))}
    </>
  );
};

const DaftarPengajar = () => {
  return(
    <div className="p-4">
      <div className="mb-4">
        <Link to="/admin/form-pengajar" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Tambah Pengajar
        </Link>
      </div>
      <div className="overflow-x-auto">
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Pengajar</th>
              <th className="py-2 px-4 border-b">Jumlah Pengikut</th>
              <th className="py-2 px-4 border-b">Jumlah Kelas</th>
              <th className="py-2 px-4 border-b">Rating</th>
            </tr>
          </thead>
          <tbody>
            {listPengajar.map((list, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{list.namaPengajar}</td>
                <td className="py-2 px-4 border-b text-center">{list.jumlahPengikut}</td>
                <td className="py-2 px-4 border-b text-center">{list.jumlahKelas}</td>
                <td className="py-2 px-4 border-b text-center">{renderStars(list.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPengajar;