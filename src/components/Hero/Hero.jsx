import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { Link } from 'react-router';
// Hero jsx
const slides = [
  {
    title: 'Book Bus Tickets Easily',
    description: 'Fast and secure bus ticket booking with TicketBari.',
    image: 'https://i.ibb.co.com/sdPPcj5F/bus.jpg'
  },
  {
    title: 'Train Ticket Booking',
    description: 'Reserve your train seats hassle-free.',
    image: 'https://i.ibb.co.com/B24BV660/train.jpg'
  },
  {
    title: 'Flight & Launch Tickets',
    description: 'Travel anywhere with ease and comfort.',
    image: 'https://i.ibb.co.com/cK0S4hFJ/flight.jpg'
  }
];

const Hero = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`w-full relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-[600px] md:h-[700px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden animate-slideZoom"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/40 p-6 md:p-12 rounded-xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-400">{slide.title}</h2>
                <p className="text-lg md:text-2xl text-white/90 mb-6">{slide.description}</p>
                <Link to={'/all-tickets'} className="mt-10 px-6 py-3 bg-yellow-400 text-orange-600 font-semibold rounded-lg hover:opacity-90 transition">
                  Book Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
