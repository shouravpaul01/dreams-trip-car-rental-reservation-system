
import { FaQuoteLeft, FaRegStar, FaStar } from 'react-icons/fa6'

const TestimonialCard = ({testimonial}:{testimonial:any}) => {
  return (
    <div className="bg-green-100 border-2 border-dashed border-success rounded-tr-[40px] rounded-bl-[40px] p-6 relative mt-10">
    <div className=" bg-white rounded-full p-2 flex items-center space-x-4 absolute -top-16 ">
      {/* Customer Picture */}
      <img
        className="w-28 h-28 rounded-full border-2 border-gray-300"
        src={testimonial.image}
        alt="Customer"
      />


    </div>

    {/* Rating */}
    <div className="flex testimonials-center mt-14">
      {/* Star Rating (Using React Icons) */}
      <FaStar className="text-yellow-500 w-5 h-5" />
      <FaStar className="text-yellow-500 w-5 h-5" />
      <FaStar className="text-yellow-500 w-5 h-5" />
      <FaStar className="text-yellow-500 w-5 h-5" />
      <FaRegStar className="text-gray-400 w-5 h-5" />
      <span className="ml-2 text-sm text-gray-600">4.0/5.0</span>
    </div>

    {/* Review */}
    <p className="mt-4 text-gray-700 leading-relaxed">
    {testimonial.review}
    </p>

    {/* Timestamp */}
    <p className="mt-2 text-xs text-gray-400">
     {testimonial.date}
    </p>
    <div className="absolute -bottom-5 right-5 text-5xl"><FaQuoteLeft className="text-5xl" /></div>
  </div>
  )
}

export default TestimonialCard
