import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources/resources.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:code', component: ResourceDetailComponent },
  { path: 'resources', component: ResourcesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

