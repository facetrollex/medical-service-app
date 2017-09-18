import { Injectable } from '@angular/core';
import { IEntity } from './entity.interface';
import { Patient } from '../models/patient';

import { patients } from '../data-mock/patient';

@Injectable()
export class PatientService implements IEntity {
  public patients: Patient[];

  constructor() {
    this.patients = patients;
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

}
