import { BadRequestException } from '@nestjs/common';

export function splitDateRange(dateRangeString: string) {
  const dateRangeFormat =
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!dateRangeString.match(dateRangeFormat)) {
    throw new BadRequestException(
      `Invalid date range format. The expected format is YYYY-MM-DD HH:mm:ss,YYYY-MM-DD HH:mm:ss`,
    );
  }

  const [start, end] = dateRangeString.split(',');
  const startDate = new Date(start.trim());
  const endDate = new Date(end.trim());
  return { startDate, endDate };
}
