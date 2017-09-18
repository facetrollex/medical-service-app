import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Clinic } from '../../models/clinic';
import { TherapistService } from '../../services/therapist.service';
import { ClinicService } from '../../services/clinic.service';
import { Therapist } from '../../models/therapist';
import { TherapistClinic } from '../../models/therapist-clinic';

@Component({
  selector: 'app-therapist-detail',
  templateUrl: './therapist-detail.component.html',
  styleUrls: ['./therapist-detail.component.scss'],
})
export class TherapistDetailComponent implements OnInit {

  public clinics: Clinic[];

  public therapist: any;

  public therapistClinicId: string;

  constructor(private therapistService: TherapistService,
              private clinicService: ClinicService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.clinics = this.clinicService.getAll();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.therapistService.getEntity(params.get('id')))
      .subscribe(therapist => this.therapist = <Therapist>therapist);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.getRelatedClinicId(params.get('id')))
      .subscribe(relatedClinicId => this.therapistClinicId = relatedClinicId);
  }

  public goBack(): void {
    this.location.back();
  }

  private getRelatedClinicId(therapistId: string): Promise<string> {
    const therapistClinic: TherapistClinic[] = this.therapistService.getRelationsToClinic();

    const relatedClinic: TherapistClinic[] = therapistClinic.filter(item => item.therapistId === therapistId);

    return Promise.resolve(relatedClinic[0] && relatedClinic[0].clinicId ? relatedClinic[0].clinicId : '');
  }

  // Because we have two-ways binding we dont need to re-save therapist model.
  public linkToClinic(): void {
    this.therapistService.linkToClinic(this.therapist.id, this.therapistClinicId);
  }

}
