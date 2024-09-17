import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    
    <footer className="block">
      {/* Container */}
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="grid grid-cols-[auto_auto] justify-between gap-8 sm:grid-cols-[auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto_auto]">
          <div className="flex flex-col items-start font-semibold">
            <div className="mb-4 lg:mt-0">
              <p>Belanja dan belajar</p>
            </div>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Mac
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              iPad
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              iPhone
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Watch
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              airPods
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Tv & rumah
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              AirTag
            </a>
          </div>
          <div className="flex flex-col items-start font-semibold">
            <div className="mb-4 lg:mt-0">
              <p>Akun</p>
            </div>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Kelola ID Apple anda
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              iCloud.com
            </a>
          </div>
          <div className="flex flex-col items-start font-semibold">
            <div className="mb-4 lg:mt-0">
              <p>Untuk Bisnis</p>
            </div>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >Apple dan Bisnis</a>
            <p class="mt-2">Untuk Pendidikan</p>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >Apple dan Pendidikan</a>
          </div>
          <div className="flex flex-col items-start font-semibold">
            <div className="lg:mt-00 mb-4">
              <p>Nilai-nilai Apple</p>
            </div>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Aksesibilitas
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Pendidikan
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Lingkungan
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Privasi
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Rantai Pasokan
            </a>
          </div>
          <div className="flex flex-col items-start font-semibold">
            <div className="mb-4 lg:mt-0">
              <p>Tentang Kami</p>
            </div>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Newsroom
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Kepemimpinan Apple
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Inventor
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Etika & Kepatuhan
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Acara
            </a>
            <a
              href="#"
              className="py-2 text-sm font-normal text-gray-500 transition hover:text-blue-600"
            >
              Hubungi Apple
            </a>
          </div>
        </div>
        <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
        <div className="flex md:flex-row items-start justify-between sm:flex-col flex-col-reverse md:items-center">
          <p className="text-gray-500 text-sm sm:text-base">
            © Copyright 2021. All rights reserved.
          </p>
          <div className=" text-center font-semibold py-1">
            <a
              href="#"
              className="inline-block py-2 pl-5 font-normal text-gray-500 transition hover:text-blue-600 px-2.5 lg:pl-12"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="inline-block py-2 pl-5 font-normal text-gray-500 transition hover:text-blue-600 px-2.5 lg:pl-12"
            >
              License
            </a>
            <a
              href="#"
              className="inline-block py-2 pl-5 font-normal text-gray-500 transition hover:text-blue-600 px-2.5 lg:pl-12"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
