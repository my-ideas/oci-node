import { VNIC, Instance, Compartment } from './models';
export interface ClientConfig {
    keyPath: string;
    tenantID: string;
    userID: string;
    fingerprint: string;
    zone: 'ap-tokyo-1' | 'ca-toronto-1' | 'eu-frankfurt-1' | 'uk-london-1' | 'us-ashburn-1' | 'us-phoenix-1';
}
export declare class Client {
    private key;
    private keyId;
    private config;
    constructor(config: ClientConfig);
    private init;
    private doRequest;
    Core: {
        GetInstance: (id: string) => Promise<Instance>;
        ListInstances: (compartmentId: string) => Promise<Instance[]>;
        InstanceAction: (id: string, action: "STOP" | "START" | "SOFTRESET" | "RESET" | "SOFTSTOP") => Promise<Instance>;
        ListVnicAttachments: (compartmentId: string, instanceId?: string | undefined) => Promise<VNIC[]>;
        GetVnic: (vnicId: string) => Promise<VNIC>;
    };
    IAM: {
        ListCompartments: () => Promise<Compartment[]>;
    };
}
