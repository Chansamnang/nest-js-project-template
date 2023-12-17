import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';

export class LogRepository extends Repository<Log> {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {
    super(
      logRepository.target,
      logRepository.manager,
      logRepository.queryRunner,
    );
  }
}
