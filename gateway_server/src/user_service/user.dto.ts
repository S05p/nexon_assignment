import { Role } from "../common/auth/auth.dto";
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class LoginUserDto {
  @IsString()
  user_id: string;

  @IsString()
  password: string;
}

export class SignupUserDto {
  @IsString()
  user_id: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsEnum(Role)
  role: Role;
}

export class RoleChangeDto {
  @IsString()
  user_id: string;

  @IsEnum(Role)
  role: Role;
}