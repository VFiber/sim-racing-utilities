import { Pipe, PipeTransform } from '@angular/core';
import { format, intervalToDuration } from 'date-fns';

@Pipe({
  name: 'secondsToInterval'
})
export class SecondsToIntervalPipe implements PipeTransform {

  static transform(seconds: number): string {
    if (!seconds) {
      return '0';
    }

    const duration = intervalToDuration({start: 0, end: seconds * 1000});
    const milisecs = Math.round((seconds % 1) * 1000);
    const date = new Date(0, 0, duration.days, duration.hours, duration.minutes, duration.seconds, milisecs);

    if (!milisecs) {
      return SecondsToIntervalPipe.toHumanInterval(date, duration);
    }

    return format(date, 'm:ss.SSS')
  }

  private static toHumanInterval(date: Date, duration: Duration) {
    const hasMinutes = date.getMinutes() > 0;
    const hasSeconds = date.getSeconds() > 0;

    const hours = ((duration.days ?? 0) * 24 + (duration.hours ?? 0));

    // we have only hours
    if (hours && !hasMinutes && !hasSeconds) {
      return hours + 'h';
    }

    // we have only minutes & hours
    if (hours && hasMinutes && !hasSeconds) {
      return hours + 'h' + format(date, " m'm'");
    }

    // we have only minutes and seconds
    if (!hours && hasMinutes && hasSeconds) {
      return format(date, "m'm' s's'");
    }

    // we have only minutes
    if (!hours && hasMinutes && !hasSeconds) {
      return format(date, "m'm'");
    }

    // we have only seconds
    if (!hours && !hasMinutes && hasSeconds) {
      return (duration.seconds ?? 0) + 's';
    }

    // we have only minutes
    if (!hours && hasMinutes && !hasSeconds) {
      return format(date, "m'm'");
    }

    if (hours >= 24) {
      // this is a special snowflake because format cant handle >= 24
      return hours + 'h' + format(date, " m'm' s's'");
    }

    return format(date, "H'h' m'm' s's'");
  }

  transform(seconds: number): string {
    return SecondsToIntervalPipe.transform(seconds);
  }
}
