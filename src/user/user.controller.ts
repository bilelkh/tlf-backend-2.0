import { UserService } from './user.service';
import { User } from './user.entity';
import { Controller, Post, Put, Delete, Body, Param, Get } from '@nestjs/common';


@Controller('user')
export class UserController {
     constructor(private userService: UserService) { }
     @Get()
     findAll(): Promise<any> {
          return this.userService.findAll();
     }
     @Post()
     async create(@Body() user: User): Promise<any> {
          console.log("===user===",user)
          return this.userService.create(user);
     }
     @Put(':id')
     async update(@Param('id') id, @Body() user: User): Promise<any> {
          user.id = Number(id);
          return this.userService.update(user);
     }
     @Delete(':id')
     async delete(@Param('id') id): Promise<any> {
          return this.userService.delete(id);
     }
}
