export interface Reservation {
  id: number;
  boxId: number;
  specialistName: string;
  specialty: string;
  date: string; // formato YYYY-MM-DD
  timeSlot: string; // e.g., "09:00 - 10:00"
}