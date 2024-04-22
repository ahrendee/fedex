import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from "flowbite";

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent implements OnInit {

  @Input() result!: object;
  @Output() modalClosed = new EventEmitter<void>();

  @ViewChild('infoPopup') modalEl!: HTMLElement;

  jsonResult!: string;

  privacyModal!: Modal;

  ngOnInit() {
    this.jsonResult = JSON.stringify(this.result, null, '\t');

    // const modalEl = document.getElementById('info-popup');
    this.privacyModal = new Modal(this.modalEl, {
      placement: 'center'
    });
    this.privacyModal.show();
  }

  closeModal() {
    this.privacyModal.hide();
    this.modalClosed.emit();
  }
}
