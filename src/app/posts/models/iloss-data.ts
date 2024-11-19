import { IAdressSerialization } from "../../credentials/models/iadress-serialization";

export interface IlossData {
    address: IAdressSerialization;
    loss_date: Date;
    description: string;
    last_seen: string
}
