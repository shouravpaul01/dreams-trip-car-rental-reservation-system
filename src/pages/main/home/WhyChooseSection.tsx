import { FaCar, FaDollarSign, FaHeadset } from 'react-icons/fa6'

const WhyChooseSection = () => {
  return (
    <div className="my-container pt-20 pb-10">
      <h2 className="text-4xl font-Spicy_Rice text-center ">Why Choose Us?</h2>
      <p className="text-lg text-center text-gray-600 mb-8">Discover what sets us apart from the competition.</p>
      <div className='relative'>
<div className='w-[1px] md:w-full md:h-[1px] border border-success border-dashed  absolute top-0 md:top-[48%] bottom-0 left-[48%] md:left-0 md:right-0  '></div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-14">
        <div className="flex flex-col items-center text-center bg-white rounded-lg p-8 z-10">
          <div className="text-5xl text-green-500 mb-4">
            <FaDollarSign />
          </div>
          <h3 className="text-2xl font-bold mb-2">Best Prices</h3>
          <p className="text-gray-600">We offer the most competitive prices in the market.</p>
        </div>
        
        <div className="flex flex-col items-center text-center bg-white rounded-lg p-8 z-10">
          <div className="text-5xl text-blue-500 mb-4">
            <FaCar />
          </div>
          <h3 className="text-2xl font-bold mb-2">Wide Selection</h3>
          <p className="text-gray-600">Choose from a wide variety of vehicles to fit your needs.</p>
        </div>
        <div className="flex flex-col items-center text-center bg-white rounded-lg p-8 z-10">
          <div className="text-5xl text-yellow-500 mb-4">
            <FaHeadset />
          </div>
          <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Our support team is available around the clock.</p>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default WhyChooseSection
