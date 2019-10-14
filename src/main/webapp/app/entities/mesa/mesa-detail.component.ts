import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMesa } from 'app/shared/model/mesa.model';

@Component({
  selector: 'jhi-mesa-detail',
  templateUrl: './mesa-detail.component.html'
})
export class MesaDetailComponent implements OnInit {
  mesa: IMesa;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mesa }) => {
      this.mesa = mesa;
    });
  }

  previousState() {
    window.history.back();
  }
}
