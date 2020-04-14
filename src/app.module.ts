import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationModule } from './authentification/authentification.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: '1ocalhost',
      port: 1521,
      username: 'SYSTEM',
      password: 'Khadhraoui123#',
      database: 'ORCL',
      connectString: "localhost:1521/ORCL",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthentificationModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
