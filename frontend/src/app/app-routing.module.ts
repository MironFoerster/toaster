import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestsComponent } from './quests/quests.component';
import { NewItemComponent } from './new-item/new-item.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: '', component: HomeComponent, canActivate: [authGuard], children: [
    {path: 'stats', component: StatsComponent},
    {path: '', component: LogsComponent},
    {path: 'blogs', component: BlogsComponent}
  ]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
    {path: 'quests', component: QuestsComponent},
    {path: 'newitem', component: NewItemComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
