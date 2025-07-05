import Lottie from "lottie-react";
import carLottie from "../../../assets/lottie/car-lottie.json";
import { SectionHeader } from "../../../components/ui/SectionHeader";
const FAQSection = () => {
const faqData = [
  {
    question: "What documents are required to rent a car?",
    answer:
      "To rent a car, you need a valid driving license, a government-issued ID or passport, and a credit/debit card for payment and security deposit.",
  },
  {
    question: "Is there a minimum age requirement for renting a car?",
    answer:
      "Yes, the minimum age to rent a car is typically 21 years. Drivers under 25 may be subject to a young driver surcharge.",
  },
  {
    question: "Do I need to refuel the car before returning?",
    answer:
      "Yes, cars should be returned with the same fuel level as when rented. Additional charges may apply if not refueled.",
  },
  {
    question: "What happens if the car breaks down?",
    answer:
      "In case of a breakdown, contact our 24/7 roadside assistance immediately. We will either repair or replace the vehicle based on the situation.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer:
      "Yes, you can cancel or modify your booking up to 24 hours before the pickup time without any cancellation fee.",
  },
];


  return (
    <div className="my-container">
     <SectionHeader title="Frequently Asked Questions" subtitle="Find answers to your questions from our previous answers" />
      <div className="flex flex-col md:flex-row gap-5 py-6">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-[4px]">
          <Lottie animationData={carLottie} loop={true} width={350} height={350} />
        </div>
       <div className="w-full md:w-1/2 space-y-2">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="collapse rounded-[4px] collapse-plus bg-white"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-lg font-medium border-b border-dashed">
                Q: {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
