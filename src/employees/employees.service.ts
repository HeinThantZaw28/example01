import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly databaseService2: DatabaseService,
  ) {
    console.log(
      'databaseService===databaseService2',
      this.databaseService === this.databaseService2,
    );
  }
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    } else {
      return this.databaseService.employee.findMany();
    }
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
