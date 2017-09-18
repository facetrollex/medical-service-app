import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '../not-found/not-found.component';
import { HomeComponent } from '../home/home.component';
import { ClinicComponent } from '../clinic/clinic.component';
import { TherapistComponent } from '../therapist/therapist.component';
import { PatientComponent } from '../patient/patient.component';
import { TherapistDetailComponent } from '../therapist/therapist-detail/therapist-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '404', component: NotFoundComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clinic', component: ClinicComponent },
  { path: 'therapist', component: TherapistComponent },
  { path: 'therapist/:id', component: TherapistDetailComponent },
  { path: 'patient', component: PatientComponent },
  { path: '**',  redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
