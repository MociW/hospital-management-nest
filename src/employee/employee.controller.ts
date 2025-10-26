import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeRegister, EmployeeResponse } from '../model/dto/employee.dto';
import { WebResponse } from '../model/dto/web.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() request: EmployeeRegister,
  ): Promise<WebResponse<EmployeeResponse>> {
    const response = await this.employeeService.register(request);
    return {
      data: response,
    };
  }
}
