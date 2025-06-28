export type TUser={
    name:string,
    email:string,
    image?:string,
    phone:String,
    nid?:string,
    role:string,
    iat:number,
    exp:number
}
export type TUserInfo={
    _id?:String;
    name: string;
    email: string;
    image?: string;
    role: "user" | "admin";
    phone: string;
    nid:string,
    drivingLicence:string,
    address: string;
    isBlocked:boolean;
  
}