import { Role } from "../common/auth/auth.dto";

export class LoginUserDto {
  user_id: string;
  password: string;
}

export class SignupUserDto {
  user_id: string;
  password: string;
  email?: string;
  role: Role;
}

export class RoleChangeDto {
  user_id: string;
  role: Role;
}