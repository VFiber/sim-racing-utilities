/**
 * Defines what values are given by the user and what is calculated
 */
export enum RaceDurationType {
  Unknown = '?',
  /**
   * Lap based - has to complete fixed amount of laps
   */
  Lap = 'Lap',
  /**
   * Time based, has to race until a certain amount of time + reach finish line of current lap
   */
  Time = 'Time'
}

/**
 * Contains every parameter needed to calculate simple Fuel Consumption
 */
export interface BasicRaceData {
  /**
   * @see RaceDurationType
   */
  raceType: RaceDurationType,
  /**
   * In seconds, user given value
   */
  lapTime: number;
  /**
   * Used fuel per lap, user given value
   */
  fuelPerLap: number;
  /**
   * Lap count, calculated / user given depends on raceType
   * @see RaceDurationType
   */
  lapCount: number;
  /**
   * Race time in seconds, calculated / user given depends on raceType
   * @see RaceDurationType
   */
  raceTime: number;
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

/**
 * User defined car type
 */
export interface Car {
  /**
   * Unique incremental ID
   */
  id: number;
  /**
   * Car name (user defined)
   */
  name: string;
}

/**
 * A model for the exported database
 */
export interface AutocompleteCar {
  id: string,
  /**
   * Model year
   */
  Year: number[],
  /**
   * Brand (BMW, Mercedes, Honda, Ferrari, etc.)
   */
  Make: string,
  /**
   * Model type (M2, E, Civic, F430)
   */
  Model: string,
  /**
   * E.g: Coupe / Sedan / etc.
   */
  Category: string,
}
