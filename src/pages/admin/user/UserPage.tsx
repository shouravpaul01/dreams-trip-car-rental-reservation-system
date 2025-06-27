import { useState } from "react";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import UserTable from "./UserTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";




const UserPage = () => {
 
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: users, isLoading } = useGetAllUsersQuery([{label:"search",value:searchInputValue},{label:"page",value:currentPage}]);
 


  if (isLoading) {
    return <Loading className="h-screen"/>;
  }
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl flex-1">Manage User</p>
          
        </div>
        <div className="px-4 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <div className="w-full md:w-80 mb-3">
              <InputSearch
                className="input-sm h-9"
                setSearchValue={setSearchInputValue}
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
          </div>

          <UserTable users={users?.data?.data} />

          <div className="px-2 py-3">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={users?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default UserPage;
