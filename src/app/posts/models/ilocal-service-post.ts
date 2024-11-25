import { IAdressSerialization } from "../../credentials/models/iadress-serialization";
import { OpeningHoursSerialization } from "../../credentials/models/opening-hours-serialization";
import { Icomments } from "./icomments";
import { ILocalServiceSerialization } from "./ilocal-service-serialization";

export interface IlocalServicePost {
    _id: string;
    id_user:number;
    data: ILocalServiceSerialization;
    photos?:[]
    description?: string;
    address?: IAdressSerialization;
    phone_number?:number;
    opening_hours?: OpeningHoursSerialization;
    comments?: Icomments[];

}
