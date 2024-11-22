import { IBasicPetInformationSerialization } from "./ibasic-pet-information-serialization";
import { ILossDataSerialization } from "./iloss-data-serialization";

export interface ILossPostSerialization {
    id_user: number;
    post_type: string;
    basic_pet_information: IBasicPetInformationSerialization;
    loss_data: ILossDataSerialization;
    reward?: number;
    publication_date: Date;
}
