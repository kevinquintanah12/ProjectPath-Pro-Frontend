import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Asegúrate de que la ruta sea correcta
import { SeccionInicioComponent } from './seccion-inicio/seccion-inicio.component'; // Asegúrate de que la ruta sea correcta
import { RegisterComponent } from './register/register.component';  // Solo importado, no declarado
import { CrearproyectoComponent } from './crearproyecto/crearproyecto.component';  // Solo importado, no declarado
import { CrearDesdeCeroComponent } from './creardesdecero/creardesdecero.component';
import { SeccionCrearComponent } from './seccion-crear/seccion-crear.component';
import { CrearConArchivoComponent } from './crearconarchivo/crearconarchivo.component';
import { DashboardcpmComponent } from './dashboardcpm/dashboardcpm.component';
import { VisualizarproyectosComponent } from './visualizarproyectos/visualizarproyectos.component';
import { CrearactividadesComponent } from './crearactividades/crearactividades.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige a la sección de inicio si la ruta está vacía
  { path: 'inicio', component: SeccionInicioComponent }, // Ruta para el componente de inicio
  { path: 'login', component: LoginComponent }, // Ruta para el componente de inicio de sesión

  { path: 'register', component: RegisterComponent }, // Ruta para el componente de inicio de sesión
  { path: 'seccioncrear', component: SeccionCrearComponent }, // Ruta para el componente de inicio de sesión

  { path: 'crear', component: CrearproyectoComponent }, // Ruta para el componente de inicio de sesión
  { path: 'creardesdecero', component: CrearDesdeCeroComponent }, // Ruta para el componente de inicio de sesión
  { path: 'crearconarchivo', component: CrearConArchivoComponent }, // Ruta para el componente de inicio de sesión
  { path: 'dashboard', component: DashboardcpmComponent }, // Ruta para el componente de inicio de sesión
  { path: 'seccionvisualizar', component: VisualizarproyectosComponent }, // Ruta para el componente de inicio de sesión
  { path: 'crearactividades', component: CrearactividadesComponent }, // Ruta para el componente de inicio de sesión


];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura el RouterModule con las rutas
  exports: [RouterModule] // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule {}
