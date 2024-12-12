import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { AppRoutingModule } from './app.routes'; 
import { AppComponent } from './app.component';  // Solo importado, no declarado
import { LoginComponent } from './login/login.component';  // Solo importado, no declarado
import { RegisterComponent } from './register/register.component';  // Solo importado, no declarado
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearproyectoComponent } from './crearproyecto/crearproyecto.component';  // Solo importado, no declarado
import { CrearDesdeCeroComponent } from './creardesdecero/creardesdecero.component';
import { CrearConArchivoComponent } from './crearconarchivo/crearconarchivo.component';
import { DashboardcpmComponent } from './dashboardcpm/dashboardcpm.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa el módulo
import { MatIconModule } from '@angular/material/icon';
import { VisualizarproyectosComponent } from './visualizarproyectos/visualizarproyectos.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { CrearactividadesComponent } from './crearactividades/crearactividades.component';

@NgModule({

  declarations: [
    RegisterComponent // Aquí, en 'declarations'
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponent,  // Importar directamente como standalone
    LoginComponent, // Importar directamente como standalone
    CrearproyectoComponent,
    CrearDesdeCeroComponent,
    CrearConArchivoComponent,
    DashboardcpmComponent,
    MatSidenavModule,
    MatIconModule,
    VisualizarproyectosComponent,
    CrearactividadesComponent
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    provideAnimationsAsync()
    
  ],
  bootstrap: [AppComponent, ] // El componente standalone sigue siendo bootstrap
})
export class AppModule {}
