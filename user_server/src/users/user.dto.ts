import { Role } from "../common/auth/auth.dto";
import { IsString, IsOptional, IsEnum, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    user_id: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsEnum(Role)
    role: Role;
}

export class LoginUserDto {
    @IsString()
    user_id: string;

    @IsString()
    password: string;
}

export class RoleChangeDto {
    @IsString()
    user_id: string;

    @IsEnum(Role)
    role: Role;
}

export class UidBody {
    @IsString()
    uid: string;
}