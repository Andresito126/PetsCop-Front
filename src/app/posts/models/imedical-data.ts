import { Icomments } from "./icomments";

export interface ImedicalData {
    has_vaccines: string;
    primer: string;
    has_physical_problems: string;
    physical_problems: string[];
    has_operations: string;
    operations: string;
    comments: Icomments[];
    publication_date: Date;
}
