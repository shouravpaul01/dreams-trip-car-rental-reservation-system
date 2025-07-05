import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaRegFaceFrownOpen,
  FaUserLarge,
  FaUserShield,
} from "react-icons/fa6";
import { TUserInfo } from "../../../type/user.type";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { blankImage } from "../../../constant";
import { FaEdit } from "react-icons/fa";

const UserTable = ({ users,setUserEmail }: { users: TUserInfo[], setUserEmail: (email: string) => void }) => {
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleUpdateRole = async (email: string, role: string) => {
    const updateData = {
      email,
      role,
    };
    const res = await updateUserRole(updateData).unwrap();
    console.log(res);
    toast.success(res.message);
  };
  const handleStatusUpdate = async (email: string, isBlocked: boolean) => {
    const updateData = {
      email,
      isBlocked,
    };
    const res = await updateUserStatus(updateData).unwrap();
    console.log(res);
    toast.success(res.message);
  };
  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
        <table className="table  bg-white rounded-md">
          {users?.length == 0 && (
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
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: TUserInfo, index: number) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        className="mask mask-squircle size-12"
                        src={user?.image || blankImage}
                      />
                    </div>
                    <div>
                      <p className="font-bold"> {user.name}</p>
                      <p className=" text-gray-500">
                        Email:
                        <span className="font-semibold"> {user.email}</span>
                      </p>
                      <p className=" text-gray-500">
                        Phone:
                        <span className="font-semibold"> {user.phone}</span>
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      className={`btn btn-sm btn-outline btn-success ${
                        user.role == "admin" && "btn-active cursor-not-allowed"
                      }`}
                      onClick={() => {
                        user.role == "admin"
                          ? toast.warning("Already The user role is 'Admin'. ")
                          : handleUpdateRole(user.email, "admin");
                      }}
                    >
                      <FaUserShield />
                      Admin
                    </button>
                    <button
                      className={`btn btn-sm btn-outline btn-success ${
                        user.role == "user" && "btn-active cursor-not-allowed"
                      }`}
                      onClick={() => {
                        user.role == "user"
                          ? toast.warning("Already The user role is 'User'. ")
                          : handleUpdateRole(user.email, "user");
                      }}
                    >
                      <FaUserLarge />
                      User
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center ">
                    <FaCircleDot
                      className={user.isBlocked ? "text-primary" : "text-error"}
                    />
                    <span>{user.isBlocked ? "Block" : "Unblock"}</span>
                    <button
                      className={`btn btn-sm btn-outline btn-success `}
                      onClick={() =>
                        handleStatusUpdate(
                          user.email!,
                          user.isBlocked ? false : true
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
                    className={`btn btn-sm btn-success btn-outline `}
                    onClick={() => setUserEmail(user.email!)}
                  >
                    <FaEdit />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
