import { IsNumber, IsDateString } from 'class-validator';

export class CreateBookingDto {
    @IsNumber()
    id_car: number

    @IsDateString()
    start_at: Date

    @IsDateString()
    end_at: Date
}


export class CreateBookingBDDDto {
    @IsNumber()
    id_car: number

    @IsNumber()
    id_user: number

    @IsDateString()
    start_at: Date

    @IsDateString()
    end_at: Date
}