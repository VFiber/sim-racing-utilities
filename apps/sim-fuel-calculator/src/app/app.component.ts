import { Component } from '@angular/core';

@Component({
  selector: 'sim-utils-root',
  template: `
    <div class="container mx-auto md:p-4" [class.mat-dark]="preferredModeIsDark">
      <sim-utils-fuel-calculator-page></sim-utils-fuel-calculator-page>
    </div>
    <footer
      class="container mx-auto my-1 bg-gray-50 dark:bg-gray-900 p-4 md:border-none border dark:border-gray-700 rounded">
      <div class="m-auto mt-0 mb-0 grid grid-cols-3 md:grid-cols-4 w-full md:w-1/2 lg:w-1/2 2xl:w-1/4">
        <div>
            <img class="float-right mr-4" alt="Sim racing utilities - Fuel calculator" src="assets/icons/icon-72x72.png">
        </div>
        <div class="col-span-2 md:col-span-3 flex flex-col place-content-center">
        <span class="signature">
          SimRacing fuel calculator
          <span class="text-xs underline decoration-indigo-500/30">v0.4.0</span> by
          <a class="underline" href="https://github.com/VFiber/sim-racing-utilities" target="_blank">Fiber</a>
      </span>
      <span class="text-left">
        <ng-container *ngIf="preferredModeIsDark">Dark mode detected</ng-container>
        <ng-container *ngIf="!preferredModeIsDark">Light mode detected</ng-container>
      </span>
        </div>
      </div>
    </footer>
  `
})
export class AppComponent {
  preferredModeIsDark = matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}
