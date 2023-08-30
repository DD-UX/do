export const STATUS_BACKLOG = 'backlog';
export const STATUS_TODO = 'todo';
export const STATUS_IN_PROGRESS = 'in progress';
export const STATUS_CANCELLED = 'cancelled';
export const STATUS_IN_REVIEW = 'in review';
export const STATUS_DONE = 'done';
export const STATUS_BLOCKED = 'blocked';

export const TASK_STATUSES = [
  STATUS_BACKLOG,
  STATUS_TODO,
  STATUS_IN_PROGRESS,
  STATUS_CANCELLED,
  STATUS_IN_REVIEW,
  STATUS_DONE,
  STATUS_BLOCKED
] as const;
