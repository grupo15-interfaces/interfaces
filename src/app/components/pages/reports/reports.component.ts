import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Reservation } from '../../../models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  filters = signal({
    startDate: '',
    endDate: '',
    specialty: 'all'
  });
  
  boxes;
  filteredReservations;

  constructor(private dataService: DataService) {
    this.boxes = this.dataService.boxes;
    this.filteredReservations = computed<Reservation[]>(() => {
      const allReservations = this.dataService.reservations();
      const { startDate, endDate, specialty } = this.filters();

      return allReservations.filter(res => {
        const matchSpecialty = specialty === 'all' || res.specialty === specialty;
        const matchStartDate = !startDate || res.date >= startDate;
        const matchEndDate = !endDate || res.date <= endDate;
        return matchSpecialty && matchStartDate && matchEndDate;
      });
    });
  }
  
  updateFilters(field: string, value: any) {
    this.filters.update(f => ({ ...f, [field]: value }));
  }

  getBoxName(boxId: number): string {
    return this.boxes().find(b => b.id === boxId)?.name || 'N/A';
  }

  printReport() {
    window.print();
  }
}