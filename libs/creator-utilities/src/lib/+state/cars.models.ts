/**
 * Interface for the 'Cars' data
 */
import { AutocompleteCar } from '@sim-utils/racing-model';

export interface CarsEntity extends AutocompleteCar {
  id: string; // Primary ID
}
