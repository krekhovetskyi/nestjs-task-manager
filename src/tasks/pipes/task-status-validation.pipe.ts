import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';


const allowedStatuses: Readonly<TaskStatus[]> = [
  TaskStatus.OPEN,
  TaskStatus.DONE,
  TaskStatus.IN_PROGRESS
];

export class TaskStatusValidationPipe implements PipeTransform {

  transform(value: unknown): TaskStatus {
    const status = value as TaskStatus;

    if (!this._isStatusValid(status)) {
      throw new BadRequestException(`"${value}" is invalid status`);
    }

    return status;
  }

  private _isStatusValid(status: TaskStatus): boolean {
    return allowedStatuses.includes(status);
  }
}
