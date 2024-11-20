import { Icomments } from "./icomments";
import { IlossData } from "./iloss-data";
import { ImedicalData } from "./imedical-data";
import { Pet } from "./pet";

export interface IPostSerialization {
    status?: number;
    _id: string;
    id_user: number;
    post_type: string;
    basic_pet_information: Pet;
    loss_data?: IlossData;
    reward?: number;
    medical_data?: ImedicalData;
    comments?: Icomments[];
    publication_date: Date;
}
