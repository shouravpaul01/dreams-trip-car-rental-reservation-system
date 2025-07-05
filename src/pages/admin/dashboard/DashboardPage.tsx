import Loading from "../../../components/ui/Loading";
import useTitle from "../../../hook/useTitle";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { FaCar, FaCubesStacked } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TCar } from "../../../type/car.type";
import { MdOutlineAddCard } from "react-icons/md";

// Optional static chart data
const chartData = [
  { name: "SUV", uv: 4000 },
  { name: "Sedan", uv: 3000 },
  { name: "Truck", uv: 2000 },
  { name: "Mini", uv: 2780 },
];
const data = [
  { name: "Group A", value: 400, color: "#34d399" },
  { name: "Group B", value: 300, color: "#60a5fa" },
  { name: "Group C", value: 300, color: "#f472b6" },
  { name: "Group D", value: 200, color: "#facc15" },
];
export const AdminDashboardPage = () => {
  useTitle("Admin Dashboard");

  const { data: cars, isLoading: isCarsLoading } =
    useGetAllCarsQuery(undefined);
  const { data: bookings, isLoading: isBookingsLoading } =
    useGetAllBookingsQuery(undefined);

  if (isCarsLoading || isBookingsLoading) {
    return <Loading className="h-screen" />;
  }

  const totalCars = cars?.data?.data?.length || 0;
  const totalBookings = bookings?.data?.data?.length || 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex bg-purple-300 p-4 rounded-xl shadow">
          <p className="text-3xl flex items-center grow">
          <FaCar />
          </p>
          <div className="text-xl font-bold text-right">
            <p>Total Cars</p>
            <p>{totalCars}</p>
          </div>
        </div>
        <div className="flex bg-pink-300 p-4 rounded-xl shadow">
          <p className="text-3xl flex items-center grow">
            <FaCubesStacked />
            
          </p>
          <div className="text-xl font-bold text-right">
            <p>Total Bookings</p>
            <p>{totalBookings}</p>
          </div>
        </div>
        <div className="flex bg-yellow-300 p-4 rounded-xl shadow">
          <p className="text-3xl flex items-center grow">
            <MdOutlineAddCard />
          </p>
          <div className="text-xl font-bold text-right">
            <p>Available Cars</p>
            <p>
              {cars?.data?.data?.filter((car: TCar) => car.isAvailable).length}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[60%] h-[400px] bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-Spicy_Rice mb-4">Bookings by Car Type</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uv" fill="#00d390" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-[40%] h-[400px] bg-white shadow rounded-xl p-4">
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} label>
                {data.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
