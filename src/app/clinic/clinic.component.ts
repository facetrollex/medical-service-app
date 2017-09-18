import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../services/clinic.service';
import { Clinic } from '../models/clinic';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
})
export class ClinicComponent implements OnInit {

  public clinics: Clinic[];

  public showAddForm = false;

  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinics = this.clinicService.getAll();
  }

  public deleteClinic(id: string): void {
    this.clinicService.deleteEntity(id).then((clinics) => {
      this.clinics = clinics;
    });
  }

  public addClinic(clinicName: string): void {

    const clinic: Clinic = {
      id: Math.random().toString(36).substring(7),
      name: clinicName,
    };

    this.clinicService.addEntity(clinic).then((clinics) => {
      this.clinics = clinics;
      this.showAddForm = false;
    });
  }

}
