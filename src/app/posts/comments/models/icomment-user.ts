import { SafeUrl } from "@angular/platform-browser";

export interface ICommentUser {
    _id: string;
    name?: string;
    name_last_name?: string;
    creation_date: string;
    creation_time: string;
    response: string;
    owns?: boolean;
}
