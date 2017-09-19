import { IdError } from './id_response';
export class CreateBankIdMobileIdRequest {
    MobileNumber: string;
    DateOfBirth: string;
    GetSocialSecurtyNumber: boolean;
    ExternalReference: string;
    Addonservices: { [key:string]: string }
}

export class CreateBankIdMobileRequestResponse {
    RequestId: string;
    MerchantRef: string;
    Error: IdError;
    OK: boolean;
    InvalidMobileNumberOrDateOfBirth: boolean;
}