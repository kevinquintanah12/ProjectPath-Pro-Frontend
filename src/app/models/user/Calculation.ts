// calculation.model.ts
export interface Calculation {
  id: number;
  criticalPath: string;
  estimatedDuration: number;
  projectId: number;  // Relacionado con el id del proyecto
}
  