import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { AppRoutingModule } from './app.routes'; 
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AppComponent } from './app.component'; // Ahora solo se importa

@NgModule({
  declarations: [
    MainDashboardComponent // Solo declara componentes no standalone
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    // No necesitas incluir AppComponent aquí, ya que es standalone
  ],
  providers: [],
  bootstrap: [AppComponent] // Esto sigue igual
})
export class AppModule {}
