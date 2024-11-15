import { IAddressSerialization } from "./iaddress-serialization";

export interface ILossDataSerialization {
    address: IAddressSerialization;
    loss_date: Date,
    description: string;
    last_seen?: string;
}
