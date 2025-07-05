import CustomerTestimonialSection from "./CustomerTestimonialSection";
import FeaturedCarSection from "./FeaturedCarSection";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseSection from "./WhyChooseSection";
import useTitle from "../../../hook/useTitle";
import CarTypeSection from "./CarTypeSection";
import FAQSection from "./FAQSection";

const HomePage = () => {
  useTitle("");
  return (
    <div className="space-y-28 ">
      <HeroSection />
      <HowItWorksSection />

      <FeaturedCarSection />
      <CarTypeSection />
      <WhyChooseSection />
      <CustomerTestimonialSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
