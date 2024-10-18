import React, { useState } from 'react';
import serviceImage from '../assets/images/service hp.jpg'; // Sesuaikan path dengan lokasi file Anda
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Drawer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Array of categories
  const categories = [
    "All Categories",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-"> {/* Set background color to light gray */}
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20 mt-20">
        {/* Component */}
        <motion.div 
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
          {/* Image */}
          <img
            src={serviceImage} // Menggunakan gambar yang diimpor
            alt="Service"
            className="w-full max-w-md h-auto rounded-xl" // Pastikan gambar responsif
          />
          {/* Content */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl text-gray-800 md:text-5xl font-bold font-poppins">
              Mari perbaiki <br /> Hp mu
            </h2>
            <p className="text-lg text-gray-600 font-poppins">
              Masalah ponsel Anda bisa segera teratasi dengan <strong>Applenesia</strong>. Temukan berbagai solusi perbaikan untuk ponsel Anda, dari layar pecah hingga baterai lemah. Dengan panduan yang mudah diikuti dan teknisi berpengalaman, website kami siap membantu Anda 24/7. Kunjungi kami dan jadikan ponsel Anda kembali prima hari ini!
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        {/* Component */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-gray-500 sm:text-xl"> Developer & UX Specialist </p>
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8 font-poppins">
              Your Dream Career Starts With Us
            </h1>
            <p className="text-sm text-gray-500 sm:text-xl">
              BuildWithAngga menyediakan kelas UI/UX design, Web Development, dan Freelancer untuk pemula.
            </p>
            {/* Divider */}
            <div className="mb-8 mt-8 h-px w-full bg-gray-300"></div>
            {/* Link */}
            {/* Buttons */}
            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <a href="#" className="flex items-center gap-2 rounded-[5000px] bg-warning px-10 py-5 text-white font-bold text-xl">
                <p>Alur Belajar</p>
              </a>
              <a href="#" className="flex items-center gap-2 rounded-[5000px] bg-white px-10 py-5 text-black font-bold text-xl">
                <p>Panduan Karir</p>
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="min-h-[530px] overflow-hidden rounded-xl bg-white"></div>
        </motion.div>
      </div>

      {/* Container */}
      <motion.div 
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <h5 className="mb-6 text-xl font-semibold md:mb-10 lg:mb-12 text-gray-800">
          The world’s innovative companies use Flowspark
        </h5>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 md:grid-cols-5 md:gap-6">
          <div className="flex justify-center">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b03aedf8d5a0_Microsoft%20Logo.svg"
              alt=""
              className="inline-block"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0620ef8d5a5_PayPal%20Logo.svg"
              alt=""
              className="inline-block"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b00612f8d5a4_Google%20Logo.svg"
              alt=""
              className="inline-block"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0582cf8d599_Chase%20Logo.svg"
              alt=""
              className="inline-block"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0484ef8d59a_Walmart%20Logo.svg"
              alt=""
              className="inline-block"
            />
          </div>
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="relative w-full max-w-full mx-auto mt-10 mb-20">
        <div className="relative flex overflow-hidden" style={{ height: 'px' }}> {/* Adjust height here */}
          {/* Carousel Items */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-full" style={{ height: '400px' }}> {/* Adjust height here */}
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Previous Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full focus:outline-none"
            onClick={handlePrev}
          >
            &#9664;
          </button>
          {/* Next Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full focus:outline-none"
            onClick={handleNext}
          >
            &#9654;
          </button>
        </div>
      </div>

      {/* Autoscrolling */}
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray text-neutral-200 mt-50">
        <div className='w-[50%] flex flex-col'>
          <div className='flex space-y-2 flex-col text-center mb-14'>
            <span className='text-5xl font-bold text-black font-poppins'>
              Skill that I have
            </span>
            <span className='text-2xl text-black font-poppins'>
              These are the technologies I've worked with
            </span>
          </div>

          <div className="relative flex overflow-x-hidden">
            <div className="py-12 animate-marquee whitespace-nowrap">
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
            </div>

            <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
              <span className="text-4xl text-black mx-4">Marquee Item 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter and Items */}
      <section className="relative">
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Filter */}
          <div className="relative mb-14">
            <div className="flex text-gray-500 font-semibold text-sm sm:text-base md:text-sm lg:text-base flex-col md:flex-row gap-5 md:gap-0 max-w-3xl w-full md:justify-between mx-auto">
              {categories.map((category) => (
                <div key={category} className="relative cursor-pointer">
                  <p
                    className={selectedCategory === category ? "text-gray-900 pl-5 md:pl-0" : "pl-5 md:pl-0"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </p>
                  <div
                    className={`md:w-full md:h-[1.5px] h-full w-[1.5px] absolute md:top-8 top-0 bg-gray-900 z-10 ${selectedCategory === category ? "" : "hidden"}`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="md:w-full md:h-[1.5px] h-full w-[1.5px] absolute md:top-8 top-0 bg-gray-300"></div>
          </div>
          <div>
            <div className="mx-auto grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Item */}
              {[...Array(9)].map((_, index) => (
                <a
                  key={index}
                  href="https://guides-tailspark.vercel.app/Blog"
                  className="flex flex-col items-start gap-4 pb-6 text-gray-900 sm:items-start"
                >
                  <div className="relative aspect-[16/7] w-full overflow-hidden rounded-sm md:aspect-[16/8]">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                      alt=""
                      className="absolute inline-block h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-5 pt-4 md:gap-0 md:pt-0">
                    <div className="rounded-md mb-1 bg-blue-50 px-2 py-1.5 text-sm font-medium uppercase text-blue-600">
                      <p>CATEGORY NAME</p>
                    </div>
                    <p className="mb-3 text-xl font-bold md:text-2xl">
                      Marketing Secrets Revealed
                    </p>
                    <div className="flex w-full flex-col justify-between gap-3 text-gray-500 sm:w-auto md:flex-row lg:items-center">
                      <p className="text-sm">By Katia</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 6 6"
                        fill="none"
                        preserveAspectRatio="xMidYMid meet"
                        className="hidden h-1.5 w-1.5 items-center justify-center text-gray-500 lg:block"
                      >
                        <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                      </svg>
                      <p className="text-sm">5 mins read</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Drawer;
