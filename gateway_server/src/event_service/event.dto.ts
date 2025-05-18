export enum ConditionType {
    LOGIN = 'LOGIN',
    INVITE_FRIEND = 'INVITE_FRIEND',
    KILL_MONSTER = 'KILL_MONSTER',
}

export class CreateEventDto {
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    created_user_id: string;
    condition_type: ConditionType;
    condition_value: number;
    reward_array: string[];
}

export class CreateRewardDto {
    name: string;
    description: string;
    type: string;
    amount: number;
}

export class GetEventListQueryDto {
    event_name?: string;
    start_date?: Date;
    end_date?: Date;
    is_active?: boolean;
    page: number;
    limit: number;
}

export class GetEventDetailPathDto {
    event_id: string;
}

export class CreateRewardReceiptDto {
    event_id: string;
    uid: string;
}

export class GetRewardListQueryDto {
    reward_name?: string;
    page: number;
    limit: number;
}

export class GetHistoryListQueryDto {
    uid: string;
    start_date: Date;
}

export class GetAdminHistoryListQueryDto {
    event_id: string;
    uid?: string;
    page: number;
    limit: number;
} 