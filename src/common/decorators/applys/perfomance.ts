import { performance } from 'perf_hooks';
import { Logger } from '@nestjs/common';

export function measurePerformance(
  originalMethod: (...args: any[]) => Promise<any>,
  context: string,
) {
  const logger = new Logger(context);

  return async function (...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    const executionTime = (end - start).toFixed(2);

    logger.log(`🚀 ${context} executado em ${executionTime}ms`);
    return result;
  };
}
