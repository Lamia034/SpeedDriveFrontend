export enum FuelType{
  DIESEL="DIESEL",
  ELECTRIC="ELECTRIC",
  ETHANOL="ETHANOL",
  GASOLINE="GASOLINE"
}
export interface CarForSell {
  carSellId: number;
  rentalPrice: number;
  make: string;
  model: string;
  manufacturingYear: number;
  fuel: FuelType;
}
