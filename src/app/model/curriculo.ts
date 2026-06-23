export class Curriculo {
  constructor(
    public id: number,
    public usuarioId: number,
    public titulo: string,
    public formacao: string,
    public experiencia: string,
    public habilidades: string,
    public linkedin: string,
  ) {}

  toMap(): { [key: string]: any } {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      titulo: this.titulo,
      formacao: this.formacao,
      experiencia: this.experiencia,
      habilidades: this.habilidades,
      linkedin: this.linkedin,
    };
  }

  fromMap(map: any): Curriculo {
    return new Curriculo(
      map.id,
      map.usuarioId,
      map.titulo,
      map.formacao,
      map.experiencia,
      map.habilidades,
      map.linkedin,
    );
  }
}
