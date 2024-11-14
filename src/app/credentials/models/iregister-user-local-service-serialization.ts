export interface IRegisterUserLocalServiceSerialization {
    type_user:string;
    mainPhoto?:string;
    photos?:string[];
    name: string;
    description: string;
    // address?:string;
    opening_hours?: string[];
    email:string;
    password_LS:string;
    
}
