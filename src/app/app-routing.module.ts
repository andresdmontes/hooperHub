import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { MejoresJugadoresComponent } from './pages/mejores-jugadores/mejores-jugadores.component';
import { MejoresEquiposComponent } from './pages/mejores-equipos/mejores-equipos.component';

const routes: Routes = [
  { path: 'stats/jugadores', component: JugadoresComponent },
  { path: 'mejores/jugadores', component: MejoresJugadoresComponent },
  { path: 'stats/equipos', component: EquiposComponent },
  { path: 'mejores/equipos', component: MejoresEquiposComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
