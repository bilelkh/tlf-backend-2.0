import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     firstName: string;

     @Column()
     lastName: string;

     @Column()
     email: string;

     @Column()
     phone: string;

     @Column()
     password: string;

     @Column({ type: Boolean, default: false })
     isActive: Boolean;
}