import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: NgbModal) {}

  private showAlert(message: string, type: string, dismissTimeout?: number) {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.message = message;
    if (dismissTimeout) {
      setTimeout(() => modalRef.close(), dismissTimeout);
    }
  }

  showAlertDanger(message: string = 'Erro') {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string = 'Sucesso') {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(
    title: string,
    message: string,
    confirmTxt?: string,
    cancelTxt?: string
  ) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    if (confirmTxt) {
      modalRef.componentInstance.confirmTxt = confirmTxt;
    }

    if (cancelTxt) {
      modalRef.componentInstance.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>modalRef.componentInstance).confirmResult;
  }
}
