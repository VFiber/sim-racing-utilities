export enum RaceDurationType {
  Unknown,
  /**
   * Lap based - has to complete fixed amount of laps
   */
  Lap,
  /**
   * Time based, has to race until a certain amount of time + reach finish line of current lap
   */
  Time
}

export interface Track {
  /**
   * Full name of the track
   */
  name: string;

  /**
   * Each track has a different lines, this can be specified here.
   */
  variant?: string;
  /**
   * In meters
   */
  length: number;
}
