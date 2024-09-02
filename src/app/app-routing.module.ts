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
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },  {
    path: 'construccion',
    loadChildren: () => import('./pages/construccion/construccion/construccion.module').then( m => m.ConstruccionPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'psicologia',
    loadChildren: () => import('./pages/servicios/psicologia/psicologia.module').then( m => m.PsicologiaPageModule)
  },
  {
    path: 'consultoria',
    loadChildren: () => import('./pages/servicios/consultoria/consultoria.module').then( m => m.ConsultoriaPageModule)
  },
  {
    path: 'convenios',
    loadChildren: () => import('./pages/convenios/convenios/convenios.module').then( m => m.ConveniosPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
