export interface ProjectDto {
    id: number;
    name?: string; // Opcional, si no siempre lo usas
    description?: string; // Opcional, si no siempre lo usas
  }
  
  export interface Activity {
    id?: number; // Opcional, ya que el backend usualmente asigna el ID
    name: string; // Nombre de la actividad
    label?: string; // Etiqueta generada automáticamente
    predecessors?: string; // Cadena de texto con los predecesores
    daysDuration: number; // Duración en días
    projectDto: ProjectDto; // Relación con el proyecto
  }
  