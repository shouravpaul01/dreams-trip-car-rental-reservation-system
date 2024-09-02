import { TCarType } from "../../../type/cartype.type";

export type TCar = {
    _id?: string;
    type: TCarType;
    name: string;
    image?: string; 
    description?: string;
    color: string;
    features: string[]; 
    pricePerHour: number;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };