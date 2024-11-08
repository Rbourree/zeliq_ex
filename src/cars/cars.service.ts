import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateCarDto) {
    console.log(data);

    return await this.prisma.cars.create({ data });
  }

  async findAll() {
    return await this.prisma.cars.findMany({
      include: { booking: true }
    });
  }

  async findOne(id_car: number) {
    return await this.prisma.cars.findUnique({ where: { id_car }, include: { booking: true } });
  }

  async update(id_car: number, updateCarDto: UpdateCarDto) {
    return await this.prisma.cars.update({ where: { id_car }, data: updateCarDto });
  }

  async remove(id_car: number) {
    return await this.prisma.cars.delete({ where: { id_car } });
  }
}
