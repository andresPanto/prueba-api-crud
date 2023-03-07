import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  _logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { name, description } = updateTaskDto;
    const task = await this.getTaskById(id);
    this._logger.log(
      `[${this.updateTask.name}] Updating task with id ${id} with name ${name} and description ${description}`,
    );
    if (name) task.name = name;
    if (description) task.description = description;
    try {
      return await this.taskRepository.save(task);
    } catch (e) {
      this._logger.error(
        `[${this.updateTask.name}] Error updating task with id ${id}`,
      );
      throw new InternalServerErrorException({
        message: `Error updating task`,
        code: 'ERROR_UPDATING_TASK',
        error: e,
      });
    }
  }
  async updateStatus(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    this._logger.log(
      `[${this.updateStatus.name}] Updating status of task with id ${id}`,
    );
    try {
      task.completed = !task.completed;
      return await this.taskRepository.save(task);
    } catch (e) {
      this._logger.error(
        `[${this.updateStatus.name}] Error updating status of task with id ${id}`,
      );
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
      this._logger.log(
        `[${this.createTask.name}] Creating task with name ${name} and description ${description}`,
      );
      const task = this.taskRepository.create({
        name,
        description,
        completed: false,
      });
      return await this.taskRepository.save(task);
    } catch (e) {
      this._logger.error(`[${this.createTask.name}] Error creating task`);
      throw new InternalServerErrorException({
        message: `Error creating task`,
        code: 'ERROR_CREATING_TASK',
        error: e,
      });
    }
  }
  async deleteTask(id: number): Promise<Task> {
    try {
      this._logger.log(`[${this.deleteTask.name}] Deleting task with id ${id}`);
      const taskToDelete = await this.getTaskById(id);
      await this.taskRepository.delete({ id });

      return taskToDelete;
    } catch (e) {
      this._logger.error(
        `[${this.deleteTask.name}] Error deleting task with id ${id}`,
      );
      throw new InternalServerErrorException({
        message: `Error deleting task`,
        code: 'ERROR_DELETING_TASK',
        error: e,
      });
    }
  }
  async getAllTasks(): Promise<Task[]> {
    try {
      this._logger.log(`[${this.getAllTasks.name}] Getting all tasks`);
      return await this.taskRepository.find();
    } catch (e) {
      this._logger.error(`[${this.getAllTasks.name}] Error getting all tasks`);
      throw new InternalServerErrorException({
        message: `Error getting all tasks`,
        code: 'ERROR_GETTING_ALL_TASKS',
        error: e,
      });
    }
  }
  async getTaskById(id: number): Promise<Task> {
    try {
      this._logger.log(`[${this.getTaskById.name}] Getting task with id ${id}`);
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) {
        this._logger.error(
          `[${this.getTaskById.name}] Task with id ${id} not found`,
        );
        throw new NotFoundException({
          message: `Task with id ${id} not found`,
          code: 'TASK_NOT_FOUND',
        });
      }
      return task;
    } catch (e) {
      this._logger.error(
        `[${this.getTaskById.name}] Error getting task with id ${id}`,
      );
      throw new InternalServerErrorException({
        message: `Error getting task`,
        code: 'ERROR_GETTING_TASK',
        error: e,
      });
    }
  }
}
