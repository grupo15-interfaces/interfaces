import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { Reservation, Box } from '../../../models';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation-management.component.html',
  styleUrl: './reservation-management.component.css'
})
export class ReservationManagementComponent implements OnInit {
  reservations;
  boxes;
  
  showForm = signal(false);
  isEditMode = signal(false);
  currentReservationId = signal<number | null>(null);
  reservationForm: FormGroup;
  availableBoxes;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    // CORRECCIÓN: Inicializar propiedades aquí
    this.reservations = this.dataService.getReservations();
    this.boxes = this.dataService.boxes;
    
    this.reservationForm = this.fb.group({
      boxId: ['', Validators.required],
      specialistName: ['', Validators.required],
      specialty: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });

    this.availableBoxes = computed(() => {
      const specialty = this.reservationForm.get('specialty')?.value;
      if (!specialty) return this.boxes();
      return this.boxes().filter(b => b.specialty === specialty);
    });
  }

  ngOnInit(): void {
    this.reservationForm.get('specialty')?.valueChanges.subscribe(() => {
        this.reservationForm.get('boxId')?.setValue('');
    });
  }
  
  getBoxName(boxId: number): string {
    return this.boxes().find(b => b.id === boxId)?.name || 'N/A';
  }
  
  openCreateForm() {
    this.isEditMode.set(false);
    this.reservationForm.reset();
    this.currentReservationId.set(null);
    this.showForm.set(true);
  }

  openEditForm(reservation: Reservation) {
    this.isEditMode.set(true);
    this.currentReservationId.set(reservation.id);
    this.reservationForm.setValue({
        boxId: reservation.boxId,
        specialistName: reservation.specialistName,
        specialty: reservation.specialty,
        date: reservation.date,
        timeSlot: reservation.timeSlot
    });
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  onSubmit() {
    if (this.reservationForm.invalid) return;

    if (this.isEditMode()) {
        const updatedRes: Reservation = { id: this.currentReservationId()!, ...this.reservationForm.value };
        const success = this.dataService.updateReservation(updatedRes);
        if(success) this.notificationService.addNotification('success', 'Reserva actualizada correctamente.');
    } else {
        const result = this.dataService.addReservation(this.reservationForm.value);
        if(result) {
            this.notificationService.addNotification('success', 'Reserva creada exitosamente.');
        } else {
            this.notificationService.addNotification('error', 'No se pudo crear la reserva. Verifique la disponibilidad y la especialidad.');
        }
    }
    this.closeForm();
  }

  onDelete(id: number) {
    if(confirm('¿Está seguro de que desea eliminar esta reserva?')) {
        this.dataService.deleteReservation(id);
        this.notificationService.addNotification('info', 'Reserva eliminada.');
    }
  }
}