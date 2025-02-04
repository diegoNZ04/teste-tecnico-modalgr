import { Routes } from '@angular/router';
import { FormsRegisterComponent } from './components/forms-register/forms-register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/forms-register', pathMatch: 'full' },
  { path: 'forms-register', component: FormsRegisterComponent }
];
