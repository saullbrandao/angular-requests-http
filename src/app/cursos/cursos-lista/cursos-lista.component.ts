import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]> = new Observable();

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursos$ = this.cursosService.list();
  }
}
