import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  EmployeeLogin,
  EmployeeRegister,
  EmployeeResponse,
  EmployeeUpdate,
} from '../../model/dto/employee.dto';
import { WebResponse } from '../../model/dto/web.dto';
import { Employee } from '../../model/employee.entity';
import { Auth } from '../../common/auth/auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() request: EmployeeRegister,
  ): Promise<WebResponse<EmployeeResponse>> {
    const response = await this.authService.register(request);
    return {
      status: true,
      code: HttpStatus.CREATED,
      message: 'employee registered successfully',
      data: response,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() request: EmployeeLogin,
  ): Promise<WebResponse<EmployeeResponse>> {
    const response = await this.authService.login(request);
    return {
      status: true,
      code: HttpStatus.OK,
      message: 'Login successfully',
      data: response,
    };
  }

  @Get('/profile')
  async getDetails(
    @Auth() request: Employee,
  ): Promise<WebResponse<EmployeeResponse>> {
    const response = await this.authService.profile(request);
    return {
      status: true,
      code: HttpStatus.OK,
      message: 'Details fetched successfully',
      data: response,
    };
  }

  @Post('/logout')
  async logout(@Auth() request: Employee): Promise<WebResponse<void>> {
    await this.authService.logout(request);
    return {
      status: true,
      code: HttpStatus.OK,
      message: 'Logout successfully',
    };
  }

  @Patch('/profile')
  async update(
    @Auth() request: EmployeeUpdate,
  ): Promise<WebResponse<EmployeeResponse>> {
    const response = await this.authService.update(request);
    return {
      status: true,
      code: HttpStatus.OK,
      message: 'Update profile successfully',
      data: response,
    };
  }
}
