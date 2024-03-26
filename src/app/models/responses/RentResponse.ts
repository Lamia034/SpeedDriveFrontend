import {Client} from "../interfaces/Client";
import {CarForRent} from "../interfaces/carforrent";

export interface RentResponse {

  startDate:string;
  endDate:string;
client: Client;
carForRent:CarForRent;

}
