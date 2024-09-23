import { TCarType } from "./cartype.type";
import { TPrice } from "./price.type";

export type TCar = {
    _id?: string;
    type: TCarType;
    name: string;
    image?: string;
    seats:number;
    fuelType:string;
    bagCapability:string;
    transmission:string;
    airConditioning:string; 
    description?: string;
    color: string;
    features: string[]; 
    price: TPrice;
    drivingType:string;
    isAvailable?: boolean;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };