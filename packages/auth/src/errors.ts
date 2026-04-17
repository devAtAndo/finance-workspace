export class UnauthorizedError extends Error {
  override readonly name = 'UnauthorizedError';
  constructor(message = 'Unauthorized', readonly cause_?: unknown) {
    super(message);
  }
}

export class ForbiddenError extends Error {
  override readonly name = 'ForbiddenError';
  constructor(message = 'Forbidden') {
    super(message);
  }
}
