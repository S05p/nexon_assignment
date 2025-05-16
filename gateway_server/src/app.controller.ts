import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/auth.dto';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.USER)
  getHello(): string {
    return this.appService.getHello();
  }
}

export const _controllers = [AppController];