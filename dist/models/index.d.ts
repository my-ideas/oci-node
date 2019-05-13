export interface VNIC {
    availabilityDomain: string;
    compartmentId: string;
    definedTags?: any;
    displayName?: string;
    freeformTags?: any;
    hostnameLabel?: string;
    id: string;
    isPrimary?: boolean;
    lifecycleState: 'PROVISIONING' | 'AVAILABLE' | 'TERMINATING' | 'TERMINATED';
    macAddress?: string;
    privateIp?: string;
    publicIp?: string;
    skipSourceDestCheck?: boolean;
    subnetId: string;
    timeCreated?: string;
}
export interface LaunchOptions {
    bootVolumeType: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED';
    firmware: string;
    networkType: string;
    remoteDataVolume: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED';
    isPvEncryptionInTransitEnabled?: boolean;
    isConsistentVolumeNamingEnabled?: boolean;
}
export interface InstanceSourceDetails {
    sourceType: 'bootVolume' | 'image';
}
export interface InstanceAgentConfigReference {
    isMonitoringDisabled?: boolean;
}
export interface Compartment {
    id: string;
    compartmentId: string;
    name: string;
    description: string;
    timeCreated: string;
    lifecycleState: 'CREATING' | 'ACTIVE' | 'INACTIVE' | 'DELETING' | 'DELETED';
    inactiveStatus?: boolean;
    isAccessible?: boolean;
    freeformTags?: any;
    definedTags?: any;
}
export declare type InstanceState = 'PROVISIONING' | 'RUNNING' | 'STARTING' | 'STOPPING' | 'STOPPED' | 'CREATING_IMAGE' | 'TERMINATING' | 'TERMINATED';
export interface Instance {
    availabilityDomain: string;
    compartmentId: string;
    definedTags?: any;
    displayName?: string;
    extendedMetadata?: any;
    faultDomain?: string;
    freeformTags?: any;
    id: string;
    imageId?: string;
    ipxeScript?: string;
    launchMode?: 'NATIVE' | 'EMULATED' | 'CUSTOM';
    launchOptions?: LaunchOptions;
    lifecycleState: InstanceState;
    metadata?: any;
    region: string;
    shape: string;
    sourceDetails: InstanceSourceDetails;
    timeCreated: string;
    agentConfig?: InstanceAgentConfigReference;
    timeMaintenanceRebootDue?: string;
}
