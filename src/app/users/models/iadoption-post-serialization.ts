import { IBasicPetInformationSerialization } from "./ibasic-pet-information-serialization";
import { IMedicalDataSerialization } from "./imedical-data-serialization";

export interface IAdoptionPostSerialization {
    id_user: number;
    post_type: string;
    basic_pet_information: IBasicPetInformationSerialization;
    medical_data: IMedicalDataSerialization;
    publication_date: Date;
}
