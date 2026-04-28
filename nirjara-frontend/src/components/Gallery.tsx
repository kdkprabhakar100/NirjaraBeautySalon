import { useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  {
    image: "/images/hair.png",
    title: "Hair Styling",
  },
  {
    image: "/images/facial.png",
    title: "Skin & Facial",
  },
  {
    image: "/images/bridal.png",
    title: "Bridal Beauty",
  },
  {
    image: "/images/salon.png",
    title: "Salon Interior",
  },
  {
    image: "/images/salon1.png",
    title: "Beauty Session",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const currentImage = galleryImages[currentIndex];

  return (
    <section className="bg-[#FFF5F8] px-6 py-24 md:px-12">
      <div className="mb-16 text-center">
        <p className="text-xs uppercase tracking-[4px] text-[#E75480]">
          Our Gallery
        </p>

        <h2 className="mt-4 font-serif text-5xl font-light text-[#3A2A2F]">
          Signature{" "}
          <span className="italic text-[#E75480]">Beauty Moments</span>
        </h2>

        {/* <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#8A6F78]">
          A dynamic gallery designed so admins can later upload and manage salon
          photos directly from the dashboard.
        </p> */}

        <div className="mx-auto mt-6 h-[1px] w-20 bg-[#E75480]/50" />
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.div
          key={currentImage.image}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
        >
          <div className="relative h-[520px]">
            <img
              src={currentImage.image}
              alt={currentImage.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs uppercase tracking-[3px]">
                Nirjara Gallery
              </p>
              <h3 className="mt-2 font-serif text-4xl">
                {currentImage.title}
              </h3>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#E75480] shadow-lg"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#E75480] shadow-lg"
            >
              ›
            </button>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center gap-3">
          {galleryImages.map((item, index) => (
            <button
              key={item.image}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition ${
                currentIndex === index
                  ? "w-10 bg-[#E75480]"
                  : "w-3 bg-[#E75480]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}