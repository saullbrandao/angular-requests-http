import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() cancelTxt = 'Cancelar';
  @Input() confirmTxt = 'Sim';

  confirmResult: Subject<boolean> = new Subject();

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.activeModal.close();
  }
}
