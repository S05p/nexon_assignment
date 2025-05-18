import { IsOptional, IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum ConditionType {
    LOGIN = 'login',
    INVITE_FRIEND = 'invite_friend',
    KILL_MONSTER = 'kill_monster',
}


export class CreateEventDto {
    created_user_id: string;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    reward_array: Array<string>;
    condition_type: ConditionType;
    condition_value: number;
}

export enum RewardType {
    POINT = 'point',
    COUPON = 'coupon',
    PRODUCT = 'product',
}

export class CreateRewardDto {
    created_user_id: string;
    name: string;
    description: string;
    type: RewardType;
    amount: number;
}

export class GetEventListQueryDto {
    @IsOptional()
    @IsString()
    event_name?: string;
  
    @IsOptional()
    @Type(() => Date) // string → Date
    @IsDate()
    start_date: Date = new Date(); // 기본값 설정
  
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    end_date?: Date;
  
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    is_active: boolean = true;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number = 30;
  }

export class GetEventDetailPathDto {
    @IsString()
    event_id: string;
  }

export class CreateRewardReceiptDto {
    event_id: string;
    uid: string;
}

export class GetRewardListQueryDto {
    @IsOptional()
    @IsString()
    reward_name?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number = 30;
}

export class GetHistoryListQueryDto {
    @IsString()
    uid: string;

    @Type(() => Date)
    @IsDate()
    start_date: Date = new Date();
}

export class GetAdminHistoryListQueryDto {
    @IsString()
    event_id: string;

    @IsOptional()
    @IsString()
    uid?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit: number = 30;
}