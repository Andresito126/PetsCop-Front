import { Icomments } from "./icomments";
import { IlossData } from "./iloss-data";
import { ImedicalData } from "./imedical-data";
import { Pet } from "./pet";

export interface IPostSerialization {
    _id: string;
    id_user: number;
    post_type: string;
    basic_pet_information: Pet;
    loss_data?: IlossData;
    reward?: number | null;
    medical_data?: ImedicalData;
    gratitude?: string;
    comments?: Icomments[];
    publication_date: Date;
}
