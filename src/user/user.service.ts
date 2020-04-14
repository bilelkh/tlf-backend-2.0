import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import * as nodemailer from 'nodemailer';
// import { UserDto } from '../user/dto/user.dto';



@Injectable()
export class UserService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>,
     ) { }

     async  findAll(): Promise<User[]> {
          return await this.userRepository.find();
     }

     async  create(user: User) {
          const expiresIn = process.env.EXPIRES_IN
          const secretKey = process.env.JWT_SECERET_KEY
          const { email } = user;
          const token = jwt.sign({ email: email }, "secret", { expiresIn });
          //  

          let transporter = nodemailer.createTransport({
               service: 'gmail',
               port: process.env.MAIL_PORT,
               secure: false, // use SSL
               auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
               }
          });

          let mailOptions = {
               from: '"Company" <' + process.env.MAIL_USER + '>',
               to: email, // list of receivers (separated by ,)
               subject: 'Verify Email',
               text: 'Verify Email',
               html: 'Hi! <br><br> Thanks for your registration<br><br>' +
                    '<a href=' + process.env.MAIL_HOST + ':' + process.env.HOST_PORT + '/auth/email/verify/' + token + '>Click here to activate your account</a>'  // html body
          };

          const sent = await new Promise<boolean>(async function (resolve, reject) {
               return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                         console.log('Message sent: %s', error);
                         return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
               });
          })
          return await this.userRepository.save(user)

     }

     async update(contact: User): Promise<UpdateResult> {
          return await this.userRepository.update(contact.id, contact);
     }

     async delete(id): Promise<DeleteResult> {
          return await this.userRepository.delete(id);
     }

     async findUserByEmail(email: string) {
          return await this.userRepository.findOne({ email: email });
     }



}
