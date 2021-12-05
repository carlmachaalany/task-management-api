import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    
    constructor(private taskService: TaskService) {}

    @Get()
    public async showAll() {
        const resp = await this.taskService.getAll();
        return resp;
    }

    @Get(":id")
    public async showSingle(
        @Param("id") id: number
    ) {
        const resp = await this.taskService.getOne(id);
        return resp;
    }

    @Post()
    @Header("Content-type", "application/json")
    async createTask(@Body() task: TaskDTO): Promise<void> {
        this.taskService.createTask(task);
    }

    @Patch()
    @Header("Content-type", "application/json")
    async updateTask(@Body() task: TaskDTO): Promise<void> {
        this.taskService.updateTask(task);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(
        @Param("id") id: number
    ) {
        await this.taskService.delete(id);
    }

}
