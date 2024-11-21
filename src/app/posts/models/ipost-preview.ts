import { IlossData } from "./iloss-data";
import { Pet } from "./pet";

export interface IpostPreview {
    _id: string;
    id_user: number,
    post_type: string,
    basic_pet_information: Pet;
    loss_data: IlossData;
    reward: number;
    gratitude: string;
    publication_date: Date;
}
