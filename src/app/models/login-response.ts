import { Status } from "./status";

export interface LoginResponse extends Status{
    token:string,
    expiration:string
}