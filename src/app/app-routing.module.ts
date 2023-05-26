import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
const routes: Routes = [
  {
    path: 'stats/jugadores',
    loadComponent: () =>
      import('./pages/jugadores/jugadores.component').then(
        (m) => m.JugadoresComponent
      ),
  },
  {
    path: 'mejores/jugadores',
    loadComponent: () =>
      import('./pages/mejores-jugadores/mejores-jugadores.component').then(
        (m) => m.MejoresJugadoresComponent
      ),
  },
  {
    path: 'stats/equipos',
    loadComponent: () =>
      import('./pages/equipos/equipos.component').then(
        (m) => m.EquiposComponent
      ),
  },
  {
    path: 'equipos/details',
    component: DetailsComponent,
  },
  {
    path: 'mejores/equipos',
    loadComponent: () =>
      import('./pages/mejores-equipos/mejores-equipos.component').then(
        (m) => m.MejoresEquiposComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },{
    path: '**',
    redirectTo:'/home'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
