import {Rent} from "../interfaces/Rent";

export enum FuelType{
  DIESEL="DIESEL",
  ELECTRIC="ELECTRIC",
  ETHANOL="ETHANOL",
  GASOLINE="GASOLINE"
}
export enum CarStatus{
  AVAILABLE="AVAILABLE",
  RENTED="RENTED"

}
export interface CarForRentResponse {
  carRentId?: number;
  rentalPrice: number;
  make: string;
  model: string;
  carStatus:CarStatus;
  imagePath: File;
  manifacturingYear: number;
  fuel: FuelType;
  agencyId:string;
  email:string;
  name:string;
  rents:Rent[];

}
