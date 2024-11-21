import { Ireplies } from "./ireplies";

export interface Icomments {
    id_user: number;
    response: string;
    replies: Ireplies[];
}
