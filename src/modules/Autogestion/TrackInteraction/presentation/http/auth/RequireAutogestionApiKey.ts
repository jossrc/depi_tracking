import type { FastifyRequest } from 'fastify';
import { Environment } from '../../../../../../config/environment/Environment.js';
import { UnauthorizedException } from '../../../../../../shared/errors/security/UnauthorizedException.js';
import { isValidApiKey } from '../../../../../../shared/security/IsValidApiKey.js';

function readApiKeyHeader(request: FastifyRequest): string | undefined {
  const header = request.headers['x-api-key'];

  if (Array.isArray(header)) {
    return header[0];
  }

  return header;
}

export async function requireAutogestionApiKey(
  request: FastifyRequest,
): Promise<void> {
  if (
    !isValidApiKey(readApiKeyHeader(request), Environment.DEPI_TRACK_AUTOGES_API_KEY)
  ) {
    throw new UnauthorizedException({
      message: 'API key inválida',
    });
  }
}
