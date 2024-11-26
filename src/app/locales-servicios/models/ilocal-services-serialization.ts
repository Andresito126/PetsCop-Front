import { IAdressSerialization } from "../../credentials/models/iadress-serialization";
import { OpeningHoursSerialization } from "../../credentials/models/opening-hours-serialization";
import { IcomentaryLocalsServices } from "./icomentary-locals-services";

export interface IlocalServicesSerialization {
    _id: string;
    id_user: number;
    photo_profile: string;
    photos: string[];
    name: string;
    description: string;
    address: IAdressSerialization;
    phone_number: string;
    opening_hours: OpeningHoursSerialization[];
    comments: IcomentaryLocalsServices[];
}
