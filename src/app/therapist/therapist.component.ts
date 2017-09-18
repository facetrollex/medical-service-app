import { Component, OnInit } from '@angular/core';
import { Therapist } from '../models/therapist';
import { TherapistService } from '../services/therapist.service';
import { ClinicService } from '../services/clinic.service';
import { Clinic } from '../models/clinic';
import { TherapistClinic } from '../models/therapist-clinic';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
})
export class TherapistComponent implements OnInit {

  public therapists: Therapist[];
  public clinics: Clinic[];
  public therapistClinic: TherapistClinic[];

  public showAddForm = false;

  constructor(private therapistService: TherapistService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.therapists = this.therapistService.getAll();
    this.clinics = this.clinicService.getAll();
    this.therapistClinic = this.therapistService.getRelationsToClinic();
  }

  public deleteTherapist(id: string): void {
    this.therapistService.deleteEntity(id).then((clinics) => {
      this.therapists = clinics;
    });
  }

  public addTherapist(name: string, position: string, clinic?: string): void {

    const therapist: Therapist = {
      position,
      name,
      id: Math.random().toString(36).substring(7),
    };

    if (clinic) {
      this.therapistService.linkToClinic(therapist.id, clinic).then((therapistClinic) => {
        this.therapistClinic = therapistClinic;
      });
    }

    this.therapistService.addEntity(therapist).then((therapists) => {
      this.therapists = therapists;
      this.showAddForm = false;
    });
  }

  public getRelatedClinicName(id: string): string {
    const relatedClinic: TherapistClinic[] = this.therapistClinic.filter(item => item.therapistId === id);

    if (relatedClinic[0] && relatedClinic[0].clinicId) {
      const clinic: Clinic[] = this.clinics.filter(item => item.id === relatedClinic[0].clinicId);
      if (clinic[0]) {
        return clinic[0].name;
      }
    }

    return 'Not Selected';
  }

}
