import { InstanceState } from './resources'

export type SortByParameter = 'TIMECREATED' | 'DISPLAYNAME'
export type SortOrderParameter = 'ASC' | 'DESC'

export interface Parameters {
    limit?: number;
    page?: string;
    sortBy?: SortByParameter;
    sortOrder?: SortOrderParameter;
}

export interface ListInstancesParameters extends Parameters {
    availabilityDomain?: string;
    displayName?: string;
    lifecycleState?: InstanceState
}
