import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const testimonials = [
  {
    image: "https://avatars.githubusercontent.com/u/195456266?v=4",
    name: "MD Amdad Islam",
    handle: "@amdadislam01",
    text: "This product completely changed how we approach pricing. Super smooth and effective.",
  },
  {
    image: "https://avatars.githubusercontent.com/u/92626624?v=4",
    name: "Md Zahidul Islam",
    handle: "@mdzahidulislam-dev",
    text: "Absolutely love it! The experience feels premium and very easy to use.",
  },
  {
    image: "https://avatars.githubusercontent.com/u/78620963?v=4",
    name: "Md Rijoan Maruf",
    handle: "@mdrijoanmaru",
    text: "Helped us grow faster than expected. The results were visible in days.",
  },
  {
    image: "https://avatars.githubusercontent.com/u/219156601?v=4",
    name: "Obaidullah Miazi",
    handle: "@obaidullah-miazi-dev",
    text: "Clean UI, great support, and excellent performance. Highly recommended!",
  },
];

const TestimonialCard = ({ data, isDarkMode }) => {
  return (
    <div
      className={`w-72 shrink-0 mx-4 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${
        isDarkMode
          ? "bg-linear-to-br from-amber-900/30 to-orange-900/30 border-amber-700/50 backdrop-blur-sm"
          : "bg-linear-to-br from-yellow-50 to-orange-50 border-yellow-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className={`size-14 rounded-full ring-4 ${
            isDarkMode ? "ring-amber-600" : "ring-orange-400"
          }`}
        />

        <div>
          <p className={`font-bold flex items-center gap-1.5 ${isDarkMode ? "text-amber-100" : "text-gray-900"}`}>
            {data.name}
            <span className={isDarkMode ? "text-yellow-400" : "text-orange-500"}>★</span>
          </p>
          <span className={`text-sm ${isDarkMode ? "text-amber-300" : "text-orange-600"}`}>
            {data.handle}
          </span>
        </div>
      </div>

      <p className={`text-base mt-5 leading-relaxed ${isDarkMode ? "text-amber-50" : "text-gray-700"}`}>
        “{data.text}”
      </p>
    </div>
  );
};

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#0f172a]"
          : "bg-gray-50"
      }`}
    >
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 35s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        .reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-center mb-2 md:mb-4 font-extrabold tracking-tight leading-tight">
            <span className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Loved by our customers 
            </span>
          </h2>
        <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDarkMode ? "text-amber-200" : "text-gray-600"}`}>
          Real feedback from people who use our product every day.
        </p>
      </div>

      {/* Marquee  */}
      <div className="relative max-w-7xl mx-auto overflow-hidden mb-8">
        <div
          className={`absolute left-0 top-0 h-full w-32 z-10 ${
            isDarkMode
              ? "bg-linear-to-r from-gray-900 to-transparent"
              : "bg-linear-to-r from-gray-50 to-transparent"
          }`}
        />
        <div className="marquee flex min-w-[200%] py-8">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`row1-${i}`} data={item} isDarkMode={isDarkMode} />
          ))}
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-32 z-10 ${
            isDarkMode
              ? "bg-linear-to-l from-gray-900 to-transparent"
              : "bg-linear-to-l from-gray-50 to-transparent"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full w-32 z-10 ${
            isDarkMode
              ? "bg-linear-to-r from-gray-900 to-transparent"
              : "bg-linear-to-r from-gray-50 to-transparent"
          }`}
        />
        <div className="marquee reverse flex min-w-[200%] py-8">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`row2-${i}`} data={item} isDarkMode={isDarkMode} />
          ))}
        </div>
        <div
          className={`absolute right-0 top-0 h-full w-32 z-10 ${
            isDarkMode
              ? "bg-linear-to-l from-gray-900 to-transparent"
              : "bg-linear-to-l from-gray-50 to-transparent"
          }`}
        />
      </div>
    </section>
  );
};

export default Testimonials;