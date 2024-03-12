export enum FuelType{
  DIESEL="DIESEL",
  ELECTRIC="ELECTRIC",
  ETHANOL="ETHANOL",
  GASOLINE="GASOLINE"
}
export interface CarForRent {
  carRentId?: number;
  rentalPrice: number;
  make: string;
  model: string;
  manifacturingYear: number;
  fuel: FuelType;
  agencyId:string;
}
