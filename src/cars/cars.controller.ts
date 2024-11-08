import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard)
  @Post('car')
  create(@Body() createCarDto: CreateCarDto) {
    console.log(createCarDto);
    
    return this.carsService.create(createCarDto);
  }

  @UseGuards(AuthGuard)
  @Get('cars')
  findAll() {
    return this.carsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('car/:id_car')
  findOne(@Param('id_car') id_car: number) {
    return this.carsService.findOne(+id_car);
  }

  @UseGuards(AuthGuard)
  @Put('car/:id_car')
  update(@Param('id_car') id_car: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id_car, updateCarDto);
  }

  @UseGuards(AuthGuard)
  @Delete('car/:id_car')
  remove(@Param('id_car') id_car: number) {
    return this.carsService.remove(+id_car);
  }
}
