
import { testimonials } from "../../../constant";
import TestimonialCard from "../../../components/cards/TestimonialCard";
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';

 const CustomerTestimonialSection = () => {
  return (
   <div className="bg-slate-100 py-9">
     <div className="my-container">
      <h2 className="text-4xl font-bold font-Spicy_Rice text-center">
        Our Customer Review
      </h2>
      <p className="text-lg text-center text-gray-600 mb-8">
        Our Customer, Our Pride
      </p>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper !pb-10"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard testimonial={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
  );
};

export default CustomerTestimonialSection;
