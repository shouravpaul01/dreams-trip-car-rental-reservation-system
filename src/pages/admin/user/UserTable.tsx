import { FaRegFaceFrownOpen, FaUserLarge, FaUserShield } from "react-icons/fa6";
import { TUserInfo } from "../../../type/user.type";
import { useUpdateUserRoleMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";

const UserTable = ({ users }: { users: TUserInfo[] }) => {
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUpdateRole = async (email: string, role: string) => {
    const updateData = {
      email,
      role,
    };
    const res = await updateUserRole(updateData).unwrap();
    console.log(res);
    toast.success(res.message);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: TUserInfo, index: number) => (
              <tr key={index}>
                <td>
                  <div>
                    <div className="font-bold">Name: {user.name}</div>
                    <div className="font-bold text-gray-500">Email: {user.email}</div>
                    <div className="font-bold text-gray-500">Phone: {user.phone}</div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
};

export default UserTable;
