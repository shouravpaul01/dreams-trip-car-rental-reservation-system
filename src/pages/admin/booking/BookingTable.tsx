import {
    FaArrowRightArrowLeft,
    FaCalendarDays,
    FaCircleDot,
    FaInfo,
    FaLocationDot,
    FaRegClock,
    FaRegFaceFrownOpen,
    FaSquarePen,
  } from "react-icons/fa6";
  import { useState } from "react";
import { TBooking } from "../../../type/booking.type";
import { useUpdateApprovalStatusMutation } from "../../../redux/features/booking/bookingApi";
import { toast } from "sonner";
import moment from "moment";
  
  
  
  const BookingTable = ({ bookings}: { bookings: TBooking[] }) => {
    const [modalId, setModalId] = useState<string>("");
   const [updateApprovalStatus]=useUpdateApprovalStatusMutation()
    // const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
    //   modalId,
    //   { skip: !modalId }
    // );
    const handleApprovedStatus = async (_id: string, isApproved: boolean) => {
        const updateData = {
          _id: _id,
          isApproved: isApproved,
        };
        console.log(updateData)
        const res = await updateApprovalStatus(updateData).unwrap();
        console.log(res)
        toast.success(res.message);
      };
    
    const hanleCloseModal = () => {
      setModalId("");
    };
   
    return (
      <>
        <div className="overflow-x-auto">
          <table className="table  bg-white rounded-none">
            {bookings?.length == 0 && (
              <caption className="caption-bottom  text-lg py-4">
                <span className="flex justify-center items-center gap-2">
                  <FaRegFaceFrownOpen /> Data not found!.
                </span>
              </caption>
            )}
            {/* head */}
            <thead className="bg-[#3aa27ea8] text-sm text-black">
              <tr>
                <th>Name</th>
                <th>Booking Info</th>
                <th>Price</th>
                <th>Approved</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking: TBooking, index: number) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={booking.car.image} alt="image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{booking.car.name}</div>
                        <div className="text-sm opacity-50">Type: {booking.car.type?.name  }</div>
                        <div className="text-sm opacity-50">Color: {booking.car.color}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                  <div className="dropdown dropdown-hover dropdown-top ">
                    <button
                      tabIndex={0}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <FaInfo /> Info
                    </button>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-64 p-2 shadow"
                    >
                      {
                        booking.drivingType=="Company Provided"?<div className="space-y-1">
                        <p className="font-semibold">Start Time: <span className="badge badge-neutral"><FaRegClock  className="me-2" />{booking.startTime}</span></p>
                        <p className="font-semibold">Start Date: <span className="badge badge-neutral"><FaCalendarDays className="me-2" />{moment(booking.startDate).format('ll')}</span></p>
                        </div>:<div className="space-y-1">
                        <p className="font-semibold">Pickup Time: <span className="badge badge-neutral"><FaRegClock  className="me-2" />{booking.startTime}</span></p>
                        <p className="font-semibold">Pickup Date: <span className="badge badge-neutral"><FaCalendarDays className="me-2" />{moment(booking.pickupDate).format('ll')}</span></p>
                       
                        <p className="font-semibold">Pickup Location: <span className="badge badge-neutral"><FaLocationDot className="me-2" />{booking.pickupLocation}</span></p>
                        <p className="font-semibold">Return Location: <span className="badge badge-neutral"><FaLocationDot className="me-2" />{booking.returnLocation}</span></p>
                        </div>
                      }
                    
                    </div>
                  </div>
                  </td>
                  <td><span className="font-semibold">{booking.priceType.type=="daily"?`${booking.priceType.price}TK/D`:`${booking.priceType.price}TK/H`}</span></td>
                  <td>
                    <div className="flex gap-2 items-center ">
                      <FaCircleDot
                        className={booking.isApproved ? "text-primary" : "text-error"}
                      />
                      <span>{booking.isApproved ? "Approved" : "Pending"}</span>
                      <button
                        className={`btn btn-sm btn-outline btn-success `}
                        onClick={() =>
                          handleApprovedStatus(
                            booking._id!,
                            booking.isApproved ? false : true
                          )
                        }
                      >
                        <FaArrowRightArrowLeft />
                      </button>
                    </div>
                  </td>
                  <td >
                  <div className="flex gap-2">
                  {/* <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setContentManage("update"), setCarId(car._id!);
                      }}
                    >
                      <FaSquarePen />
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setModalId(car._id!);
                      }}
                    >
                      <FaInfo />
                    </button> */}
                    </div> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* <Modal
          modalId={modalId}
          width="max-w-3xl"
          modalTitle="Car Details"
          hanleCloseModal={hanleCloseModal}
        >
        {isSingleCarLoading ?<Loading className="h-[400px]"/>:<CarDetailsTable details={car?.data}/>}
        </Modal> */}
      </>
    );
  };
  
  export default BookingTable;
  