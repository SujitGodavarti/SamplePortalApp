export class TaskStatus {
    id: number;
    description: string;
    completed: boolean;
    success: boolean;
    canReschedule: boolean;
    canCancel: boolean;
}