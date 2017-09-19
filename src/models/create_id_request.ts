import { IdentityProvider } from "./identityprovider";
import { Language } from "./language";

export class CreateIdRequest {
    IdentityProvider: IdentityProvider;
    ReturnUrls: ReturnUrls;
    iFrame: IFrameSettings;
    Language: Language;
    GetSocialSecurtyNumber: boolean;
    PreFilledSocialSecurityNumber: string;
    PageTitle: string;
    ExternalReference: string;
    Addonservices: { [key:string]: string }
}

export class ReturnUrls {
    Error: string;
    Abort: string;
    Success: string;
}

export class IFrameSettings {
    Domain: string;
    WebMessaging: boolean;
    Height: number;
}

export class CreateIdRequestResponse {
    Url: string;
    RequestId: string;
}