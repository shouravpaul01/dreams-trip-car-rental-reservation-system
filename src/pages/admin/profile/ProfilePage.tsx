
import ProfileInfo from "../../main/user-dasboard/ProfileInfo";

export default function ProfilePage() {
  return (
    <div className=" mt-4">
      <div className=" bg-[#3aa27ea8]  py-2 px-4">
        <p className="font-Spicy_Rice text-xl flex-1">Profile</p>
      </div>
      <div className="flex item-center justify-center  my-4">
        <ProfileInfo/>
      </div>
    </div>
  );
}
