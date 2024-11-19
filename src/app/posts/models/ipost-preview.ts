import { Pet } from "./pet";

export interface IpostPreview {
    _id: string;
    id_user: number,
    post_type: string,
    basic_pet_information: Pet;
    publication_date: Date;
}
