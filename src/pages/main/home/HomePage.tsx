import { useAppSelector } from "../../../redux/hook"
import FeaturedCarSection from "./FeaturedCarSection"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import WhyChooseSection from "./WhyChooseSection"


const HomePage = () => {
  const {user} =useAppSelector(state=>state.auth)
  console.log(user)
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

