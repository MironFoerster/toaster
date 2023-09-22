import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service';
import { ModalService } from './services/modal.service';

import { TokenInterceptor } from './token.interceptor';
import { UrlInterceptor } from './url.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestsComponent } from './quests/quests.component';
import { NewItemComponent } from './new-item/new-item.component';
import { KillValComponent } from './kill-val/kill-val.component';
import { BanVoteComponent } from './ban-vote/ban-vote.component';
import { QuestComponent } from './quest/quest.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { UnreadLogsComponent } from './unread-logs/unread-logs.component';
import { LogCardComponent } from './log-card/log-card.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StatsComponent,
    LogsComponent,
    BlogsComponent,
    DashboardComponent,
    QuestsComponent,
    NewItemComponent,
    KillValComponent,
    BanVoteComponent,
    QuestComponent,
    ConfirmModalComponent,
    UnreadLogsComponent,
    LogCardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [AuthService, ApiService, ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
