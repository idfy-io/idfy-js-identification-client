export class IdResponse {
    Name: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: string;
    Status: string;
    SocialSecurityNumber: string;
    IdentityProviderUniqueId: string;
    IdentityProvider: string;
    Error: IdError;
    EnvironmentInfo: EnvironmentInfo;
    MetaData: { [key:string]: any };
    RequestId: string;
}

export class IdError {
    NativeErrorCode: string;
    ErrorCode: string;
    ErrorMessage: string;
}

export class EnvironmentInfo {
    UserAgent: string;
    IPAddress: string;
}