import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClinicService } from '../../services/clinic.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Clinic } from '../../models/clinic';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { PatientClinic } from '../../models/patient-clinic';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
})
export class PatientDetailsComponent implements OnInit {

  public clinics: Clinic[];

  public patient: any;

  public patientClinicId: string;

  constructor(private patientService: PatientService,
              private clinicService: ClinicService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.clinics = this.clinicService.getAll();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.patientService.getEntity(params.get('id')))
      .subscribe(patient => this.patient = <Patient>patient);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.getRelatedClinicId(params.get('id')))
      .subscribe(relatedClinicId => this.patientClinicId = relatedClinicId);
  }

  public goBack(): void {
    this.location.back();
  }

  private getRelatedClinicId(therapistId: string): Promise<string> {
    const patientClinic: PatientClinic[] = this.patientService.getRelationsToClinic();

    const relatedClinic: PatientClinic[] = patientClinic.filter(item => item.patientId === therapistId);

    return Promise.resolve(relatedClinic[0] && relatedClinic[0].clinicId ? relatedClinic[0].clinicId : '');
  }

  // Because we have two-ways binding we don't need to re-save therapist model.
  public linkToClinic(): void {
    this.patientService.linkToClinic(this.patient.id, this.patientClinicId);
  }

}
