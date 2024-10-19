import React from "react";

const listPengguna = [
    {
        idPengguna: "001",
        namaPengguna: "Akhbarul Hadi",
        emailPengguna: "akbar@gmail.com",
        noTelp: "0812111111",
        fotoPengguna: "/assets/images/profil.jpeg",
    },
    {
        idPengguna: "002",
        namaPengguna: "Bintang Gusti",
        emailPengguna: "bintang@gmail.com",
        noTelp: "0812222222",
        fotoPengguna: "/assets/images/profil.jpeg",
    },
    {
        idPengguna: "003",
        namaPengguna: "Damarjati Abdullah",
        emailPengguna: "damar@gmail.com",
        noTelp: "0812333333",
        fotoPengguna: "/assets/images/profil.jpeg",
    },
    {
        idPengguna: "004",
        namaPengguna: "Ibnu Pramudita",
        emailPengguna: "ibnu@gmail.com",
        noTelp: "0812444444",
        fotoPengguna: "/assets/images/profil.jpeg",
    },
    {
        idPengguna: "005",
        namaPengguna: "Tiyo Saputra",
        emailPengguna: "tiyo@gmail.com",
        noTelp: "0812555555",
        fotoPengguna: "/assets/images/profil.jpeg",
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
];

const ListPeserta = () => {
    return(
        <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">ID Pengguna</th>
                    <th className="py-2 px-4 border-b">Nama Pengguna</th>
                    <th className="py-2 px-4 border-b">Email Pengguna</th>
                    <th className="py-2 px-4 border-b">No Telepon</th>
                    <th className="py-2 px-4 border-b">Foto</th>
                </tr>
            </thead>
            <tbody>
            {listPengguna.map((list, index) => (
                <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{list.idPengguna}</td>
                    <td className="py-2 px-4 border-b">{list.namaPengguna}</td>
                    <td className="py-2 px-4 border-b">{list.emailPengguna}</td>
                    <td className="py-2 px-4 border-b text-center">{list.noTelp}</td>
                    <td className="py-2 px-4 border-b text-center">
                        <img
                            src={list.fotoPengguna}
                            alt={list.namaPengguna}
                            className="w-12 h-12 object-cover rounded-full"
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
};

export default ListPeserta;