import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  @ApiOperation({
    summary: 'Gets all tasks',
    description: 'Gets all task previously created',
  })
  @ApiResponse({ type: Array<Task> })
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this._taskService.getAllTasks();
  }

  @ApiOperation({
    summary: 'Gets task by id',
    description: 'Gets task with the recieved id',
  })
  @ApiParam({
    name: 'id',
    description: 'task id',
    example: '1',
    type: 'number',
    required: true,
  })
  @ApiResponse({ type: Task })
  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this._taskService.getTaskById(id);
  }

  @ApiOperation({
    summary: 'Delete task',
    description: 'Deletes task with the recieved id',
  })
  @ApiParam({
    name: 'id',
    description: 'task id',
    example: '1',
    type: 'number',
    required: true,
  })
  @ApiResponse({ type: Task })
  @Delete(':id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this._taskService.deleteTask(id);
  }

  @ApiOperation({
    summary: 'Create task',
    description: 'Creates task with the given information',
  })
  @ApiParam({
    name: 'createTaskDto',
    description: 'Information to create task',
    required: true,
  })
  @ApiResponse({ type: Task })
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this._taskService.createTask(createTaskDto);
  }

  @ApiOperation({
    summary: 'Update status',
    description: 'Modifies the status of the task with the given id',
  })
  @ApiParam({
    name: 'id',
    description: 'task id',
    example: '1',
    type: 'number',
    required: true,
  })
  @ApiResponse({ type: Task })
  @Patch(':id/status')
  async updateStatus(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this._taskService.updateStatus(id);
  }

  @ApiOperation({
    summary: 'Update task',
    description: 'Updates task with the given information',
  })
  @ApiParam({
    name: 'id',
    description: 'task id',
    example: '1',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'updateTaskDto',
    description: 'Information to update task',
    required: true,
  })
  @ApiResponse({ type: Task })
  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this._taskService.updateTask(id, updateTaskDto);
  }
}
