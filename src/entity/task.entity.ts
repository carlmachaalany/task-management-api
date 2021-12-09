
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, length: 64})
    title: string;

    @Column({nullable: true, length: 1024})
    descripton: string;

    @Column({nullable: true, default: 0})
    status: number;
}