import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ClinicComponent } from './clinic/clinic.component';
import { TherapistComponent } from './therapist/therapist.component';
import { PatientComponent } from './patient/patient.component';
import { ClinicService } from './services/clinic.service';
import { TherapistService } from './services/therapist.service';
import { PatientService } from './services/patient.service';
import { TherapistDetailComponent } from './therapist/therapist-detail/therapist-detail.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ClinicComponent,
    TherapistComponent,
    PatientComponent,
    TherapistDetailComponent,
    PatientDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
  ],
  providers: [LocalStorageService, ClinicService, TherapistService, PatientService],
  bootstrap: [AppComponent],
})
export class AppModule { }
