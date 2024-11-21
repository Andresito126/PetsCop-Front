import { IlossData } from './iloss-data';
import { ImedicalData } from './imedical-data';
import { Pet } from './pet';

export interface Post {
  id_user: number;
  post_type: string;
  basic_pet_information: Pet;
  loss_data: IlossData;
  reward: number;
  gratitude: string;
  medical_data: ImedicalData;

  // user: string;
  // date: string;
  // time:string;
  // location: string;
  // pet: Pet;
  // description: string;
  // images: string[];
}
