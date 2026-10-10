import type { ExceptionMetadata } from '../../../shared/errors/ExceptionMetadata.js';
import { InfrastructureException } from '../../../shared/errors/infrastructure/InfrastructureException.js';

export interface QueueExceptionProps {
  message?: string;
  metadata?: ExceptionMetadata | undefined;
  cause?: unknown;
}

export class QueueException extends InfrastructureException {
  static readonly CODE = 'QUEUE_ERROR';

  constructor(props?: QueueExceptionProps) {
    super({
      message: props?.message ?? 'Queue operation failed',
      code: QueueException.CODE,
      metadata: props?.metadata,
      cause: props?.cause,
    });
  }
}
