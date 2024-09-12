import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { useGetSingleCarQuery } from "../../../redux/features/car/carApi";
import { FaStar } from "react-icons/fa6";

const CarDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data;
  return (
    <div>
      <Breadcrumbs title="details" />
      <div className="my-container py-28">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[55%]">
            <figure className="border rounded-xl flex items-center justify-center">
              <img src={car?.image} alt="" className="w-[400px]" />
            </figure>
          </div>
          <div className="w-full md:w-[45%] bg-green-100 rounded-xl p-5 space-y-1">
            <p className="bg-green-100 p-4 rounded-full font-bold shadow-md">
              Trusted car rental platform in Bangladesh 100%
            </p>
            <p className="font-bold text-xl line-clamp-2">{car?.name}</p>
            <span className="badge font-bold ">
              <FaStar className="text-yellow-500 pe-1" /> 4.5
            </span>
            <p>
              Price: <span className="font-bold">{car?.pricePerHour}</span>/hr
            </p>
            <div>
                Features: <div className="flex flex-wrap gap-2 ">
                    {
                        car.features.map((feature:string,index:number)=><span key={index} className="badge badge-warning">{feature}</span>)
                    }
                </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold text-2xl border-b pb-2">Description</p>
          <div
            dangerouslySetInnerHTML={{ __html: car?.description || "" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
