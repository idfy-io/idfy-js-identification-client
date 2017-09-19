const crypto = require("crypto");
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class OAuthWebClient {
    constructor(private baseUrl: string, private clientId: string, private clientSecret: string, private tokenEndpoint: string, private scope: string) {
    }

    private auth_token: string;
    private expires_at: Date;

    private _getAuthToken(): Promise<string> {
        if (this.auth_token && Date.now() < (this.expires_at.getTime() - 60000))
            return Promise.resolve(this.auth_token);
        return axios.post(this.tokenEndpoint,
                "grant_type=client_credentials&scope=" + this.scope,
            {
                headers: {
                    'Authorization': 'Basic ' + new Buffer(this.clientId + ':' + this.clientSecret).toString('base64'),
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                this.auth_token = response.data.access_token;
                this.expires_at = new Date(Date.now() + response.data.expires_in * 1000)
                return response.data.access_token;
            });
    }

    private _getAxiosRequestConfig(path: string, verb: string, data?: any, cfg?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        var url = this.baseUrl + path;

        return this._getAuthToken().then(at => {
            const req: AxiosRequestConfig = {
                headers: {
                    'Authorization': "Bearer " + at
            },
                url: url,
                method: verb
            };
            if (typeof data !== "undefined") {
                req.data = data;
            }
            if (cfg) {
                Object.assign(req, cfg);
            }
            return req;
        });
    }

    private _axios(path: string, verb: string, data?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._getAxiosRequestConfig(path, verb, data, cfg).then(rc => axios.request(rc));
    }

    get(path: string, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "GET", undefined, cfg);
    }

    delete(path: string, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "DELETE", undefined, cfg);
    }

    post(path: string, body?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "POST", body, cfg);
    }

    put(path: string, body?: any, cfg?: AxiosRequestConfig): AxiosPromise {
        return this._axios(path, "PUT", body, cfg);
    }
}