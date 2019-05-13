import { VNIC, Instance, Compartment, InstanceState } from './models';
export interface ClientConfig {
    key: string;
    tenantID: string;
    userID: string;
    fingerprint: string;
    zone: 'ap-tokyo-1' | 'ca-toronto-1' | 'eu-frankfurt-1' | 'uk-london-1' | 'us-ashburn-1' | 'us-phoenix-1';
}
export declare class Client {
    private keyId;
    private config;
    constructor(config: ClientConfig);
    private doRequest;
    util: {
        waitForInstanceState: (instanceId: string, state: InstanceState) => Promise<Instance>;
    };
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
