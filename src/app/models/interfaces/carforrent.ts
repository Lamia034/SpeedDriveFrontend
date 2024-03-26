import {Agency} from "./Agency";
import {Rent} from "./Rent";

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
export interface CarForRent {
  carRentId?: number;
  rentalPrice: number;
  make: string;
  model: string;
  carStatus:CarStatus;
  imagePath: File | string;
  manifacturingYear: number;
  fuel: FuelType;
  agencyId:string;
  agency?:Agency;
  rents:Rent[];
}
