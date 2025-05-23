import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { EventForReward, EventForRewardDocument } from './schemas/event_for_reward.schema';
import { EventForUser, EventForUserDocument } from './schemas/event_for_user.schema';
import { ConfigService } from '@nestjs/config';
import { CreateEventDto, CreateRewardDto, GetEventListQueryDto, CreateRewardReceiptDto, GetRewardListQueryDto, GetHistoryListQueryDto, GetAdminHistoryListQueryDto, GetAdminHistoryListPathDto } from './event.dto';
import { ApiResult } from '../common/api_result';
import { UserInventory, UserInventoryDocument } from '../users/user_inventory.schema';
import { ConditionType, GetHistoryListBodyDto } from './event.dto';
import { UserHistory, UserHistoryDocument } from '../users/user_history.schema';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
        @InjectModel(Reward.name) private readonly rewardModel: Model<RewardDocument>,
        @InjectModel(EventForReward.name) private readonly eventForRewardModel: Model<EventForRewardDocument>,
        @InjectModel(EventForUser.name) private readonly eventForUserModel: Model<EventForUserDocument>,
        @InjectModel(UserInventory.name) private readonly userInventoryModel: Model<UserInventoryDocument>,
        @InjectModel(UserHistory.name) private readonly userHistoryModel: Model<UserHistoryDocument>,
        private readonly configService: ConfigService,  
      ) {}

    async createEvent(createEventDto: CreateEventDto) {
        const event_check = await this.eventModel.findOne({ name: createEventDto.name });
        if (event_check) {
            throw ApiResult.EVENT_ALREADY_EXISTS;
        }
        const rewards = await this.rewardModel.find({ _id: { $in: createEventDto.reward_array } });
        if (rewards.length !== createEventDto.reward_array.length) {
            throw ApiResult.REWARD_NOT_FOUND;
        }
        const event = await this.eventModel.create({
            name: createEventDto.name,
            description: createEventDto.description,
            start_date: createEventDto.start_date,
            end_date: createEventDto.end_date,
            created_user_id: createEventDto.created_user_id,
            condition_type: createEventDto.condition_type,
            condition_value: createEventDto.condition_value,
        });

        for (const reward of rewards){
            await this.eventForRewardModel.create({
                event_id: event._id,
                reward_id: reward._id,
            });
        }
    }

    async createReward(createRewardDto: CreateRewardDto) {
        const reward = await this.rewardModel.findOne({ name: createRewardDto.name, type: createRewardDto.type });
        if (reward) {
            throw ApiResult.REWARD_ALREADY_EXISTS;
        }
        const newReward = await this.rewardModel.create(createRewardDto);
    }

    async getEventList(getEventListQueryDto: GetEventListQueryDto, isAdmin: boolean = false) {
        const { event_name, start_date, end_date, page, limit } = getEventListQueryDto;
        const query: any = {};
        
        // 관리자가 아닌 경우에만 삭제/비활성화 필터 적용
        if (!isAdmin) {
            query.is_deleted = false;
            query.is_active = true;
        }
        
        if (event_name) {
            query.name = { $regex: event_name, $options: 'i' };
        }
        if (start_date) {
            query.start_date = { $gte: start_date };
        }
        if (end_date) {
            query.end_date = { $lte: end_date };
        }

        const total = await this.eventModel.countDocuments(query);
        const events = await this.eventModel.find(query).skip((page - 1) * limit).limit(limit);
        return {
            "events": events,
            "total": total,
        };
    }

    async getEventDetail(event_id: string, isAdmin: boolean = false) {
        const query: any = { _id: event_id };

        let event_for_user_count = 0;
        let event_for_user_list = [];
        
        // 관리자가 아닌 경우에만 삭제/비활성화 필터 적용
        if (!isAdmin) {
            query.is_deleted = false;
            query.is_active = true;
            const event_for_user_list = await this.eventForUserModel.find({ event_id: event_id });
            const event_for_user_count = event_for_user_list.length;
        }
        
        const event = await this.eventModel.findOne(query);
        if (!event) {
            throw ApiResult.EVENT_NOT_FOUND;        
        }
        const event_for_reward = await this.eventForRewardModel.find({ event_id: event_id });
        const rewards = await this.rewardModel.find({ _id: { $in: event_for_reward.map(reward => reward.reward_id)}});
        
        return {
            "event": event,
            "rewards": rewards,
            "event_for_user_count": event_for_user_count,
            "event_for_user_list": event_for_user_list,
        };
    }

    async getEvent(event_id: string): Promise<Event | null> {
        return this.eventModel.findById(event_id);
    }

    async getReward(reward_id: string): Promise<Reward | null> {
        return this.rewardModel.findById(reward_id);
    }

    async getEventForReward(event_id: string): Promise<EventForReward | null> {
        return this.eventForRewardModel.findById(event_id);
    }

    async getEventForUser(event_id: string): Promise<EventForUser | null> {
        return this.eventForUserModel.findById(event_id);
    }

    async createRewardReceipt(createRewardReceiptDto: CreateRewardReceiptDto) {
        const { event_id, uid } = createRewardReceiptDto;
        // 삭제, 비활성화 X, 종료일 지나지 않은 이벤트만 수령 가능
        const event = await this.eventModel.findOne({ _id: event_id, "is_deleted": false, "is_active": true, "end_date": { $gte: new Date() } });
        if (!event) {
            throw ApiResult.EVENT_NOT_FOUND;
        }
        const event_for_user = await this.eventForUserModel.findOne({ event_id: event_id, uid: uid});
        if (event_for_user) {
            throw ApiResult.EVENT_FOR_USER_ALREADY_EXISTS;
        }
        const user_history = await this.userHistoryModel.findOne({ uid: uid });
        if (!user_history) {
            throw ApiResult.UNKNOWN_ERROR;
        }
        if (event.condition_type === ConditionType.LOGIN) {
            if (user_history.login_count < event.condition_value) {
                throw ApiResult.EVENT_CONDITION_NOT_MET;
            }
        } else if (event.condition_type === ConditionType.INVITE_FRIEND) {
            if (user_history.invited_friend_count < event.condition_value) {
                throw ApiResult.EVENT_CONDITION_NOT_MET;
            }
        } else if (event.condition_type === ConditionType.KILL_MONSTER) {
            if (user_history.kill_monster_count < event.condition_value) {
                throw ApiResult.EVENT_CONDITION_NOT_MET;
            }
        }
        const event_for_reward = await this.eventForRewardModel.find({ event_id: event_id });
        const rewards = await this.rewardModel.find({ _id: { $in: event_for_reward.map(reward => reward.reward_id)}});
        for (const reward of rewards) {
            await this.userInventoryModel.create({ uid: uid, reward_id: reward._id, amount: reward.amount });
        }
        await this.eventForUserModel.create({ event_id: event_id, uid: uid });
    }

    async getRewardList(getRewardListQueryDto: GetRewardListQueryDto) {
        const { reward_name, page, limit } = getRewardListQueryDto;
        const query: any = {};
        if (reward_name) {
            query.name = { $regex: reward_name, $options: 'i' };
        }
        const total = await this.rewardModel.countDocuments(query);
        const rewards = await this.rewardModel.find(query).skip((page - 1) * limit).limit(limit).sort({ created_at: -1 });
        return {
            "rewards": rewards,
            "total": total,
        };
    }

    async getHistoryList(getHistoryListBodyDto: GetHistoryListBodyDto, getHistoryListQueryDto: GetHistoryListQueryDto) {
        const { uid } = getHistoryListBodyDto;
        const { start_date } = getHistoryListQueryDto;
        
        // 완료한 이벤트 목록 전체 조회
        // 일반 유저도 참가한 이벤트는 삭제, 비활성화되었어도 조회가능
        const event_list = await this.eventModel.find({ 
            end_date: { $gte: start_date }
        });

        const received_event_for_user = await this.eventForUserModel
            .find({ 
                event_id: { $in: event_list.map(event => event._id) }, 
                uid: uid 
            });  

        const receivedEventIdSet = new Set(received_event_for_user.map(e => e.event_id.toString()));

        const result_event_list: Array<{ event: Event, is_received: boolean }> = [];

        for (const event of event_list) {
            result_event_list.push({    
                "event": event,
                "is_received": receivedEventIdSet.has(event._id.toString()),
            });
        }

        return {
            "events": result_event_list,
            "total": result_event_list.length
        };
    }

    async getAdminHistoryList(getAdminHistoryListPathDto: GetAdminHistoryListPathDto, getAdminHistoryListQueryDto: GetAdminHistoryListQueryDto) {
        const { event_id } = getAdminHistoryListPathDto;
        const { uid, page, limit } = getAdminHistoryListQueryDto;
        const query: any = {};

        const event = await this.eventModel.findById(event_id);
        if (!event) {
            throw ApiResult.EVENT_NOT_FOUND;
        }
        query.event_id = event_id;
        if (uid) {
            query.uid = uid;
        }
        const total = await this.eventForUserModel.countDocuments(query);
        const event_for_user = await this.eventForUserModel.find(query).skip((page - 1) * limit).limit(limit).sort({ created_at: -1 });
        return {
            "event": event,
            "event_for_user": event_for_user,
            "total": total,
        };
    }
}