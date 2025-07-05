import { motion } from "framer-motion";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { FaCalendarAlt, FaCarAlt, FaMapMarkerAlt } from "react-icons/fa";

const HowItWorksSection = () => {
  const howItWorksSteps = [
  {
    id: 1,
    title: "Choose Date & Locations",
    description: "Select the date and location that suits you best.",
    icon: FaCalendarAlt,
    color: {
      bg: "bg-pink-200",
      text: "text-pink-700",
      outline: "outline-pink-800",
    },
  },
  {
    id: 2,
    title: "Pick-Up Locations",
    description: "Choose from multiple convenient pick-up locations.",
    icon: FaMapMarkerAlt,
    color: {
      bg: "bg-green-200",
      text: "text-green-700",
      outline: "outline-green-800",
    },
  },
  {
    id: 3,
    title: "Book your Car",
    description: "Complete the booking and enjoy your ride.",
    icon: FaCarAlt,
    color: {
      bg: "bg-violet-200",
      text: "text-purple-700",
      outline: "outline-violet-800",
    },
  },
];
  return (
    <div className="my-container border-2 border-success border-dashed rounded-md p-8">
      <SectionHeader
        title="How It Works?"
        subtitle="Follow these simple steps to get started"
      />
      <div className="relative">
        <div className="hidden md:block border border-success border-dashed absolute top-[28%] left-[110px] right-[110px] z-0" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {howItWorksSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-slate-100 rounded-full p-6 mb-6 relative ">
                  <motion.div
                    className={`${step.color.bg} size-24 rounded-full outline-2 outline-dashed ${step.color.outline} outline-offset-8`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Icon
                    className={`text-6xl ${step.color.text} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  />
                </div>
                <h3 className="font-Spicy_Rice text-2xl text-gray-600 mb-2">
                  {step.id}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
