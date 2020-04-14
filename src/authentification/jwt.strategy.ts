import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthentificationService } from './authentification.service';
import { Jwt } from './interfaces/jwt.interface';
import { User } from '../user/interfaces/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(
          private readonly authentificationService: AuthentificationService) {
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               secretOrKey: "secret"
          });
     }

     async validateJWT(jwt: Jwt) {
          const { email } = jwt;
          const user = await this.authentificationService.findUserByEmail(email);
          if (!user) {
               throw new UnauthorizedException();
          }
          return user;
     }

     async creatEmailToken(user: User) {
          const emailToken = await this.jwtService.createToken(user)
          return emailToken;
     }
}
