import { useState } from "react";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import UserTable from "./UserTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import { FaPlus } from "react-icons/fa6";
import CreateUpdateUserForm from "../../../components/form/CreateUpdateUserForm";

const UserPage = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userEmail, setUserEmail] = useState<string>("");
  const { data: users, isLoading } = useGetAllUsersQuery([
    { label: "search", value: searchInputValue },
    { label: "page", value: currentPage },
  ]);

  if (isLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <>
      <div className=" mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl flex-1">Manage Types</p>
          <label
            htmlFor="my_modal_6"
            className={`btn btn-sm btn-circle  btn-secondary`}
            onClick={() => setUserEmail("")}
          >
            <FaPlus />
          </label>
        </div>
        <div className="px-0 md:px-4 py-5 space-y-5">
          <div className="w-full md:w-80 ">
            <InputSearch
              className="input-sm h-9"
              setSearchValue={setSearchInputValue}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
          </div>

          <UserTable users={users?.data?.data} setUserEmail={setUserEmail} />

          <div className="px-2 ">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={users?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <CreateUpdateUserForm userEmail={userEmail} />
    </>
  );
};

export default UserPage;
