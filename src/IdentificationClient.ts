import { CreateBankIdMobileIdRequest, CreateBankIdMobileRequestResponse } from './models/create_bankid_id_request';
import { CreateIdRequest, CreateIdRequestResponse } from './models/create_id_request';
import { IdResponse } from './models/id_response';
import { OAuthWebClient } from "./OAuthWebClient";
import axios, { AxiosResponse } from 'axios';

export class IdentificationClient {

    private http: OAuthWebClient;

    constructor(private accountId: string, clientId: string, clientSecret: string, scope: string, test: string | boolean) {
        test = (test || test == 'true') ? true : false;
        this.http = new OAuthWebClient(
            test ? "https://idtest.signere.no/api" : "https://id.signere.no/api",
            clientId,
            clientSecret,
            test ? "https://oauth2test.signere.com/connect/token" : "https://oauth.signere.no/connect/token",
            scope
        );
    }

    public getResponse(requestId: string, metaData: boolean): Promise<IdResponse> {
        return this.http.get("/identify/" + encodeURIComponent(this.accountId)).then(r => r.data);
    }

    public createIdentificationRequest(model: CreateIdRequest): Promise<CreateIdRequestResponse> {
        return this.http.post("/identify/" + encodeURIComponent(this.accountId), model).then(r => r.data);
    }

    public invalidateRequest(requestId: string): Promise<boolean> {
        return this.http.put("/identify/invalidate/" + encodeURIComponent(this.accountId), {
            RequestId: requestId
        }).then(r => r.status == 200);
    }

    public checkComplete(requestId: string): Promise<boolean> {
        return this.http.get("/identify/status/" + encodeURIComponent(this.accountId)).then(r => r.data.Done);
    }

    public createBankIdMobileIdentificationProcess(model: CreateBankIdMobileIdRequest): Promise<CreateBankIdMobileRequestResponse> {
        return this.http.post("/no/bankid/mobile/" + encodeURIComponent(this.accountId)).then(r => r.data);
    }

    public getHistoricRequestById(requestId: string) {
        var path = "/history/" + encodeURIComponent(this.accountId);
        path += "?requestId=" + encodeURIComponent(requestId);
        return this.http.get(path).then(r => r.data);
    }

    public getHistoricRequestByExternalId(externalId: string) {
        var path = "/history/" + encodeURIComponent(this.accountId) + "/externalId";
        path += "?externalId=" + encodeURIComponent(externalId); 
        return this.http.get(path).then(r => r.data);
    }

    public getHistoricRequests(year: number, month?: number, day?: number, status?: string, identityProviderType?: string, name?: string, skip?: number, pageSize?: number) {
        var path = "/history/" + encodeURIComponent(this.accountId) + "/filter";
        path += "?year=" + encodeURIComponent(year.toString());
        path += month ? "&month=" + month.toString() : "";
        path += day ? "&day=" + day.toString() : "";
        path += status ? "&status=" + status.toString() : "";
        path += identityProviderType ? "&identityProviderType=" + identityProviderType.toString() : "";
        path += name ? "&name=" + name.toString() : "";
        path += skip ? "&skip=" + skip.toString() : "";
        path += pageSize ? "&pageSize=" + pageSize.toString() : "";

        return this.http.get(path).then(r => r.data);
    }
}