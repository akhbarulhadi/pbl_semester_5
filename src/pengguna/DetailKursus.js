import React from 'react';
import { useParams } from 'react-router-dom';

const KursusDetail = () => {
    const { id } = useParams(); // Ambil ID dari URL

    // Data kursus
    const cardData = [
      { id: 1, title: "Judul 1", description: "Deskripsi kursus 1", imageSrc: "https://via.placeholder.com/600x400", author: "Penulis 1", readTime: "5 menit" },
      { id: 2, title: "Judul 2", description: "Deskripsi kursus 2", imageSrc: "https://via.placeholder.com/600x400", author: "Penulis 2", readTime: "6 menit" },
      { id: 3, title: "Judul 3", description: "Deskripsi kursus 3", imageSrc: "https://via.placeholder.com/600x400", author: "Penulis 3", readTime: "4 menit" },
    ];

    const kursus = cardData.find(k => k.id === parseInt(id));

    if (!kursus) {
      return <div className="text-center text-red-500">Kursus tidak ditemukan</div>;
    }

    return (
    <main className="flex-1 md:ml-64">
        <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full">  
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={kursus.imageSrc} alt={kursus.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{kursus.title}</h1>
                        <p className="text-gray-600 mb-4">{kursus.description}</p>
                        <p className="font-medium">Penulis: <span className="text-blue-600">{kursus.author}</span></p>
                        <p className="font-medium">Waktu baca: <span className="text-blue-600">{kursus.readTime}</span></p>
                    </div>
                </div>
            </div>
        </section>
      </main>
    );
};

export default KursusDetail;
