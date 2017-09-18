import { Injectable } from '@angular/core';
import { IEntity } from './entity.interface';
import { LocalStorageService } from './local-storage.service';
import { Therapist } from '../models/therapist';
import { TherapistClinic } from '../models/therapist-clinic';

import { therapists } from '../data-mock/therapist';

@Injectable()
export class TherapistService implements IEntity {
  public therapists: Therapist[];
  public therapistsClinics: TherapistClinic[];
  readonly relationTable: string = 'therapist-clinic';

  constructor(private localStorage: LocalStorageService) {
    this.therapists = therapists;
    this.therapistsClinics = this.getRelationsToClinic();
  }

  public getAll(): Therapist[] {
    return this.therapists;
  }

  public deleteEntity(id: string): Promise<Therapist[]> {
    this.therapists = this.therapists.filter(item => item.id !== id);
    return Promise.resolve(this.therapists);
  }

  public addEntity(entity: Therapist): Promise<Therapist[]> {
    this.therapists.push(entity);
    return Promise.resolve(this.therapists);
  }

  public getEntity(id: string): any {
    const therapists: Therapist[] = this.therapists.filter(item => item.id === id);
    return Promise.resolve(therapists[0] || {});
  }

  public linkToClinic(therapistId: string, clinicId: string): Promise<TherapistClinic[]> {
    let therapistClinic: TherapistClinic[] = this.localStorage.read(this.relationTable);
    therapistClinic = therapistClinic.filter(item => item.therapistId !== therapistId);
    therapistClinic.push({ therapistId, clinicId });
    this.localStorage.write(this.relationTable, therapistClinic);
    return Promise.resolve(therapistClinic);
  }

  public getRelationsToClinic(): TherapistClinic[] {
    return this.localStorage.read(this.relationTable);
  }
}
