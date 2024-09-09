import FeaturedCarSection from "./FeaturedCarSection"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import WhyChooseSection from "./WhyChooseSection"


const HomePage = () => {
  return (
    <div className=" ">
      <HeroSection/>
      <WhyChooseSection/>
      <FeaturedCarSection/>
      <HowItWorksSection/>
    </div>
  )
}

export default HomePage

