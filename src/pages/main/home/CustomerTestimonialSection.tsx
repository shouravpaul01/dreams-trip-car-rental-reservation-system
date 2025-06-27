
import { testimonials } from "../../../constant";
import TestimonialCard from "../../../components/cards/TestimonialCard";

const CustomerTestimonialSection = () => {
  return (
    <div className="my-container pt-10 pb-20">
        <h2 className="text-4xl font-bold font-Spicy_Rice text-center ">
        Our Customer Review
      </h2>
      <p className="text-lg text-center text-gray-600 mb-8">
        Our Customer ,Our Pride
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {
        testimonials.map((item,index)=>  <TestimonialCard key={index} testimonial={item}/>)
      }
        
      </div>
    </div>
  );
};

export default CustomerTestimonialSection;
