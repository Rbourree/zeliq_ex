import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    model: string
}