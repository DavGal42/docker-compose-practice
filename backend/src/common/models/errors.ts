export interface IMessageResponse {
    meta?: string | number;
    message: string;
}

export interface IValidationErrors {
    message: string;
    field: string;
}

export interface IValidationErrorsResponse {
    errors: IValidationErrors[];
    message: string;
}
