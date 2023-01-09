import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent {
  @Input() message: string = '';
  @Input() type: string = 'success';

  constructor(public activeModal: NgbActiveModal) {}

  onClose() {
    this.activeModal.close();
  }
}
