import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { HeroesListComponent } from './core/components/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'heroes', component: HeroesListComponent },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./core/detail/detail.module').then((m) => m.DetailModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
