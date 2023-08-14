import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, UserCardComponent, UsersDashboardComponent, UserFormComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule, StoreModule.forRoot({}, {}), EffectsModule.forRoot([])],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
