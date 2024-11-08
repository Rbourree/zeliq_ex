import { IsEmail, IsString } from 'class-validator';

export class AuthResponseDto {
    @IsEmail()
    email: string 

    @IsString()
    token: string
}
