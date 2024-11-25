import { ImessageSerialization } from "./imessage-serialization";

export interface IchatSerialization {
    _id: string,
    id_user_1: number,
    id_user_2: number,
    messages: ImessageSerialization[];
}
