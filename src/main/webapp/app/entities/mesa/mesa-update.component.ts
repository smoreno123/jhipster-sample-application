import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMesa, Mesa } from 'app/shared/model/mesa.model';
import { MesaService } from './mesa.service';

@Component({
  selector: 'jhi-mesa-update',
  templateUrl: './mesa-update.component.html'
})
export class MesaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    numMesa: [],
    capacidad: []
  });

  constructor(protected mesaService: MesaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mesa }) => {
      this.updateForm(mesa);
    });
  }

  updateForm(mesa: IMesa) {
    this.editForm.patchValue({
      id: mesa.id,
      numMesa: mesa.numMesa,
      capacidad: mesa.capacidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mesa = this.createFromForm();
    if (mesa.id !== undefined) {
      this.subscribeToSaveResponse(this.mesaService.update(mesa));
    } else {
      this.subscribeToSaveResponse(this.mesaService.create(mesa));
    }
  }

  private createFromForm(): IMesa {
    return {
      ...new Mesa(),
      id: this.editForm.get(['id']).value,
      numMesa: this.editForm.get(['numMesa']).value,
      capacidad: this.editForm.get(['capacidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMesa>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
