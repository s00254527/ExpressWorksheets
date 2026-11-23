export interface User{
    _id?:string;
    name:string;
    emial:string;
}
export interface RegisterUserDto{
    name:string;
    email:string;
    password:string;
}

export interface LongUserDto{
    email:string;
    password:string;
}