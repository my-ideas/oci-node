import { readFile } from 'fs';
import * as https from 'https';
import * as httpSignature from 'http-signature'
import * as jssha from 'jssha'
import * as backoff from 'backoff'
import { VNIC, Instance, Compartment, InstanceState, VNICAttachment } from './models'

export interface ClientConfig {
    key: string;
    tenantID: string;
    userID: string;
    fingerprint: string;
    zone:
        'ap-tokyo-1' |
        'ca-toronto-1' |
        'eu-frankfurt-1' |
        'uk-london-1' |
        'us-ashburn-1' |
        'us-phoenix-1';
}

export class Client {
    private keyId: string
    private config: ClientConfig
    constructor(config: ClientConfig) {
        this.config = config;
        this.keyId = [
            this.config.tenantID,
            this.config.userID,
            this.config.fingerprint
        ].join('/')

    }
    private doRequest(method: string, host: string, path: string, data?: any) {
        return new Promise(async (resolve, reject) => {
            const options: https.RequestOptions = {
                host,
                method,
                path,
            }
            const request = https.request(options, res => {
                let body = ''
                res.on('data', chunk => body += chunk)
                res.on('close', () => {
                    const response = JSON.parse(body);
                    if (res.statusCode !== 200) {
                        return reject(response)
                    }
                    resolve(response)
                })
                res.on('error', err => {
                    reject(err);
                })
            })
            // Signign process
            let headersToSign = ['host', 'date', '(request-target)']
            if (['POST', 'PUT'].includes(method.toUpperCase())) {
                data = data || ''
                const shaObj = new jssha('SHA-256', 'TEXT')
                shaObj.update(data)
                request.setHeader('Content-Type', 'application/json')
                request.setHeader('Content-Length', data.length)
                request.setHeader('x-content-sha256', shaObj.getHash('B64'))
                headersToSign = headersToSign.concat([
                    'content-type',
                    'content-length',
                    'x-content-sha256'
                ])
            }
            httpSignature.sign(request, {
                key: this.config.key,
                keyId: this.keyId,
                headers: headersToSign
            })
            request.end()
        })
    }
    util = {
        waitForInstanceState: (instanceId: string, state: InstanceState): Promise<Instance> => {
            return new Promise<Instance>((resolve, reject) => {
                let lastSeen: InstanceState
                const exponential = backoff.exponential({
                    initialDelay: 500,
                    maxDelay: 2000
                })
                exponential.failAfter(50)
                exponential.on('ready', async () => {
                    const instance = await this.Core.GetInstance(instanceId)
                    lastSeen = instance.lifecycleState
                    if (instance.lifecycleState !== state) {
                        return exponential.backoff()
                    }
                    exponential.reset()
                    resolve(instance)
                })
                exponential.on('fail', () => {
                    reject(`instance not in desired state: "${state}", last seen state: "${lastSeen}"`)
                })
                exponential.backoff()
            })
        }
    }
    Core = {
        GetInstance: (id: string): Promise<Instance> => {
            return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}`) as Promise<Instance>
        },
        ListInstances: (compartmentId: string): Promise<Instance[]> => {
            return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances?compartmentId=${compartmentId}`) as Promise<Instance[]>
        },
        InstanceAction: (id: string, action: 'STOP' | 'START' | 'SOFTRESET' | 'RESET' | 'SOFTSTOP'): Promise<Instance> => {
            return this.doRequest('POST', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}?action=${action}`) as Promise<Instance>
        },
        ListVnicAttachments: (compartmentId: string, instanceId?: string): Promise<VNICAttachment[]> => {
            return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnicAttachments?compartmentId=${compartmentId}&instanceId=${instanceId || ''}`) as Promise<VNICAttachment[]>
        },
        GetVnic: (vnicId: string): Promise<VNIC> => {
            return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnics/${vnicId}`) as Promise<VNIC>
        }
    }
    IAM = {
        ListCompartments: (): Promise<Compartment[]> => {
            return this.doRequest('GET', `identity.${this.config.zone}.oraclecloud.com`, `/20160918/compartments?compartmentId=${this.config.tenantID}&compartmentIdInSubtree=true&accessLevel=ACCESSIBLE`) as Promise<Compartment[]>
        }
    }
};
