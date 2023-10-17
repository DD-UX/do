// Format time
import dayjs from 'dayjs';

import {NO_VALUE} from 'features/app/constants/ui-constants';

export const getDateTimeValue = (
  time: Date | string | number | null | undefined,
  formatTemplate = 'ddd, D MMM, YYYY'
) => (dayjs(time).isValid() ? dayjs(time).format(formatTemplate) : NO_VALUE);

export const getDateTimeRangeValue = (
  startTime: Date | string | number | null | undefined,
  endTime: Date | string | number | null | undefined,
  formatTemplate = 'ddd, D MMM, YYYY'
) => {
  // If any of the values is valid, display it as a range
  if (dayjs(startTime).isValid() || dayjs(endTime).isValid()) {
    return `${getDateTimeValue(startTime, formatTemplate)} - ${getDateTimeValue(
      endTime,
      formatTemplate
    )}`;
  }

  // Otherwise just return a single NO_VALUE
  return NO_VALUE;
};
