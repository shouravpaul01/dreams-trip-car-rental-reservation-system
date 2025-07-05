import { TCar } from "./car.type";

export type TBanner ={
  _id:string;
  image: string;
  title: string;
  subtitle?: string;
  description:string;
  link?: string;
  car: TCar;
  isActive: boolean;
  isDelate: boolean;
}