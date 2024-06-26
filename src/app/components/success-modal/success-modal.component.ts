import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modal} from "flowbite";
import {UsersApiResponse} from '../../services/json-place-holder.service';

export interface SuccessModel extends UsersApiResponse {
    albumId: number;
    title: string;
}

@Component({
    selector: 'app-success-modal',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    templateUrl: './success-modal.component.html',
    styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent implements OnInit {

  @Input() result!: SuccessModel;
  @Output() modalClosed = new EventEmitter<void>();

  privacyModal!: Modal;

  ngOnInit() {
    const modalEl = document.getElementById('success-modal');
    this.privacyModal = new Modal(modalEl, {
      placement: 'center'
    });
    this.privacyModal.show();
  }

  closeModal() {
    this.privacyModal.hide();
    this.modalClosed.emit();
  }
}
