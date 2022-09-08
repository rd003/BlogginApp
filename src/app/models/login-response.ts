import { Status } from "./status";

export interface LoginResponse extends Status{
    token:string,
    refreshToken:string,
    expiration:string,
    name:string,
    username:string,
}