export class ConfigError extends Error {
  override readonly name = 'ConfigError';
}

export class UnknownAppError extends Error {
  override readonly name = 'UnknownAppError';
  constructor(slug: string) {
    super(`Unknown app slug: ${slug}`);
  }
}
