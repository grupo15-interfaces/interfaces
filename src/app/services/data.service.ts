import { Injectable, signal } from '@angular/core';
import { Box, Reservation, BoxLog } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // --- DATOS MOCKEADOS (simulando la base de datos) ---
  boxes = signal<Box[]>([
    { id: 1, name: 'Box 101', specialty: 'Cardiología' },
    { id: 2, name: 'Box 102', specialty: 'Dermatología' },
    { id: 3, name: 'Box 103', specialty: 'Pediatría' },
    { id: 4, name: 'Box 201', specialty: 'Ginecología' },
    { id: 5, name: 'Box 202', specialty: 'Traumatología' },
    { id: 6, name: 'Box 203', specialty: 'Medicina General' },
  ]);

  reservations = signal<Reservation[]>([
    { id: 1, boxId: 1, specialistName: 'Dr. Juan Pérez', specialty: 'Cardiología', date: '2025-06-25', timeSlot: '09:00 - 10:00' },
    { id: 2, boxId: 3, specialistName: 'Dra. Ana Gómez', specialty: 'Pediatría', date: '2025-06-25', timeSlot: '11:00 - 12:00' },
  ]);

  boxLogs = signal<BoxLog[]>([]);

  private nextReservationId = signal(3);

  // --- MÉTODOS PARA RESERVAS (RF-02, RF-03, RF-04, RF-06) ---
  getReservations() {
    return this.reservations;
  }

  checkAvailability(boxId: number, date: string, timeSlot: string): boolean {
    const existing = this.reservations().find(
      r => r.boxId === boxId && r.date === date && r.timeSlot === timeSlot
    );
    return !existing;
  }

  addReservation(reservation: Omit<Reservation, 'id'>): Reservation | null {
    const box = this.boxes().find(b => b.id === reservation.boxId);
    // Validar coherencia entre especialidad del box y de la reserva
    if (box && box.specialty !== reservation.specialty) {
       console.error(`Conflicto de especialidad: El box es de ${box.specialty} y la reserva para ${reservation.specialty}`);
       // Aquí podrías usar el servicio de notificaciones
       return null;
    }

    if (!this.checkAvailability(reservation.boxId, reservation.date, reservation.timeSlot)) {
       console.error('Conflicto de horario: El box ya está reservado en esa fecha y hora.');
       return null;
    }
    
    const newReservation: Reservation = { ...reservation, id: this.nextReservationId() };
    this.reservations.update(reservations => [...reservations, newReservation]);
    this.nextReservationId.update(id => id + 1);
    return newReservation;
  }

  updateReservation(updatedReservation: Reservation): boolean {
    let found = false;
    this.reservations.update(reservations => {
      const index = reservations.findIndex(r => r.id === updatedReservation.id);
      if (index !== -1) {
        reservations[index] = updatedReservation;
        found = true;
      }
      return reservations;
    });
    return found;
  }

  deleteReservation(id: number): void {
    this.reservations.update(reservations => reservations.filter(r => r.id !== id));
  }

  // --- MÉTODOS PARA BITÁCORA (RF-11) ---
  addBoxLog(log: Omit<BoxLog, 'date'>) {
    const newLog: BoxLog = { ...log, date: new Date() };
    this.boxLogs.update(logs => [...logs, newLog]);
  }

  getLogsForBox(boxId: number) {
    return this.boxLogs().filter(log => log.boxId === boxId);
  }
}