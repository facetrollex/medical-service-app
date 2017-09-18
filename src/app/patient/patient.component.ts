import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { ClinicService } from '../services/clinic.service';
import { Clinic } from '../models/clinic';
import { PatientClinic } from '../models/patient-clinic';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
})
export class PatientComponent implements OnInit {
  public patients: Patient[];
  public clinics: Clinic[];
  public patientClinics: PatientClinic[];
  public showAddForm = false;

  constructor(private patientService: PatientService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getAll();
    this.clinics = this.clinicService.getAll();
    this.patientClinics = this.patientService.getLinkedClinics();
  }

  public deletePatient(id: string): void {
    this.patientService.deleteEntity(id).then((clinics) => {
      this.patients = clinics;
    });
  }

  public addPatient(name: string, clinic?: string): void {

    const patient: Patient = {
      name,
      id: Math.random().toString(36).substring(7),
    };

    if (clinic) {
      this.patientService.linkToClinic(patient.id, clinic).then((patientClinics) => {
        this.patientClinics = patientClinics;
      });
    }

    this.patientService.addEntity(patient).then((clinics) => {
      this.patients = clinics;
      this.showAddForm = false;
    });
  }

  public getRelatedClinicName(id: string): string {
    const relatedClinic: PatientClinic[] = this.patientClinics.filter(item => item.patientId === id);

    if (relatedClinic[0] && relatedClinic[0].clinicId) {
      const clinic: Clinic[] = this.clinics.filter(item => item.id === relatedClinic[0].clinicId);
      if (clinic[0]) {
        return clinic[0].name;
      }
    }
    return 'Not Selected';
  }

}
