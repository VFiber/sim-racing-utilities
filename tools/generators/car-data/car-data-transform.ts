import { AutocompleteCar } from '../../../libs/racing-model/src';
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');

interface RawCar {
  objectId: string,
  Year: number,
  Make: string,
  Model: string,
  Category: string,
  createdAt: string,
  updatedAt: string
}

let importedCars: RawCar[] = JSON.parse(fs.readFileSync('cars-raw.json'));
let assortedCars: AutocompleteCar[] = [];

const findIdenticals =
  (car1: { Category: string, Make: string, Model: string }) =>
    (car2: { Category: string, Make: string, Model: string }) =>
      car2.Category === car1.Category && car2.Make === car1.Make && car2.Model === car1.Model;

if (importedCars && Array.isArray(importedCars)) {
  let cars = importedCars
    .map(
      car => ({
        id: car.objectId,
        Year: car.Year,
        Make: car.Make,
        Model: car.Model,
        Category: car.Category
      })
    );

  cars.forEach(function (car) {
      const found = assortedCars.findIndex(findIdenticals(car));

      if (found !== -1) {
        return;
      }

      assortedCars.push(
        {
          ...car,
          Year: cars
            .filter(findIdenticals(car))
            .map(c => c.Year)
            .sort()
        }
      )
    }
  );

  assortedCars = assortedCars.sort(
    (first, second) => {
      if (first.Make < second.Make) return -1;
      if (first.Make > second.Make) return 1;

      if (first.Model < second.Model) return -1;
      if (first.Model > second.Model) return 1;

      return 0;
    }
  );
}

fs.writeFile('cleared-cars.json',
  JSON.stringify(assortedCars),
  (err: ErrnoException | null) => {
    if (err) {
      console.error(err)
    }
  }
);
