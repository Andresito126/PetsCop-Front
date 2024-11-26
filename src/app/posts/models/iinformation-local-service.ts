import { IAdressSerialization } from "../../credentials/models/iadress-serialization";
import { OpeningHoursSerialization } from "../../credentials/models/opening-hours-serialization";
import { Icomments } from "./icomments";

export interface IInformationLocalService {
  _id: string;
  id_user: number;
  photo_profile: string;
  photos: string[];
  name: string;
  description: string;
  address?: IAdressSerialization;
  phone_number?: string;
  opening_hours: OpeningHoursSerialization[];
  comments?: Icomments[];
}
