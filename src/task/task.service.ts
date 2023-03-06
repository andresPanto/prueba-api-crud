import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { name, description } = updateTaskDto;
    const task = await this.getTaskById(id);
    if (name) task.name = name;
    if (description) task.description = description;
    try {
      return await this.taskRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error updating task`,
        code: 'ERROR_UPDATING_TASK',
        error: e,
      });
    }
  }
  async updateStatus(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    try {
      task.completed = !task.completed;
      return await this.taskRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error updating status of task`,
        code: 'ERROR_UPDATING_STATUS',
        error: e,
      });
    }
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { name, description } = createTaskDto;
      const task = this.taskRepository.create({
        name,
        description,
        completed: false,
      });
      return await this.taskRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error creating task`,
        code: 'ERROR_CREATING_TASK',
        error: e,
      });
    }
  }
  async deleteTask(id: number): Promise<Task> {
    try {
      const taskToDelete = await this.getTaskById(id);
      await this.taskRepository.delete({ id });

      return taskToDelete;
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error deleting task`,
        code: 'ERROR_DELETING_TASK',
        error: e,
      });
    }
  }
  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error getting all tasks`,
        code: 'ERROR_GETTING_ALL_TASKS',
        error: e,
      });
    }
  }
  async getTaskById(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) {
        throw new NotFoundException({
          message: `Task with id ${id} not found`,
          code: 'TASK_NOT_FOUND',
        });
      }
      return task;
    } catch (e) {
      throw new InternalServerErrorException({
        message: `Error getting task`,
        code: 'ERROR_GETTING_TASK',
        error: e,
      });
    }
  }
}
