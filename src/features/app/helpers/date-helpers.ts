// Format time
import dayjs from 'dayjs';

export const formatDateTime = (time: string, formatTemplate = 'ddd, D MMM, YYYY') =>
  dayjs(time).format(formatTemplate);
