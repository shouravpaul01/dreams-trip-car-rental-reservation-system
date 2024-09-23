import { FaArrowRightLong } from "react-icons/fa6"
import { MdOutlinePayment } from "react-icons/md"
import { Link } from "react-router-dom"


const PaymentCencel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">   
      <p className="text-8xl animate-bounce text-gray-600"> <MdOutlinePayment 
      /> </p>
      <p className="text-3xl font-Spicy_Rice text-red-400 mb-3">Your Payment was not success !.</p>
      <Link to={"/"} className="btn btn-sm btn-success rounded-full min-w-52">
      <FaArrowRightLong /> Go to home
      </Link>
      
    </div>
  )
}

export default PaymentCencel
