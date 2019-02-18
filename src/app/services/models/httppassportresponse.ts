import { IUser } from "./user";

export interface IHttpPassportResponse{
    step: string;
    type: string;
    error:string
    user: IUser;  
}