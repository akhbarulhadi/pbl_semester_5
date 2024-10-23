import React, { useEffect, useState } from "react";

// const listPengguna = [
//     {
//         idPengguna: "001",
//         namaPengguna: "Akhbarul Hadi",
//         emailPengguna: "akbar@gmail.com",
//         noTelp: "0812111111",
//         fotoPengguna: "/assets/images/profil.jpeg",
//     },
//     {
//         idPengguna: "002",
//         namaPengguna: "Bintang Gusti",
//         emailPengguna: "bintang@gmail.com",
//         noTelp: "0812222222",
//         fotoPengguna: "/assets/images/profil.jpeg",
//     },
//     {
//         idPengguna: "003",
//         namaPengguna: "Damarjati Abdullah",
//         emailPengguna: "damar@gmail.com",
//         noTelp: "0812333333",
//         fotoPengguna: "/assets/images/profil.jpeg",
//     },
//     {
//         idPengguna: "004",
//         namaPengguna: "Ibnu Pramudita",
//         emailPengguna: "ibnu@gmail.com",
//         noTelp: "0812444444",
//         fotoPengguna: "/assets/images/profil.jpeg",
//     },
//     {
//         idPengguna: "005",
//         namaPengguna: "Tiyo Saputra",
//         emailPengguna: "tiyo@gmail.com",
//         noTelp: "0812555555",
//         fotoPengguna: "/assets/images/profil.jpeg",
//     },
//     // Tambahkan lebih banyak data sesuai kebutuhan
// ];

const ListPeserta = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            let response = await fetch('/api/admin/teacher/users', {
              method: 'GET',
              credentials: 'include',
            });
    
            if (response.status === 401) {
              const refreshResponse = await fetch('/api/auth/refresh-token', {
                method: 'POST',
                credentials: 'include',
              });
    
              if (refreshResponse.ok) {
                response = await fetch('/api/admin/teacher/users', {
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
            setUsers(data);
          } catch (error) {
            console.error('Fetch error:', error);
          }
        };
    
        fetchUsers();
      }, []);

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
            {users.map((user) => (
                <tr key={user.id_user} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{user.id_user}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b text-center">{user.no_telp}</td>
                    <td className="py-2 px-4 border-b text-center">
                        <img
                            src={`/api/${user.foto}`}
                            alt={user.name}
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