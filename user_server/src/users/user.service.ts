import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, RoleChangeDto, UidBody } from './user.dto';
import * as bcrypt from 'bcrypt';
import { HASH_ROUND } from "../common/common-variables";
import { ApiResult, make_api_result } from "../common/api_result";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserHistory, UserHistoryDocument } from './user_history.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserHistory.name) private readonly userHistoryModel: Model<UserHistoryDocument>,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, HASH_ROUND);

    if (await this.userModel.findOne({ user_id: createUserDto.user_id })) {
      throw ApiResult.USER_ALREADY_EXISTS;
    }

    const newUser = await this.userModel.create({
      user_id: createUserDto.user_id,
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashedPassword,
    });

    await this.userHistoryModel.create({
      uid: newUser.user_id,
      login_count: 0,
      invited_friend_count: 0,
      kill_monster_count: 0,
    });
    
    const token = jwt.sign(
      { 
        id: newUser.user_id,
        role: newUser.role 
      }, 
      this.configService.get<string>('jwtSecret')!, 
      { expiresIn: '1h' }
    ); 

    const returnData: Record<string, any> = {
      jwt_token: token,
      user_id: newUser.user_id,
    }

    return returnData;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ user_id: loginUserDto.user_id });
    if (!user) {
      throw ApiResult.USER_NOT_FOUND;
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw ApiResult.INVALID_PASSWORD;
    }

    const token = jwt.sign(
      { 
        id: user.user_id,
        role: user.role
      }, 
      this.configService.get<string>('jwtSecret')!, 
      { expiresIn: '1h' }
    ); 

    const returnData: Record<string, any> = {
      jwt_token: token,
      user_id: user.user_id,
      role: user.role
    }

    return returnData;
  }

  async roleChange(roleChangeDto: RoleChangeDto) {
    const user = await this.userModel.findOne({ user_id: roleChangeDto.user_id });
    if (!user) {
      throw ApiResult.USER_NOT_FOUND;
    }

    user.role = roleChangeDto.role;
    await user.save();
  }


  async inviteFriend(uidBody: UidBody) {
    const user = await this.userModel.findOne({ user_id: uidBody.uid });
    if (!user) {
      throw ApiResult.USER_NOT_FOUND;
    }

    const user_history = await this.userHistoryModel.findOne({ uid: user.user_id });
    if (!user_history) {
      throw ApiResult.UNKNOWN_ERROR;
    }
    user_history.invited_friend_count += 1;
    await user_history.save();
  }

  async killMonster(uidBody: UidBody) {
    const user = await this.userModel.findOne({ user_id: uidBody.uid });
    if (!user) {
      throw ApiResult.USER_NOT_FOUND;
    }

    const user_history = await this.userHistoryModel.findOne({ uid: user.user_id });
    if (!user_history) {
      throw ApiResult.UNKNOWN_ERROR;
    }
    user_history.kill_monster_count += 99999;
    await user_history.save();
  }

  async login_count_up(uidBody: UidBody) {
    const user = await this.userModel.findOne({ user_id: uidBody.uid });
    if (!user) {
      throw ApiResult.USER_NOT_FOUND;
    }

    const user_history = await this.userHistoryModel.findOne({ uid: user.user_id });
    if (!user_history) {
      throw ApiResult.UNKNOWN_ERROR;
    }
    user_history.login_count += 5;
    await user_history.save();
  }
}