import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {

  public patients: Patient[];

  public showAddForm = false;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getAll();
  }

  public deletePatient(id: string): void {
    this.patientService.deleteEntity(id).then((clinics) => {
      this.patients = clinics;
    });
  }

  public addPatient(name: string): void {

    const patient: Patient = {
      name,
      id: Math.random().toString(36).substring(7),
    };

    this.patientService.addEntity(patient).then((clinics) => {
      this.patients = clinics;
      this.showAddForm = false;
    });
  }

}
