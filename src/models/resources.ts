// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/Vnic/
export interface VNIC {
    availabilityDomain: string
    compartmentId: string
    definedTags?: any
    displayName?: string
    freeformTags?: any
    hostnameLabel?: string
    id: string
    isPrimary?: boolean
    lifecycleState: 'PROVISIONING' | 'AVAILABLE' | 'TERMINATING' | 'TERMINATED'
    macAddress?: string
    privateIp?: string
    publicIp?: string
    skipSourceDestCheck?: boolean
    subnetId: string
    timeCreated?: string
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/VnicAttachment/
export interface VNICAttachment {
    availabilityDomain: string
    compartmentId: string
    displayName?: string;
    id: string;
    instanceId: string;
    lifecycleState: 'ATTACHING' | 'ATTACHED' | 'DETACHING' | 'DETACHED'
    nicIndex?: number;
    subnetId: string;
    timeCreated: string;
    vlanTag?: number;
    vnicId?: string;
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/LaunchOptions
export interface LaunchOptions {
    bootVolumeType: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED'
    firmware: string
    networkType: string
    remoteDataVolume: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED'
    isPvEncryptionInTransitEnabled?: boolean
    isConsistentVolumeNamingEnabled?: boolean
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/InstanceSourceDetails
export interface InstanceSourceDetails {
    sourceType: 'bootVolume' | 'image'
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/InstanceAgentConfig
export interface InstanceAgentConfigReference {
    isMonitoringDisabled?: boolean
}
// https://docs.cloud.oracle.com/iaas/api/#/en/identity/20160918/Compartment/
export interface Compartment {
    id: string
    compartmentId: string
    name: string
    description: string
    timeCreated: string
    lifecycleState: 'CREATING' | 'ACTIVE' | 'INACTIVE' | 'DELETING' | 'DELETED'
    inactiveStatus?: boolean
    isAccessible?: boolean
    freeformTags?: any
    definedTags?: any
}
// InstanceState
export type InstanceState = 'PROVISIONING' | 'RUNNING' | 'STARTING' | 'STOPPING' | 'STOPPED' | 'CREATING_IMAGE' | 'TERMINATING' | 'TERMINATED'
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/Instance
export interface Instance {
    availabilityDomain: string
    compartmentId: string
    definedTags?: any
    displayName?: string
    extendedMetadata?: any
    faultDomain?: string
    freeformTags?: any
    id: string
    imageId?: string
    ipxeScript?: string
    launchMode?: 'NATIVE' | 'EMULATED' | 'CUSTOM'
    launchOptions?: LaunchOptions
    lifecycleState: InstanceState
    metadata?: any
    region: string
    shape: string
    sourceDetails: InstanceSourceDetails
    timeCreated: string
    agentConfig?: InstanceAgentConfigReference
    timeMaintenanceRebootDue?: string
}
