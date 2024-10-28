import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';  // Asegúrate de que está apuntando al archivo correcto

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
