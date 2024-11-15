export interface FormFieldsInputs {
    controlType?: 'input' | 'select'; 
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    disabled?:boolean;
    options?: { label: string, value: string }[];
}

