import { BasicRaceData, Track } from '@sim-utils/racing-model';

/**
 * Interface for the 'ExternalStorage' data
 */
export interface ExternalStorageEntity {
  id: number; // Primary ID
  track?: Track,
  state: BasicRaceData
}
