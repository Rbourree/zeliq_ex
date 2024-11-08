import { IsNumber, IsDateString, IsNumberString } from 'class-validator';


export class UpdateBookingDto {
    @IsNumber()
    id_car: number

    @IsDateString()
    start_at: Date

    @IsDateString()
    end_at: Date
}