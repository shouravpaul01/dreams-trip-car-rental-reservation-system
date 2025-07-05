import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaRegFaceFrownOpen,
  FaSquarePen,
} from "react-icons/fa6";
import { TBanner } from "../../type/banner.type";
import { toast } from "sonner";
import { useUpdateBannerStatusMutation } from "../../redux/banner/bannerAPi";

export default function BannerTable({
  banners,
  setBannerId,
}: {
  banners: TBanner[];
  setBannerId: (_id: string) => void;
}) {
    const [updateBannerStatus]=useUpdateBannerStatusMutation()
    const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updateBannerStatus(updateData).unwrap();
    toast.success(res.message);
  };
  console.log(banners,"banners")
  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
        <table className="table  ">
          {banners?.length == 0 && (
            <caption className="caption-bottom  text-lg py-4">
              <span className="flex justify-center items-center gap-2">
                <FaRegFaceFrownOpen /> Data not found!.
              </span>
            </caption>
          )}
          {/* head */}
          <thead className="bg-[#3aa27ea8] text-sm rounded-md">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner: TBanner, index: number) => (
              <tr key={index}>
                <td>
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={banner.image} alt="image" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base line-clamp-1">
                        Tilte:{" "}
                        <span className="font-semibold ">{banner.title}</span>
                      </p>
                      {banner?.car && (
                        <p className="text-base line-clamp-1">
                          Car :
                          <span className="font-semibold ">{banner.car.name}</span>
                        </p>
                      )}
                       <p className="text-base line-clamp-1">
                        Tilte:{" "}
                        <span className="font-semibold ">{banner.title}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="line-clamp-3">{banner.description}</p>
                </td>
                <td>
                  <div className="flex gap-2 items-center ">
                    <FaCircleDot
                      className={
                        banner.isActive ? "text-primary" : "text-error"
                      }
                    />
                    <span>{banner.isActive ? "Active" : "Inactive"}</span>
                    <button
                      className={`btn btn-sm btn-outline btn-success `}
                      onClick={() =>
                        handleStatusUpdate(
                          banner._id!,
                          banner.isActive ? false : true
                        )
                      }
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td>
                  <label
                    htmlFor="my_modal_6"
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => {
                      setBannerId(banner._id);
                    }}
                  >
                    <FaSquarePen />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
