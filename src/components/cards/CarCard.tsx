import { FaArrowRight, FaStar } from 'react-icons/fa6'
import { TCar } from '../../redux/features/car-type/car.type'

const CarCard = ({car}:{car:TCar}) => {
  return (
    <div
            
            className="card bg-base-100 border hover:shadow-xl  p-3"
          >
            <figure>
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-[250px]"
              />
            </figure>
            <div className="border-t relative ">
              <p className="badge font-bold absolute -top-[10px] right-2">
                <FaStar className="text-xl text-warning pe-2" />
                4.5
              </p>
            </div>
            <div className="card-body p-3">
              <h2 className="card-title ">{car.name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end items-center">
                <p>
                  Price:{" "}
                  <span className="font-bold">{car.pricePerHour} /hr</span>
                </p>
                <button className="btn btn-sm btn-success rounded-full">
                  {" "}
                  <FaArrowRight /> Book Now
                </button>
              </div>
            </div>
          </div>
  )
}

export default CarCard
