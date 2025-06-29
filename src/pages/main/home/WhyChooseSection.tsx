import { FaCar, FaDollarSign, FaHeadset } from "react-icons/fa6";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { motion } from "motion/react";

const WhyChooseSection = () => {
  const whyChooseMeOptions = [
    {
      icon: <FaDollarSign className="text-5xl text-green-400 " />,
      title: "Best Prices",
      description: "We offer the most competitive prices in the market.",
    },
    {
      icon: <FaCar className="text-5xl text-blue-400 " />,
      title: "Wide Selection",
      description: "Choose from a wide variety of vehicles to fit your needs.",
    },
    {
      icon: <FaHeadset className="text-5xl text-yellow-400 " />,
      title: "24/7 Support",
      description: "Our support team is available around the clock.",
    },
  ];

  return (
    <div className="my-container pt-28 pb-10">
      <SectionHeader
        title="Why Choose Us?"
        subtitle="Discover what sets us apart from the competition."
      />
      <div className="relative">
        <div className="w-[1px] md:w-full md:h-[1px] border border-success border-dashed   absolute top-0 md:top-[48%] bottom-0 left-[48%] md:left-0 md:right-0  "></div>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-14">
          {whyChooseMeOptions.map((option, index) => (
            <motion.div
              key={index}
              className="card w-full bg-base-100 backdrop-blur-sm card-md shadow-sm shadow-green-300"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="flex justify-center mb-3"
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {option.icon}
                </motion.div>

                <h3 className="text-2xl font-bold">{option.title}</h3>

                <p className="text-gray-600">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
