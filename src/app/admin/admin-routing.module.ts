import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../guards/auth.guard';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NavComponent} from './dashboard/nav/nav.component';
import {RolGuard} from '../guards/rol.guard';

const routes: Routes = [{
  path: '',
  component: NavComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {

      path: 'bienes',
      loadChildren: () => {
        return import('./estates/estates.module')
          .then(m => m.EstatesModule);
      },
    },
    {
      canActivate: [RolGuard],
      path: 'marcas',
      loadChildren: () => {
        return import('./tab-mantenimiento/marks/mark.module')
          .then(m => m.MarkModule);
      },
    },
    {
      canActivate: [RolGuard],
      path: 'modelos',
      loadChildren: () => {
        return import('./tab-mantenimiento/marks-models/marks-models.module')
          .then(m => m.MarksModelsModule);
      },
    },
    {
      canActivate: [RolGuard],
      path: 'subcategorias',
      loadChildren: () => {
        return import('./tab-mantenimiento/sub-categorys/sub-categorys.module')
          .then(m => m.SubCategorysModule);
      },
    },
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
