import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProjectDetailComponent } from './components/project-managment/project-detail/project-detail.component';
import { ProjectCardComponent } from './components/project-managment/project-card/project-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectManagmentComponent,
    ProjectDetailComponent,
    ProjectCardComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    MatSliderModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
