import { FaArrowRightLong, FaRegFaceFrown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useTitle from "../../hook/useTitle";

const NotFound = () => {
    useTitle("Not Found")
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">   
      <p className="text-6xl font-extrabold animate-bounceLR flex">4 <FaRegFaceFrown className="animate-bounce text-gray-600"/> 4</p>
      <Link to={"/"} className="btn btn-sm btn-primary rounded-full min-w-52">
      <FaArrowRightLong /> Go to home
      </Link>
      
    </div>
  );
};

export default NotFound;
