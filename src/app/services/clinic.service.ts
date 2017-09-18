import { Injectable } from '@angular/core';

import { clinics } from '../data-mock/clinic';
import { Clinic } from '../models/clinic';
import { IEntity } from './entity.interface';

@Injectable()
export class ClinicService implements IEntity {
  private clinics: Clinic[];

  constructor() {
    this.clinics = clinics;
  }

  public getAll(): Clinic[] {
    return this.clinics;
  }

  public deleteEntity(id: string): Promise<Clinic[]> {
    this.clinics = this.clinics.filter(item => item.id !== id);
    return Promise.resolve(this.clinics);
  }

  public addEntity(entity: Clinic): Promise<Clinic[]> {
    this.clinics.push(entity);
    return Promise.resolve(this.clinics);
  }

}
