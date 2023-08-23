import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginGuard } from './guards/login.guard';
import { dashboardGuard } from './guards/dashboard.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: '', component: HomeComponent, children: [
    {path: 'stats', component: StatsComponent, outlet: "info"},
    {path: 'logs', component: LogsComponent, outlet: "info"},
    {path: 'blogs', component: BlogsComponent, outlet: "info"}
  ]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [dashboardGuard], children: [
    {path: 'stats', component: StatsComponent, outlet: "info"},
    {path: 'logs', component: LogsComponent, outlet: "info"},
    {path: 'blogs', component: BlogsComponent, outlet: "info"}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
