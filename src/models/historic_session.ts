import { Language } from "./language";
import { IdentityProvider } from "./identityprovider";

export class HistoricSession {
    Id: string;
    Name: string;
    Status: string;
    ClientIp: string;
    UserAgent: string;
    IdentityProviderType: string;
    Language: Language;
    Externalid: string;
    Errorcode: string;
    Timestamp: string;
    iFrame: boolean;
    SocialSecurityNumber: boolean;
}