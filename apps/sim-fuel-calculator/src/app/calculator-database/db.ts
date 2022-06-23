import Dexie, { Table } from 'dexie';
import { BasicRaceData } from '@sim-utils/racing-model';

export interface NamedCalculation extends BasicRaceData {
  id?: number;
  name: string;
}

export class CalculationDatabase extends Dexie {
  calculationList!: Table<NamedCalculation, number>;

  constructor() {
    super('sim-utils-database');
    this.version(1).stores({
        calculationList: '++id'
      }
    );
  }
}

export const DexieCalculationDatabase = new CalculationDatabase();
