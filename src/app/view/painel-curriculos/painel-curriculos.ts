import { Component, OnInit } from '@angular/core';
import { Curriculo } from '../../model/curriculo.model';
import { CurriculoService } from '../../service/curriculo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel-curriculos',
  imports: [FormsModule, CommonModule],
  templateUrl: './painel-curriculos.html',
  styleUrl: './painel-curriculos.scss',
})
export class PainelCurriculosComponent implements OnInit {
  public curriculos: Curriculo[] = [];
  public curriculo: Curriculo = new Curriculo(0, 1, '', '', '', '', '');
  public usuarioId: number = 1; // Simulando usuário logado

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.listarCurriculosDoUsuario();
  }

  // Listar currículos
  listarCurriculosDoUsuario(): void {
    this.curriculoService.getCurriculosByUsuarioId(this.usuarioId).subscribe((dados: any) => {
      this.curriculos = dados.map((e: any) =>
        new Curriculo(e.id, e.usuarioId, e.titulo, e.formacao, e.experiencia, e.habilidades, e.linkedin)
      );
    });
  }

  // Selecionar um currículo pra editar
  selecionarCurriculo(curriculo: Curriculo): void {
    this.curriculo = new Curriculo(
      curriculo.id,
      curriculo.usuarioId,
      curriculo.titulo,
      curriculo.formacao,
      curriculo.experiencia,
      curriculo.habilidades,
      curriculo.linkedin
    );
  }

  // Limpar formulário (novo currículo)
  limparFormulario(): void {
    this.curriculo = new Curriculo(0, this.usuarioId, '', '', '', '', '');
  }

  // Salvar (criar ou atualizar)
  salvarCurriculo(): void {
    if (
      this.curriculo.titulo === '' ||
      this.curriculo.formacao === '' ||
      this.curriculo.experiencia === '' ||
      this.curriculo.habilidades === ''
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (this.curriculo.id === 0) {
      // Criar novo
      this.curriculo.usuarioId = this.usuarioId;
      this.curriculoService.postCurriculo(this.curriculo).subscribe(() => {
        alert('Currículo criado com sucesso!');
        this.limparFormulario();
        this.listarCurriculosDoUsuario();
      });
    } else {
      // Atualizar existente
      this.curriculoService.putCurriculo(this.curriculo.id, this.curriculo).subscribe(() => {
        alert('Currículo atualizado com sucesso!');
        this.limparFormulario();
        this.listarCurriculosDoUsuario();
      });
    }
  }

  // Deletar currículo
  deletarCurriculo(id: number): void {
    if (confirm('Tem certeza que quer deletar este currículo?')) {
      this.curriculoService.deleteCurriculo(id).subscribe(() => {
        alert('Currículo deletado com sucesso!');
        this.limparFormulario();
        this.listarCurriculosDoUsuario();
      });
    }
  }
}

