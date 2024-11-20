export interface IAdressSerialization {
    zip_code: number;
    state: string;
    municipality: string;
    colony: string;
    outside_number?: number;
    street?: string;
}
