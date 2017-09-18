import { Injectable } from '@angular/core';
import { IEntity } from './entity.interface';
import { Patient } from '../models/patient';
import { PatientClinic } from '../models/patient-clinic';
import { LocalStorageService } from './local-storage.service';

import { patients } from '../data-mock/patient';

@Injectable()
export class PatientService implements IEntity {
  private patients: Patient[];
  private patientsClinic: PatientClinic[];
  readonly relationTable: string = 'patient-clinic';

  constructor(private localStorage: LocalStorageService) {
    this.patients = patients;
    this.patientsClinic = this.getRelationsToClinic();
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

  public linkToClinic(patientId: string, clinicId: string): Promise<PatientClinic[]> {
    this.patientsClinic = this.patientsClinic.filter(item => item.patientId !== patientId);
    this.patientsClinic.push({ patientId, clinicId });
    this.localStorage.write(this.relationTable, this.patientsClinic);
    return Promise.resolve(this.patientsClinic);
  }

  public getLinkedClinics(): PatientClinic[] {
    return this.patientsClinic;
  }

  public getEntity(id: string): any {
    const patients: Patient[] = this.patients.filter(item => item.id === id);
    return Promise.resolve(patients[0] || {});
  }

  public getRelationsToClinic(): PatientClinic[] {
    return this.localStorage.read(this.relationTable);
  }
}
