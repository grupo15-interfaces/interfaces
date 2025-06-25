import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { BoxLog } from '../../../models';

@Component({
  selector: 'app-logbook',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logbook.component.html',
  styleUrl: './logbook.component.css' // Asegúrate que es singular: styleUrl
})
export class LogbookComponent {
  boxes;
  selectedBoxId = signal<number | null>(null);
  logForm;
  logHistory;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.boxes = this.dataService.boxes;
    this.logForm = this.fb.group({
      boxId: ['', Validators.required],
      observation: ['', Validators.required]
    });
    this.logHistory = computed<BoxLog[]>(() => {
      const boxId = this.selectedBoxId();
      if (!boxId) return [];
      return this.dataService.getLogsForBox(boxId).reverse();
    });

    this.logForm.get('boxId')?.valueChanges.subscribe(id => {
      this.selectedBoxId.set(Number(id));
    });
  }

  onSubmit() {
    if (this.logForm.invalid) return;

    const { boxId, observation } = this.logForm.value;
    const author = this.authService.currentUser()?.name || 'Sistema';

    this.dataService.addBoxLog({
      boxId: Number(boxId),
      observation: observation!,
      author: author
    });
    
    this.selectedBoxId.set(this.selectedBoxId()); 
    this.logForm.get('observation')?.reset();
  }
}