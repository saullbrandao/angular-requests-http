import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: NgbModal) {}

  private showAlert(message: string, type: string) {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.message = message;
  }

  showAlertDanger(message: string = 'Erro') {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string = 'Sucesso') {
    this.showAlert(message, AlertTypes.SUCCESS);
  }
}
