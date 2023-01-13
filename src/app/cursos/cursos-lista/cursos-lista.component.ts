import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]> = new Observable();

  constructor(
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
}
