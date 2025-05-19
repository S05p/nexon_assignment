import { IsOptional, IsBoolean, IsDate, IsInt, IsString, IsArray, IsEnum, Min, Max, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export enum ConditionType {
    LOGIN = 'login',
    INVITE_FRIEND = 'invite_friend',
    KILL_MONSTER = 'kill_monster',
}

export class CreateEventDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @Type(() => Date)
    @IsDate()
    start_date: Date;

    @Type(() => Date)
    @IsDate()
    end_date: Date;

    @IsString()
    created_user_id: string;

    @IsEnum(ConditionType)
    condition_type: ConditionType;

    @IsInt()
    @Min(1)
    condition_value: number;

    @IsArray()
    @ArrayMinSize(1)
    reward_array: string[];
}

export class CreateRewardDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    type: string;

    @IsInt()
    @Min(1)
    amount: number;
}

export class GetEventListQueryDto {
    @IsOptional()
    @IsString()
    event_name?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    end_date?: Date;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsInt()
    @Min(1)
    page: number;

    @IsInt()
    @Min(1)
    @Max(100)
    limit: number;
}

export class GetEventDetailPathDto {
    @IsString()
    event_id: string;
}

export class CreateRewardReceiptDto {
    @IsString()
    event_id: string;

    @IsString()
    uid: string;
}

export class GetRewardListQueryDto {
    @IsOptional()
    @IsString()
    reward_name?: string;

    @IsInt()
    @Min(1)
    page: number;

    @IsInt()
    @Min(1)
    @Max(100)
    limit: number;
}

export class GetHistoryListQueryDto {
    @IsString()
    uid: string;

    @Type(() => Date)
    @IsDate()
    start_date: Date;
}

export class GetAdminHistoryListQueryDto {
    event_id: string;
    uid?: string;
    page: number;
    limit: number;
} 