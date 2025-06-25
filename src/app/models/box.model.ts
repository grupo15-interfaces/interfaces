export interface Box {
  id: number;
  name: string; // e.g., "Box 1 - Cardiología"
  specialty: string; // e.g., "Cardiología"
}

export interface BoxLog {
  boxId: number;
  observation: string;
  author: string;
  date: Date;
}