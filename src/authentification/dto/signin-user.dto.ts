import { IsNotEmpty, IsEmail } from 'class-validator';

export class signInDTO {
     @IsEmail()
     readonly email: string;

     @IsNotEmpty()
     readonly password: string;
}
