import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIngrediente } from 'app/shared/model/ingrediente.model';

@Component({
  selector: 'jhi-ingrediente-detail',
  templateUrl: './ingrediente-detail.component.html'
})
export class IngredienteDetailComponent implements OnInit {
  ingrediente: IIngrediente;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ingrediente }) => {
      this.ingrediente = ingrediente;
    });
  }

  previousState() {
    window.history.back();
  }
}
