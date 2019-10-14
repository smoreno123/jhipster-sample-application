import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComensal } from 'app/shared/model/comensal.model';

@Component({
  selector: 'jhi-comensal-detail',
  templateUrl: './comensal-detail.component.html'
})
export class ComensalDetailComponent implements OnInit {
  comensal: IComensal;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ comensal }) => {
      this.comensal = comensal;
    });
  }

  previousState() {
    window.history.back();
  }
}
