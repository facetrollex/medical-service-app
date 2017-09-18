import { Injectable } from '@angular/core';
import { IEntity } from './entity.interface';
import { Patient } from '../models/patient';

import { patients } from '../data-mock/patient';
import { PatientClinic } from '../models/patient-clinic';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class PatientService implements IEntity {
  public patients: Patient[];
  public patientsClinic: PatientClinic[];

  constructor(private localStorage: LocalStorageService) {
    this.patients = patients;
    this.patientsClinic = this.localStorage.read('patient-clinic');
  }

  public getAll(): Patient[] {
    return this.patients;
  }

  public deleteEntity(id: string): Promise<Patient[]> {
    this.patients = this.patients.filter(item => item.id !== id);
    return Promise.resolve(this.patients);
  }

  public addEntity(entity: Patient): Promise<Patient[]> {
    this.patients.push(entity);
    return Promise.resolve(this.patients);
  }

  public linkToClinic(patientId: string, clinicId: string) {
    this.patientsClinic = this.patientsClinic.filter(item => item.patientId !== patientId);
    this.patientsClinic.push({ patientId, clinicId });
    this.localStorage.write('patient-clinic', this.patientsClinic);
    return Promise.resolve(this.patientsClinic);
  }

  public getLinkedClinics(): PatientClinic[] {
    return this.patientsClinic;
  }

  public getEntity(id: string) {
    const patients: Patient[] = this.patients.filter(item => item.id === id);
    return Promise.resolve(patients[0] || {});
  }

  public getRelationsToClinic(): PatientClinic[] {
    return this.patientsClinic;
  }

}
