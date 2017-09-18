import { Injectable } from '@angular/core';
import { IEntity } from './entity.interface';
import { Therapist } from '../models/therapist';

import { therapists } from '../data-mock/therapist';

@Injectable()
export class TherapistService implements IEntity {
  public therapists: Therapist[];

  constructor() {
    this.therapists = therapists;
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

}
