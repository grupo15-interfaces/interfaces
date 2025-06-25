export type UserRole = 'Administrador de Boxes' | 'Coordinador de Boxes';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}