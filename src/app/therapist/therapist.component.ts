import { Component, OnInit } from '@angular/core';
import { Therapist } from '../models/therapist';
import { TherapistService } from '../services/therapist.service';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss'],
})
export class TherapistComponent implements OnInit {

  public therapists: Therapist[];

  public showAddForm = false;

  constructor(private therapistService: TherapistService) { }

  ngOnInit(): void {
    this.therapists = this.therapistService.getAll();
  }

  public deleteTherapist(id: string): void {
    this.therapistService.deleteEntity(id).then((clinics) => {
      this.therapists = clinics;
    });
  }

  public addTherapist(therapistName: string, position: string): void {

    const therapist: Therapist = {
      position,
      id: Math.random().toString(36).substring(7),
      name: therapistName,
    };

    this.therapistService.addEntity(therapist).then((therapists) => {
      this.therapists = therapists;
      this.showAddForm = false;
    });
  }
}
