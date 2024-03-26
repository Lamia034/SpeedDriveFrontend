import {Client} from "./Client";
import {CarForRent} from "./carforrent";

export interface Rent{


  clientId: string,
  carRentId: number,
agencyId:string,
  startDate:string;
  endDate:string;
  client:Client;
  carForRent:CarForRent;
}
