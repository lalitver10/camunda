import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent {
  order: any;

  ngOnInit(): void {
    this.order = {
      steps: [
        { name: 'Initiate Leave Application', completed: true },
        { name: 'Guide Approval', completed: false },
        { name: 'DGPC Approval', completed: false },
        { name: 'HOD Approval', completed: false }
      ]
    };
  }
}
