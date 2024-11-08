import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, CreateBookingBDDDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Post('booking')
  create(@Body() createBookingDto: CreateBookingDto, @Req() req: any) {
    const data: CreateBookingBDDDto = { ...createBookingDto, id_user: +req.user.sub }
    return this.bookingsService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('bookings')
  findAll() {
    return this.bookingsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('booking/:id_booking')
  findOne(@Param('id_booking') id_booking: string) {
    return this.bookingsService.findOne(+id_booking);
  }

  @UseGuards(AuthGuard)
  @Put('booking/:id_booking')
  update(@Param('id_booking') id_booking: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id_booking, updateBookingDto);
  }

  @UseGuards(AuthGuard)
  @Delete('booking/:id_booking')
  remove(@Param('id_booking') id_booking: string) {
    return this.bookingsService.remove(+id_booking);
  }
}
