export enum Role{
  CLIENT = 'CLIENT',
  AGENCY = 'AGENCY'
}
export interface RegisterRequest {
  // id:number;
  name:string;
  email:string;
  password:string;
  role:Role;
}
