import { TCar } from "./car.type";
import { TUser } from "./user.type";
type TPaymentDetails = {
  advancedAmount: number;
  returnAmount?: number;
  amount?: number;       
  transectionId: string;
  date:Date,
  paymentStatus?: 'Pending' | 'Paid'; 
};
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
  paymentDetails:TPaymentDetails;
  startDate: Date;
  isApproved: boolean;
  returnStatus: boolean;
};
