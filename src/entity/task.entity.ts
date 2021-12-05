
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

// We use enum when we want a property to have a finite 
// amount of values that we specfify
export enum TaskStatus {
    Created = 0,
    InProgress = 1,
    Done = 2
}

@Entity()
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, length: 64})
    title: string;

    @Column({nullable: true, length: 1024})
    descripton: string;

    @Column({nullable: true, default: TaskStatus.Created})
    status: TaskStatus;
}