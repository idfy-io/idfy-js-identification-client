const { IdentificationClient } = require('../lib/IdentificationClient')
var assert = require('assert');

const ClientId = "";
const ClientSecret = "";
const AccountId = "";
const Scope = "identify";
const Test = true;

describe('IdentificationClient', function () {
    var client = new IdentificationClient(AccountId, ClientId, ClientSecret, Scope, Test);

    it('should create an identification request', function () {
        return client.createIdentificationRequest({

        }).then(response => {
            console.log(response);
        }).catch(err => { console.log(err.response.data); throw err; });
    });
});