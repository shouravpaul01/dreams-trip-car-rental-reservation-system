export type TPrice = {
    _id:string;
    hourly: {
      ratePerHour: number;
      policy: string;
    };
    daily: {
      ratePerDay: number;
      policy: string;
    };
    isActive: boolean;
  };
  