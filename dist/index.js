"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const https = require("https");
const httpSignature = require("http-signature");
const jssha = require("jssha");
class Client {
    constructor(config) {
        this.Core = {
            GetInstance: (id) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}`);
            },
            ListInstances: (compartmentId) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances?compartmentId=${compartmentId}`);
            },
            InstanceAction: (id, action) => {
                return this.doRequest('POST', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}?action=${action}`);
            },
            ListVnicAttachments: (compartmentId, instanceId) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnicAttachments?compartmentId=${compartmentId}&instanceId=${instanceId || ''}`);
            },
            GetVnic: (vnicId) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnics/${vnicId}`);
            }
        };
        this.IAM = {
            ListCompartments: () => {
                return this.doRequest('GET', `identity.${this.config.zone}.oraclecloud.com`, `/20160918/compartments?compartmentId=${this.config.tenantID}&compartmentIdInSubtree=true&accessLevel=ACCESSIBLE`);
            }
        };
        this.config = config;
        this.keyId = [
            this.config.tenantID,
            this.config.userID,
            this.config.fingerprint
        ].join('/');
    }
    init() {
        return new Promise(resolve => {
            if (typeof this.key !== 'undefined') {
                return resolve();
            }
            fs_1.readFile(this.config.keyPath, (err, data) => {
                if (err) {
                    throw new Error(err.message);
                }
                this.key = data.toString();
                resolve();
            });
        });
    }
    doRequest(method, host, path, data) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            const options = {
                host,
                method,
                path,
            };
            const request = https.request(options, res => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            });
            let headersToSign = ['host', 'date', '(request-target)'];
            if (['POST', 'PUT'].includes(method.toUpperCase())) {
                data = data || '';
                const shaObj = new jssha('SHA-256', 'TEXT');
                shaObj.update(data);
                request.setHeader('Content-Type', 'application/json');
                request.setHeader('Content-Length', data.length);
                request.setHeader('x-content-sha256', shaObj.getHash('B64'));
                headersToSign = headersToSign.concat([
                    'content-type',
                    'content-length',
                    'x-content-sha256'
                ]);
            }
            httpSignature.sign(request, {
                key: this.key,
                keyId: this.keyId,
                headers: headersToSign
            });
            request.end();
        }));
    }
}
exports.Client = Client;
;
//# sourceMappingURL=index.js.map