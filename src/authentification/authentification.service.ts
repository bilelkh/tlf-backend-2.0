import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface'
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { signInDTO } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { activateAccountDTO } from './dto/active-account.dto'

@Injectable()
export class AuthentificationService {

     constructor(
          private readonly jwtService: JwtService,
          private userService: UserService) { }


     async findUserByEmail(email: string): Promise<any> {
          return await this.userService.findUserByEmail(email);
     }


     async singIn(signInDto: signInDTO) {
          const { email, password } = signInDto;
          const user: any = await this.userService.findUserByEmail(email);
          if (!user) {
               throw new UnauthorizedException(`User with ${email} does not exist`, 'unknown_user');
          }
          // if user found
          if (user) {
               // compare password
               const isPasswordCorrect = await bcrypt.compare(password, user.password);
               // if password is correct
               if (isPasswordCorrect) {
                    const accessToken = this.jwtService.sign({
                         id: user.id,
                         email: user.email,
                    });
                    return {
                         expiresIn: 3600,
                         token: accessToken,
                    };
               } else {  // if password is incorrect
                    throw new UnauthorizedException('Incorrect password.');
               }
          }
     }

     async  activateAccount(activateAccountDTO: activateAccountDTO) {

     }
}
