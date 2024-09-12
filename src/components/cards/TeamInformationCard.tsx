import { TTeamInfo } from "../../type"


const TeamInformationCard = ({info}:{info:TTeamInfo}) => {
  return (
    <div className="text-center relative">
    <img src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1726161626/dreams-trip-car-rental-reservation-system/adyp4b82il76fzdhdgq6.png" alt=""  className="absolute -top-8 left-0 right-0 w-48 h-48 mx-auto "/>
    <img
      src={info.image}
      alt={`${info.name} image`}
      className="rounded-full w-32 h-32 mx-auto"
    />
    <h3 className="text-xl font-bold mt-8">{info.name}</h3>
    <p className="text-sm text-gray-600">{info.designation}</p>
  </div>
  )
}

export default TeamInformationCard
