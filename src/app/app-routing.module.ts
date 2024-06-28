import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/pruebas/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/pruebas/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/pruebas/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
