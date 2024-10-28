import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  { path: '', component: MainDashboardComponent }, // Ruta predeterminada
  // Aquí puedes agregar más rutas si es necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

