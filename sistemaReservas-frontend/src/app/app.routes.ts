import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [

    { path: '', redirectTo: 'pages/room', pathMatch: 'full'},   
   
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.routes').then(x => x.pagesRoutes)
  }

];
