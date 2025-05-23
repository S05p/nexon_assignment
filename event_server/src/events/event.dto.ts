import { IsOptional, IsBoolean, IsDate, IsInt, IsString, IsArray, IsEnum, Min, Max, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export enum ConditionType {
    LOGIN = 'login',
    INVITE_FRIEND = 'invite_friend',
    KILL_MONSTER = 'kill_monster',
}

export class CreateEventDto {
    @IsString()
    created_user_id: string;

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

    @IsArray()
    @ArrayMinSize(1)
    reward_array: Array<string>;

    @IsEnum(ConditionType)
    condition_type: ConditionType;

    @IsInt()
    @Min(1)
    condition_value: number;

    @IsBoolean()
    is_active: boolean = true;
}

export enum RewardType {
    POINT = 'point',
    COUPON = 'coupon',
    PRODUCT = 'product',
}

export class CreateRewardDto {
    @IsString()
    created_user_id: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(RewardType)
    type: RewardType;

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

    @IsInt()
    @Min(1)
    page: number = 1;

    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
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
    page: number = 1;

    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
}

export class GetHistoryListQueryDto {
    @Type(() => Date)
    @IsDate()
    start_date: Date = new Date();
}

export class GetHistoryListBodyDto {
    @IsString()
    uid: string;
}

export class GetAdminHistoryListQueryDto {
    @IsOptional()
    @IsString()
    uid?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    end_date?: Date;

    @IsInt()
    @Min(1)
    page: number = 1;

    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
}

export class GetAdminHistoryListPathDto {
    @IsString()
    event_id: string;
}