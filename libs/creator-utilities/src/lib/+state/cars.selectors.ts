import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CARS_FEATURE_KEY, carsAdapter, State } from './cars.reducer';
import { CarsEntity } from './cars.models';

// Lookup the 'Cars' feature state managed by NgRx
export const getCarsState = createFeatureSelector<State>(CARS_FEATURE_KEY);

const {selectAll, selectEntities} = carsAdapter.getSelectors();

export const getCarsLoaded = createSelector(
  getCarsState,
  (state: State) => state.loaded
);

export const getCarsError = createSelector(
  getCarsState,
  (state: State) => state.error
);

export const getAllCars = createSelector(getCarsState, (state: State) =>
  selectAll(state)
);

export const getCarsEntities = createSelector(getCarsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getCarsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCarsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);


export const getFilterCategory = createSelector(
  getCarsState,
  (state: State) => state.filterCategory
);

export const getFilterBrand = createSelector(
  getCarsState,
  (state: State) => state.filterBrand
);

export const getFilterModel = createSelector(
  getCarsState,
  (state: State) =>  state.filterModel
);

export const getFilterCategoryConverted = createSelector(
  getCarsState,
  (state: State) => state.filterCategory.toLowerCase()
);

export const getFilterBrandConverted = createSelector(
  getCarsState,
  (state: State) => state.filterBrand.toLowerCase()
);

export const getFilterModelConverted = createSelector(
  getCarsState,
  (state: State) =>  state.filterModel.toLowerCase()
);

export const getFilterYear = createSelector(
  getCarsState,
  (state: State): number => state.filterYear as number
);

/**
 * Trade memory for CPU
 */

const getCarsFilteredByCategory = createSelector(
  getAllCars,
  getFilterCategoryConverted,
  (cars: CarsEntity[], category: string) =>
    !category ? cars : cars.filter(car => car.Category.toLowerCase().includes(category))
);

const getCarsFilteredByCategoryBrand = createSelector(
  getCarsFilteredByCategory,
  getFilterBrandConverted,
  (cars: CarsEntity[], brand: string) =>
    !brand ? cars : cars.filter(car => car.Make.toLowerCase().includes(brand))
);

const getCarsFilteredByCategoryBrandModel = createSelector(
  getCarsFilteredByCategoryBrand,
  getFilterModelConverted,
  (cars: CarsEntity[], model: string) =>
    !model ? cars : cars.filter(car => car.Model.toLowerCase().includes(model))
);

/**
 * Returns a list with applied filters
 */
export const getFilteredCars = createSelector(
  getCarsFilteredByCategoryBrandModel,
  getFilterYear,
  (cars: CarsEntity[], year): CarsEntity[] =>
    cars
      .filter(car => year ? car.Year.includes(year) : true)
)

export const getCarCategories = createSelector(
  getAllCars,
  (cars) =>
    [
      ...new Set(
        cars.map(
          car =>
            // category contains terrible strings like: "Coupe, Wagon, SUV" as category, so we split them up:
            car.Category.split(',')
              // some shaving
              .map(car => car.trim())
          // I Love ES2019 without polyfills
        ).flat()
      )
    ].sort()
)

export const getFilteredCarBrands = createSelector(
  getCarsFilteredByCategory,
  (cars: CarsEntity[]): string[] => [...new Set(cars.map(car => car.Make))].sort()
)

export const getFilteredCarModels = createSelector(
  getCarsFilteredByCategoryBrand,
  (cars: CarsEntity[]): string[] => [...new Set(cars.map(car => car.Model))].sort()
)

export const getFilteredCarYears = createSelector(
  getCarsFilteredByCategoryBrandModel,
  (cars: CarsEntity[]): number[] => [...new Set(cars.map(car => car.Year))].flat().sort()
)
