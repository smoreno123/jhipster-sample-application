import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';

@Component({
  selector: 'jhi-tipo-cocina-detail',
  templateUrl: './tipo-cocina-detail.component.html'
})
export class TipoCocinaDetailComponent implements OnInit {
  tipoCocina: ITipoCocina;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoCocina }) => {
      this.tipoCocina = tipoCocina;
    });
  }

  previousState() {
    window.history.back();
  }
}
