import { TCar } from "./car.type";
import { TUser } from "./user.type";

export type TBooking = {
  _id?: string;
  user: TUser;
  car: TCar;
  drivingType:string;
  startTime: string;
  pickupDate: Date;
  pickupLocation: string;
  endTime: string;
  returnDate: Date;
  returnLocation: string;
  advancedDeposit: number;
  priceType: { price: number; type: string };
  totalCost: number;
  startDate: Date;
  isApproved: boolean;
  returnStatus: boolean;
};
