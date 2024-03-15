
export enum FuelType{
  DIESEL="DIESEL",
  ELECTRIC="ELECTRIC",
  ETHANOL="ETHANOL",
  GASOLINE="GASOLINE"
}
export interface CarForRentResponse {
  carRentId?: number;
  rentalPrice: number;
  make: string;
  model: string;
  imagePath: string;
  manifacturingYear: number;
  fuel: FuelType;
  agencyId:string;
  email:string;
  name:string;
}
