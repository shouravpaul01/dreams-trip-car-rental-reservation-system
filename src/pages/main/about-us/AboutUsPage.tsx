import TeamInformationCard from "../../../components/cards/TeamInformationCard";
import ContactInfoCard from "../../../components/form/ContactInfoCard";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import dreamstrip_logo from "/dreamstrip-logo.png";
import { contactInfo, teamInformations } from "../../../constant";
import CarCard from "../../../components/cards/CarCard";
import { TCar } from "../../../type/car.type";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";

const AboutUsPage = () => {

  const { data: cars,} = useGetAllCarsQuery(undefined);
  return (
    <div>
      <Breadcrumbs title="About Us" />

      {/* About Us Section */}
      <section className="py-10">
        {/* Company History */}
        <div className="my-container  mb-10">
          <h2 className="text-2xl font-Spicy_Rice mb-4">Our Story</h2>
          <div className="flex flex-col-reverse md:flex-row gap-3">
            <div className="w-full md:w-[50%]">
              <p className="text-gray-600 indent-10 text-justify">
                In 2015, DreamsCox'sTrip started with just a few cars—a small,
                but diverse fleet that included budget-friendly compact cars,
                comfortable SUVs, and luxurious vehicles for those wanting a
                little extra style. His goal was simple: to provide travelers
                with a seamless experience while exploring Cox’s Bazar, from its
                bustling tourist spots to its quiet, untouched corners.
                <br className="pt-2" /> DreamsCox'sTrip's service wasn’t just
                about renting cars; it was about giving people the freedom to
                explore Cox’s Bazar on their own terms. Whether it was a family
                vacation to Inani Beach, a honeymoon trip to the serene St.
                Martin’s Island, or an adventurous journey to Himchari
                Waterfall, DreamsCox'sTrip had a car for every traveler.
              </p>
            </div>
            <div className="border-l border-dashed border-success hidden md:block"></div>
            <div className="w-full md:w-[50%] relative flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1725828754/dreams-trip-car-rental-reservation-system/c4z9sy2svhxdjfepybvr.png"
                alt="Logo"
                className="w-[150px] md:w-[200px] absolute top-0"
              />
              <img src={dreamstrip_logo} alt="logo" className="w-[80%] mt-32 md:mt-20" />
            </div>
          </div>
        </div>
        <div
          className={`my-container  flex flex-col md:flex-row gap-5 md:gap-0 justify-around bg-green-100 text-black border  border-black border-opacity-30  rounded-lg px-7 py-7  mb-10`}
        >
          {contactInfo?.map((info, index) => (
            <ContactInfoCard
              key={index}
              info={info}
              index={index}
              titleClassName="text-black"
              borderClassName="border-black border-opacity-30 "
            />
          ))}
        </div>
        {/* Our Team Section */}
        <div className="my-container  mb-10">
          <h2 className="text-2xl font-Spicy_Rice mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member Profile */}
            {teamInformations?.map((info, index) => (
              <TeamInformationCard key={index} info={info} />
            ))}
          </div>
        </div>

        {/* Our Fleet Section */}
        <div className="mb-10 bg-green-50 py-10">
          <div className="my-container">
          <h2 className="text-2xl font-Spicy_Rice mb-4">Our Fleet</h2>
          <p className="text-gray-600 mb-7">
            From economy cars for budget-friendly trips to luxurious vehicles
            for special occasions, our fleet has it all. We offer a wide
            selection of cars, including sedans, SUVs, and luxury options to
            suit your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
              {cars?.data?.data.slice(0,3).map((car: TCar, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            
          </div>
          </div>
        </div>

        {/* Values & Commitment Section */}
        <div className="my-container mb-10">
          <h2 className="text-2xl font-Spicy_Rice mb-4">
            Our Values & Commitment
          </h2>
          <p className="text-gray-600">
            DreamsCox'sTrip’s commitment to customer service and sustainability
            became the company’s core values. Every car in the fleet was
            regularly inspected to ensure safety and comfort, and the company’s
            customer service team was always ready to help, whether that meant
            picking up clients from the airport or suggesting the best time to
            catch the sunset at Laboni Beach.
            <br />
            DreamsCox'sTrip became synonymous with reliability. Travelers knew
            that no matter where they were in Cox’s Bazar—be it the bustling
            markets of the town center or the remote beauty of Maheshkhali
            Island—they could count on DreamsCox'sTrip to provide a vehicle that
            would take them there with ease.
          </p>
        </div>

       
      </section>
    </div>
  );
};

export default AboutUsPage;
