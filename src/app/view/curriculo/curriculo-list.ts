import { Component, OnInit } from '@angular/core';
import { Curriculo } from '../../model/curriculo';
import { CurriculoService } from '../../service/curriculo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curriculo-list',
  imports: [CommonModule],
  templateUrl: './curriculo-list.html',
  styleUrl: './curriculo-list.scss',
})
export class CurriculoListComponent implements OnInit {
  public curriculos: Curriculo[] = [];

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarTodosCurriculos();
  }

  // Listar TODOS os currículos (tipo /vagas)
  listarTodosCurriculos(): void {
    this.curriculoService.getTodosCurriculos().subscribe((dados: any) => {
      this.curriculos = dados.map((e: any) =>
        new Curriculo(e.id, e.usuarioId, e.titulo, e.formacao, e.experiencia, e.habilidades, e.linkedin)
      );
    });
  }
}
