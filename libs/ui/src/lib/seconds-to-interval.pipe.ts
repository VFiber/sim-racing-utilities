import { Pipe, PipeTransform } from '@angular/core';
import { format, intervalToDuration } from 'date-fns';

@Pipe({
  name: 'secondsToInterval'
})
export class SecondsToIntervalPipe implements PipeTransform {

  static transform(seconds: number): string {
    const duration = intervalToDuration({start: 0, end: seconds * 1000});
    const milisecs = Math.round((seconds % 1) * 1000);
    const date = new Date(0,0, duration.days, duration.hours, duration.minutes, duration.seconds, milisecs);

    if (seconds > 1800) {
      return (duration.days ? `${duration.days}d ` : '') + format(date, "H'h' m'm'")
    }

    if (duration.hours) {
      return `${duration.hours}h ${duration.minutes}m ${duration.minutes}s`;
    }

    return format(date, 'm:ss.SSS')
  }

 transform(seconds: number): string {
    return SecondsToIntervalPipe.transform(seconds);
  }
}
