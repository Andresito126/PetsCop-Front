import { IAdressSerialization } from "./iadress-serialization";
import { OpeningHoursSerialization } from "./opening-hours-serialization";

export interface IRegisterUserLocalServiceSerialization {
    id_user: string;
    type: string;
    photo_profile: string;
    name: string;
    description: string;
    address: IAdressSerialization;
    phone_number: string;
    opening_hours: OpeningHoursSerialization[];
}


