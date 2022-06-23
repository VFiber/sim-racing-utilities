import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarsActions, CarsSelectors } from '../../+state';
import { map, Observable, tap } from 'rxjs';
import { CarsEntity } from './../../+state/cars.models';
import { AutocompleteCar } from '@sim-utils/racing-model';
import { MatSnackBar } from '@angular/material/snack-bar';

const maxFilter = (items: any[]) => items.length > 100 ? [] : items;

@Component({
  selector: 'sim-utils-create-car',
  template: `
    <mat-card class="create-form">
      <mat-card-title>Create car</mat-card-title>
      <mat-card-content>
        <mat-form-field fxFlex fxFlexFill>
          <mat-label>Car name</mat-label>
          <input type="search" [(ngModel)]="carName" matInput>
          <mat-hint>Car name that you recognize (you can edit later)</mat-hint>
          <button matSuffix mat-flat-button color="primary">Create</button>
        </mat-form-field>
      </mat-card-content>
      <mat-card-footer align="end">
        <button *ngIf="!showSearchForm" mat-button (click)="showSearchForm = true;" color="accent">Find in database</button>
        <button *ngIf="showSearchForm" mat-button (click)="showSearchForm = false;">Close database</button>
      </mat-card-footer>
    </mat-card>

    <h4>Car database</h4>
    <div
      gdAreas.lt-md="forms | list"
      gdColumns.lt-md="100%"
      gdAreas="forms list"
      gdColumns="25% auto"
      gdGap="1em"
      class="searcharea"
      *ngIf="showSearchForm"
    >
      <div gdArea="forms" fxLayout="column" fxLayoutGap="1em">
        <mat-form-field>
          <mat-label>Car category</mat-label>
          <mat-select (valueChange)="setCategory($event)" [value]="selectedCategory$ | ngrxPush">
            <mat-option value="">-- Clear category filter --</mat-option>
            <mat-option *ngFor="let category of carCategories$ | ngrxPush" [value]="category">{{category}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Car brand</mat-label>
          <mat-select (valueChange)="setBrand($event)" [value]="selectedBrand$ | ngrxPush">
            <mat-option value="">-- Clear brand filter --</mat-option>
            <mat-option *ngFor="let brand of carBrands$ | ngrxPush" [value]="brand">{{brand}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Car model</mat-label>
          <mat-select (valueChange)="setModel($event)" [value]="selectedModel$ | ngrxPush">
            <mat-option *ngIf="(carModels$ | ngrxPush)!.length === 0" disabled>- Too many models please use brand filter
              first -
            </mat-option>
            <mat-option value="">-- Clear model filter --</mat-option>
            <mat-option *ngFor="let model of carModels$ | ngrxPush" [value]="model">{{model}}</mat-option>
          </mat-select>
          <mat-hint *ngIf="(carModels$ | ngrxPush)!.length === 0">Too many models, please select brand</mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Model year</mat-label>
          <mat-select (valueChange)="setYear($event)" [value]="selectedYear$ | ngrxPush">
            <mat-option *ngIf="(carModels$ | ngrxPush)!.length === 0" disabled>- Too many years please use model filter
              first -
            </mat-option>
            <mat-option value="0">-- Clear model year filter --</mat-option>
            <mat-option *ngFor="let model of carYears$ | ngrxPush" [value]="model">{{model}}</mat-option>
          </mat-select>
          <mat-hint *ngIf="(carYears$ | ngrxPush)!.length === 0">Too many models years, please select brand / model
          </mat-hint>
        </mat-form-field>
      </div>
      <div gdArea="list">
        <p *ngIf="(cars$ | ngrxPush)!.length > 0 && filteredCarCount < 200">
          <ng-container *ngIf="filteredCarCount > 200"> Too many cars to display please use the filter.</ng-container>
        </p>
        <ng-container *ngIf="(cars$ | ngrxPush)!.length > 0 && filteredCarCount < 200">
          <table mat-table [dataSource]="(cars$ | ngrxPush)!">
            <!-- Position Column -->
            <ng-container matColumnDef="Model">
              <th mat-header-cell *matHeaderCellDef>Model</th>
              <td mat-cell *matCellDef="let element">
                <button mat-flat-button (click)="useCar(element)"
                        matTooltip="Set car name: {{element.Make}} {{element.Model}}"
                        matTooltipPosition="left">{{element.Make}} {{element.Model}}</button>
              </td>
            </ng-container>

            <ng-container matColumnDef="Year">
              <th mat-header-cell *matHeaderCellDef>Model years</th>
              <td mat-cell *matCellDef="let element">
                <ng-container *ngFor="let year of element.Year">
                  <a [class.highlight]="selectedYear === year" href="javascript:void(0)" (click)="useCar(element, year)"
                     matTooltip="Set car name: {{element.Make}} {{element.Model}} ({{year}})">{{year}}</a>
                </ng-container>
              </td>
            </ng-container>

            <ng-container matColumnDef="Category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let element">{{element.Category}}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent {
  showSearchForm = false;
  displayedColumns: string[] = ['Model', 'Year', 'Category'];

  selectedYear = 0;
  carName = '';
  cars$: Observable<CarsEntity[]> = this.store.select(CarsSelectors.getFilteredCars)
    .pipe(
      tap(cars => this.filteredCarCount = cars.length),
      map(cars => cars.slice(0, 100))
    );

  filteredCarCount = 0;

  carCategories$ = this.store.select(CarsSelectors.getCarCategories);
  carBrands$ = this.store.select(CarsSelectors.getFilteredCarBrands)
    .pipe(map(maxFilter));

  carModels$ = this.store.select(CarsSelectors.getFilteredCarModels)
    .pipe(map(maxFilter));

  carYears$ = this.store.select(CarsSelectors.getFilteredCarYears)
    .pipe(map(maxFilter));

  selectedCategory$: Observable<string> = this.store.select(CarsSelectors.getFilterCategory);
  selectedBrand$: Observable<string> = this.store.select(CarsSelectors.getFilterBrand);
  selectedModel$: Observable<string> = this.store.select(CarsSelectors.getFilterModel);
  selectedYear$: Observable<number> = this.store.select(CarsSelectors.getFilterYear)
    .pipe(tap((year) => this.selectedYear = year));

  constructor(private store: Store, private snackBar: MatSnackBar) {
    this.store.dispatch(CarsActions.init());
  }

  setCategory(category: string) {
    this.store.dispatch(CarsActions.categoryFilterAdded({filterCategory: category}))
    this.setBrand('');
  }

  setBrand(brand: string) {
    this.store.dispatch(CarsActions.brandFilterAdded({filterBrand: brand}))
    this.setModel('');
    //FIXME: selected meg egyéb szarokat beállítgatni
  }

  setModel(model: string) {
    this.store.dispatch(CarsActions.modelFilterAdded({filterModel: model}))
    this.setYear(0);
  }

  setYear(year: number) {
    this.store.dispatch(CarsActions.yearFilterAdded({filterYear: year}))
  }

  useCar(car: AutocompleteCar, year: number = 0) {
    if (year) {
      this.carName = car.Make + " " + car.Model + ` (${year})`
      return this.notifyUser();
    }

    this.carName = car.Make + " " + car.Model

    this.notifyUser();
  }

  private notifyUser() {
    this.snackBar.open(this.carName + " has been set.", "Close search", {duration: 5000})
      .onAction()
      .pipe()
      .subscribe(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.showSearchForm = false;
      });
  }
}
