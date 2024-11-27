import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { confirmDialog } from '../../models/confirmDialog';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styles: ``,
})
export class ConfirmAlertComponent {
  @Input() data!: confirmDialog;
  @ViewChild('content') confirmationModal!: TemplateRef<any>;

  size: any = 'sm';

  modalRef: any;
  constructor(private modalService: NgbModal) {}

  public outputEvent = new Subject<any>();

  ngAfterViewInit() {
    let ngbModalOptions: NgbModalOptions = {
      size:
        this.data.size !== undefined && this.data.size !== null
          ? this.data.size
          : this.size,
      backdrop: 'static',
      keyboard: false,
      windowClass: this.data.css,
    };

    this.modalRef = this.modalService.open(
      this.confirmationModal,
      ngbModalOptions
    );
  }

  onClickEvent(value: string) {
    if (value !== '') this.outputEvent.next(value);

    this.modalRef.dismiss();

    /// this.modalService.dismissAll();
  }
}
