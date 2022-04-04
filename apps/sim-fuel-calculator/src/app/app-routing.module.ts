import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuelCalculatorPageComponent } from './pages';
import { MyGarageComponent } from './pages/my-garage/my-garage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/calculator',
    pathMatch: 'full'
  },
  {
    path: 'calculator',
    component: FuelCalculatorPageComponent
  },
  {
    path: 'sim-garage',
    component: MyGarageComponent
  },
  {
    path: '*',
    component: FuelCalculatorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
