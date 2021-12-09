import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from '../entity/task.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { TaskDTO } from '../dto/task.dto';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>
    ) {}

    // helper function to turn an entity object into a TaskDTO.
    private entityToDTO(task: TaskEntity): TaskDTO {
        const taskDTO  = new TaskDTO();
        taskDTO.title = task.title;
        taskDTO.id = task.id;
        taskDTO.description = task.descripton;
        taskDTO.status = task.status;
        return taskDTO;
    }

    // returns all tasks in the database
    public async getAll() {
        const tasks: TaskEntity[] = await this.taskRepository.find();
        const tasksDTO: TaskDTO[] = tasks.map(task => this.entityToDTO(task));
        return tasksDTO;
    }

    public async getTasksByStatus(stat: string) { // TODO: This is not working (problem of types)
        console.log("This is the stat: ", typeof(stat));
        let status: number = parseInt(stat);
        console.log("This is the status: ", typeof(status));
        const task = await this.taskRepository.findOne({ status });
        return task;
    }

    public async getOne(id: number) {
        const task: TaskEntity = await this.taskRepository.findOne({where: {id}});
        if (!task) throw new NotFoundException(`Task withh the id ${id} was not found`);
        const taskDTO = this.entityToDTO(task);
        return taskDTO;
    }

    // // creates a Task by getting a CreateTaskDTO object 
    // public async createOne(createTaskRequest: CreateTaskDTO) {
    //     console.log(createTaskRequest.title);
    //     console.log(createTaskRequest.description);
    //     let task: TaskEntity = new TaskEntity();
    //     task.title = createTaskRequest.title;
    //     task.descripton = createTaskRequest.description;
    //     task.status = TaskStatus.Created;

    //     await this.taskRepository.save(task);

    //     return this.entityToDTO(task);
    // }

    public createTask(task: TaskDTO) {
        let newTask: TaskEntity = new TaskEntity();
        newTask.title = task.title;
        newTask.descripton = task.description;
        newTask.status = 0;
        this.taskRepository.save(newTask);
    }

    public updateTask(task: TaskDTO) {
        this.taskRepository.findOne(task.id).then(oldTask => {
            oldTask.title = task.title;
            oldTask.descripton = task.description;
            oldTask.status = task.status;
            this.taskRepository.save(oldTask);
        });
    }

    public async delete(id: number) {
        const task: TaskEntity = await this.taskRepository.findOne(id);
        await this.taskRepository.remove(task);
    }

}
