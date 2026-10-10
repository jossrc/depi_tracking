import type { ExceptionMetadata } from '../../../shared/errors/ExceptionMetadata.js';
import { InfrastructureException } from '../../../shared/errors/infrastructure/InfrastructureException.js';

export interface RedisExceptionProps {
  message?: string;
  metadata?: ExceptionMetadata | undefined;
  cause?: unknown;
}

export class RedisException extends InfrastructureException {
  static readonly CODE = 'REDIS_ERROR';

  constructor(props?: RedisExceptionProps) {
    super({
      message: props?.message ?? 'Redis operation failed',
      code: RedisException.CODE,
      metadata: props?.metadata,
      cause: props?.cause,
    });
  }
}
