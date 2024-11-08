import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookingDto, CreateBookingBDDDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingsService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateBookingBDDDto) {


    if (new Date() <= data.start_at) throw new HttpException("start_at must be greater than today's date.", HttpStatus.BAD_REQUEST);
    if (new Date() >= data.end_at) throw new HttpException("end_at must be greater than today's date. ", HttpStatus.BAD_REQUEST);

    return await this.prisma.$transaction(async (prisma) => {
      const bookingsOfThisCar = await prisma.bookings.findMany({
        where: {
          id_car: data.id_car,
          cancel_at: null,
          OR: [
            { start_at: { lte: data.end_at }, end_at: { gte: data.start_at } },
            { start_at: { gte: data.start_at }, end_at: { lte: data.end_at } }
          ]
        }
      });

      if (bookingsOfThisCar.length > 0) {
        throw new HttpException('Car already booking', HttpStatus.BAD_REQUEST);
      }

      return await prisma.bookings.create({ data });
    })

  }

  async findAll() {
    return await this.prisma.bookings.findMany({
      include: { Cars: true }
    });
  }

  async findOne(id_booking: number) {
    return await this.prisma.bookings.findUnique({ where: { id_booking }, include: { Cars: true } });
  }

  async update(id_booking: number, data: UpdateBookingDto) {
    console.log(data);

    if (new Date() <= data.start_at) throw new HttpException("start_at must be greater than today's date.", HttpStatus.BAD_REQUEST);
    if (new Date() >= data.end_at) throw new HttpException("end_at must be greater than today's date. ", HttpStatus.BAD_REQUEST);
    if (data.start_at >= data.end_at) throw new HttpException("end_at must be greater than start_at. ", HttpStatus.BAD_REQUEST);

    return await this.prisma.$transaction(async (prisma) => {
      const bookingsOfThisCar = await prisma.bookings.findMany({
        where: {
          id_booking: { not: id_booking },
          id_car: +data.id_car,
          cancel_at: null,
          OR: [
            { start_at: { lte: data.end_at }, end_at: { gte: data.start_at } },
            { start_at: { gte: data.start_at }, end_at: { lte: data.end_at } }
          ]
        }
      });

      if (bookingsOfThisCar.length > 0) {
        throw new HttpException('Car already booking', HttpStatus.BAD_REQUEST);
      }
      
      return await prisma.bookings.update({ data, where: { id_booking: id_booking } });
    })
  }

  async remove(id_booking: number) {
    return await this.prisma.bookings.update({ where: { id_booking }, data: { cancel_at: new Date() } });
  }
}
