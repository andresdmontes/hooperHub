import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { EquiposComponent } from './pages/equipos/equipos.component';

const routes: Routes = [
  { path: 'stats/jugadores', component: JugadoresComponent },
  { path: 'stats/equipos', component: EquiposComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
