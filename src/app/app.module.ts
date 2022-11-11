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
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { ticketListComponent } from './components/ticket-list/ticket-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectDialogComponent } from './components/project-managment/project-dialog/project-dialog.component';
import { TicketDialogComponent } from './components/ticket-list/ticket-dialog/ticket-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './common/services/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    ProjectManagmentComponent,
    ProjectDetailComponent,
    ProjectCardComponent,
    ticketListComponent,
    TicketDetailComponent,
    ProjectDialogComponent,
    TicketDialogComponent,
    LoginComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    MatSliderModule,
    AngularFirestoreModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatNativeDateModule,
    OverlayModule,
    MatDatepickerModule,
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    MatBadgeModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatGridListModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
