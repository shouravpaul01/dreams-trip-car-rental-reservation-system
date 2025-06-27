
import CustomerTestimonialSection from "./CustomerTestimonialSection"
import FeaturedCarSection from "./FeaturedCarSection"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import WhyChooseSection from "./WhyChooseSection"
import useTitle from "../../../hook/useTitle"


const HomePage = () => {
 useTitle("")
  return (
    <div className=" ">
      <HeroSection/>
      <WhyChooseSection/>
      <FeaturedCarSection/>
      <HowItWorksSection/>
      <CustomerTestimonialSection />
    </div>
  )
}

export default HomePage

