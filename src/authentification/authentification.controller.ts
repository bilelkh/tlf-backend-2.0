import { Controller, Get, UseGuards, Post, Body, Req, HttpStatus } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { signInDTO } from './dto/signin-user.dto';
import { activateAccountDTO } from './dto/active-account.dto'
@Controller('authentification')
export class AuthentificationController {
     constructor(private readonly authentificationService: AuthentificationService) {


     }
     @Get('signin')
     async login(@Body() signInDto: signInDTO) {
          return await this.authentificationService.singIn(signInDto);
     }

     @Get('activateAccount')
     async   activateAccount(@Body() signInDto: signInDTO) {
          return await this.authentificationService.activateAccount(signInDto);
     }



}
