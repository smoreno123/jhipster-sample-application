import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IValoracion } from 'app/shared/model/valoracion.model';

@Component({
  selector: 'jhi-valoracion-detail',
  templateUrl: './valoracion-detail.component.html'
})
export class ValoracionDetailComponent implements OnInit {
  valoracion: IValoracion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ valoracion }) => {
      this.valoracion = valoracion;
    });
  }

  previousState() {
    window.history.back();
  }
}
