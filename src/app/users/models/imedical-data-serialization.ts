export interface IMedicalDataSerialization {
    has_vaccines: boolean;
    primer?: string;
    has_physical_problems: boolean;
    physical_problems?: string [];
    has_operations: boolean;
    operations?: string;
}
