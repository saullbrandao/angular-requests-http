import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private modal: AlertModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  hasError(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.touched && field?.errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.cursosService.create(this.form.value).subscribe({
        next: () => {
          this.modal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
        },
        error: () =>
          this.modal.showAlertDanger('Erro ao criar o curso, tente novamente.'),
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('Cancel');
  }
}
