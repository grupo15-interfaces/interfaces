import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Box, Reservation } from '../../../models';

interface TimeSlot {
  time: string;
  boxes: {
    box: Box;
    reservation: Reservation | null;
  }[];
}

@Component({
  selector: 'app-box-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './box-availability.component.html',
  styleUrls: ['./box-availability.component.css']
})
export class BoxAvailabilityComponent {
  selectedDate = signal(new Date().toISOString().split('T')[0]);
  boxes;
  reservations;

  timeSlots = [
    '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', 
    '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00'
  ];

  availabilityGrid;

  constructor(private dataService: DataService) {
    this.boxes = this.dataService.boxes;
    this.reservations = this.dataService.reservations;

    this.availabilityGrid = computed<TimeSlot[]>(() => {
      const date = this.selectedDate();
      const allBoxes = this.boxes();
      const dailyReservations = this.reservations().filter(r => r.date === date);

      return this.timeSlots.map(time => {
        return {
          time: time,
          boxes: allBoxes.map(box => {
            const reservation = dailyReservations.find(
              r => r.boxId === box.id && r.timeSlot === time
            ) || null;
            return { box, reservation };
          })
        };
      });
    });
  }
}