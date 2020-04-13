import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ContactsModule,
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: '1ocalhost',
      port: 1521,
      username: 'system',
      password: 'Khdadhraoui123#',
      database: 'CdCER',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
